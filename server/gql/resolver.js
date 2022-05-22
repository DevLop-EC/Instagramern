const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const UserController = require('../controllers/UserController');
const FollowController = require('../controllers/FollowController');
const { GraphQLUpload } = require('graphql-upload');

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    //User
    getUser: (_, { id, username }) => UserController.getUser(id, username),
    searchUsers: (_, { search }) => UserController.searchUsers(search),

    //Follow
    isFollow: (_, { username }, ctx) =>
      FollowController.isFollow(username, ctx),
    getFollowers: (_, { username }) =>
      FollowController.getFollowers(username, pubsub),
  },
  Mutation: {
    //User
    register: (_, { input }) => UserController.register(input),
    login: (_, { input }) => UserController.login(input),
    updateAvatar: (_, { file }, ctx) => UserController.updateAvatar(file, ctx),
    deleteAvatar: (_, __, ctx) => UserController.deleteAvatar(ctx),
    updateUser: (_, { input }, ctx) => UserController.updateUser(input, ctx),

    //follow
    follow: (_, { username }, ctx) =>
      FollowController.follow(username, ctx, pubsub),
    unFollow: (_, { username }, ctx) =>
      FollowController.unFollow(username, ctx, pubsub),
  },
  Subscription: {
    followAdded: {
      subscribe: () => pubsub.asyncIterator('FOLLOW_ADDED'),
    },
    unFollowAdded: {
      subscribe: () => pubsub.asyncIterator('NEW_UNFOLLOW'),
    },
    // getFollowersAdded: {
    //   subscribe: () => pubsub.asyncIterator('GET_FOLLOWERS'),
    // },
  },
};

//exportar resolver
module.exports = resolvers;
