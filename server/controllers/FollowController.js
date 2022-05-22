const Follow = require('../models/follow');
const User = require('../models/user');

async function follow(username, ctx, pubsub) {
  const userFound = await User.findOne({ username });

  if (!userFound) {
    throw new Error('Usuario no encontrado');
  }
  try {
    const newFollow = new Follow({
      idUser: ctx.user.id,
      follow: userFound._id,
    });

    // if follow is already added
    const follow = await Follow.find({
      idUser: ctx.user.id,
    })
      .where('follow')
      .equals(userFound._id);

    if (follow.length > 0) {
      throw new Error('Ya sigues a este usuario');
    }

    await newFollow.save();

    // find the user that is being followed
    const userFollowed = await User.findById(userFound._id);

    // publish the new follow
    pubsub.publish('FOLLOW_ADDED', { followAdded: userFollowed });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function isFollow(username, ctx) {
  const userFound = await User.findOne({ username });
  if (!userFound) {
    throw new Error('Usuario no encontrado');
  }
  const follow = await Follow.find({
    idUser: ctx.user.id,
  })
    .where('follow')
    .equals(userFound._id);
  if (follow.length > 0) {
    return true;
  }
  return false;
}

async function unFollow(username, ctx, pubsub) {
  const userFound = await User.findOne({ username });
  if (!userFound) {
    throw new Error('Usuario no encontrado');
  }

  try {
    const followDelete = await Follow.findOneAndDelete({
      idUser: ctx.user.id,
    })
      .where('follow')
      .equals(userFound._id)
      .populate('idUser');

    if (followDelete) {
      pubsub.publish('NEW_UNFOLLOW', {
        unFollowAdded: followDelete.idUser,
      });
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getFollowers(username, pubsub) {
  const userFound = await User.findOne({ username });
  if (!userFound) {
    throw new Error('Usuario no encontrado');
  }
  const followers = await Follow.find({
    follow: userFound._id,
  }).populate('idUser');

  const followersArray = [];

  for await (const follower of followers) {
    followersArray.push(follower.idUser);
  }

  // pubsub.publish('GET_FOLLOWERS', { getFollowersAdded: followersArray });

  return followersArray;
}

module.exports = {
  follow,
  isFollow,
  unFollow,
  getFollowers,
};
