import { pool } from '../db';

export const getMany = async () => {
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

    const posts = await pool.query(query);
    return posts.rows;
  } catch (error) {
    throw new Error(error);
  }
};

export const getOne = async (id) => {
  try {
    const query = {
      name: 'get-post',
      text: `
          SELECT
              post.title, post.content, post.id, post.created_at,
              post.updated_at, "user".first_name, "user".last_name, "user".username
          FROM post JOIN "user" ON post.author_id = "user".id WHERE post.id = $1;
      `,
    };

    const post = await pool.query(query, [id]);
    return post.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

