const { client } = require('../services/db');

const getMany = async () => {
  try {
    const query = {
      name: 'get-many-posts',
      text: `
          SELECT
              post.title, post.content, post.id, post.created_at,
              post.updated_at, "user".first_name, "user".last_name, "user".username
          FROM post JOIN "user" ON post.author_id = "user".id;
      `,
    };

    const res = await client.query(query);
    return res.rows;
  } catch (error) {
    throw new Error(error);
  }
};

const getOne = async (id) => {
  try {
    const query = {
      name: 'get-post',
      text: `
          SELECT
              post.title, post.content, post.id, post.created_at,
              post.updated_at, "user".first_name, "user".last_name, "user".username
          FROM post JOIN "user" ON post.author_id = "user".id WHERE post.id = $1;
      `,
      values: [id],
    };

    const res = await client.query(query);
    return res.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getMany, getOne };
