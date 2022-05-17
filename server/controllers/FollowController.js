const Follow = require('../models/follow');
const User = require('../models/user');

async function follow(username, ctx) {
  const userFound = await User.findOne({ username });

  if (!userFound) {
    throw new Error('Usuario no encontrado');
  }
  try {
    const follow = new Follow({
      idUser: ctx.user.id,
      follow: userFound._id,
    });
    follow.save();
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

async function unFollow(username, ctx) {
  const userFound = await User.findOne({ username });
  const follow = await Follow.deleteOne({
    idUser: ctx.user.id,
  })
    .where('follow')
    .equals(userFound._id);
  if (follow.deletedCount > 0) {
    return true;
  }
  return false;
}

async function getFollowers(username) {
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

  return followersArray;
}

module.exports = {
  follow,
  isFollow,
  unFollow,
  getFollowers,
};