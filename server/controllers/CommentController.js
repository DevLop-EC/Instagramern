const Comment = require('../models/comment');

async function addComment(input, ctx) {
  const { comment } = input;

  if (!comment) {
    throw new Error('El comentario es requerido');
  }
  try {
    const comment = new Comment({
      idPublication: input.idPublication,
      idUser: ctx.user.id,
      comment: input.comment,
    });
    await comment.save();
    return comment;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addComment,
};
