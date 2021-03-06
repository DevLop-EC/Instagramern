const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const UserController = require('../controllers/UserController');
const FollowController = require('../controllers/FollowController');
const PostController = require('../controllers/PostController');
const CommentController = require('../controllers/CommentController');
const LikeController = require('../controllers/LikeController');
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
    getFollowers: (_, { username }) => FollowController.getFollowers(username),
    getFollowing: (_, { username }) => FollowController.getFollowing(username),
    getNotFollowing: (_, {}, ctx) => FollowController.getNotFollowing(ctx),

    //Publication
    getPublications: (_, { username }) =>
      PostController.getPublications(username),
    getFollowingPublications: (_, {}, ctx) =>
      PostController.getFollowingPublications(ctx),

    //Comment
    getComments: (_, { idPublication }) =>
      CommentController.getComments(idPublication),

    //Like
    isLike: (_, { idPublication }, ctx) =>
      LikeController.isLike(idPublication, ctx),
    getCountLikes: (_, { idPublication }) =>
      LikeController.getCountLikes(idPublication),
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

    //Publication
    publish: (_, { file, input }, ctx) =>
      PostController.publish(file, input, ctx),

    //Comment
    addComment: (_, { input }, ctx) => CommentController.addComment(input, ctx),

    //Like
    addLike: (_, { idPublication }, ctx) =>
      LikeController.addLike(idPublication, ctx, pubsub),

    removeLike: (_, { idPublication }, ctx) =>
      LikeController.removeLike(idPublication, ctx, pubsub),
  },
  Subscription: {
    followAdded: {
      subscribe: () => pubsub.asyncIterator('FOLLOW_ADDED'),
    },
    unFollowAdded: {
      subscribe: () => pubsub.asyncIterator('NEW_UNFOLLOW'),
    },
    likeAdded: {
      subscribe: () => pubsub.asyncIterator('LIKE_ADDED'),
    },
    likeRemoved: {
      subscribe: () => pubsub.asyncIterator('LIKE_REMOVED'),
    },
  },
};

//exportar resolver
module.exports = resolvers;
