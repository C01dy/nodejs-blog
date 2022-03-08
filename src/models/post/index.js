const { client } = require('../../services/db');

const getAll = async () => {
  const query = {
    name: 'get-user',
    text: `
        SELECT 
            post.title, post.content, post.id, post.created_at,
            post.updated_at, "user".first_name, "user".last_name, "user".username
        FROM post JOIN "user" ON post.author_id = "user".id;
    `,
  };

  const res = await client.query(query);

  return res.rows;
};

module.exports = { getAll };
