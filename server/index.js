//conect mysql database
const mongoose = require('mongoose');
const express = require('express');

// web socket from apollo server
const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

// apollo server
const { ApolloServer } = require('apollo-server-express');

const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolver');
const { graphqlUploadExpress } = require('graphql-upload');
const cors = require('cors');

//import dotenv
require('dotenv').config({ path: '.env' });

mongoose.connect(
  process.env.BBDD,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, _) => {
    if (err) {
      console.log('Error de conexion');
    } else {
      console.log('Conectado a la base de datos');
      startServer();
    }
  },
);

async function startServer() {
  const app = express();

  app.use(cors());

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  const serverCleanup = useServer(
    {
      schema,
    },
    wsServer,
    cors({
      origin: '*',
      credentials: true,
    }),
  );

  const server = new ApolloServer({
    schema,
    csrfPrevention: false,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    context: ({ req }) => {
      const token = req.headers.authorization;

      if (token) {
        try {
          const user = jwt.verify(
            token.replace('Bearer ', ''),
            process.env.SECRET_KEY,
          );

          return {
            user,
          };
        } catch (error) {
          console.log('#### ERROR ####');
          console.log(error);
          throw new Error('Token invalido');
        }
      }
    },
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  await server.start();

  const isDevelopment = process.env.APP_ENV === 'development';

  app.use(
    helmet({
      crossOriginEmbedderPolicy: !isDevelopment,
      contentSecurityPolicy: !isDevelopment,
    }),
  );

  app.use(graphqlUploadExpress());

  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: false,
  });

  httpServer.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(
      `Server running on http://localhost:${process.env.PORT || 4000}/graphql`,
    );
  });
}
