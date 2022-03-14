const { getMany, getOne } = require('../models/post');

const getManyPosts = async () => {
  try {
    const postList = await getMany();
    return postList;
  } catch (error) {
    throw new Error(error);
  }
};

const getOnePost = async () => {
  try {
    const post = await getOne();
    return post;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getManyPosts, getOnePost };
