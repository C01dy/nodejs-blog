const { client } = require('../services/db');
const {
  transformInsertionDataForQueryString,
} = require('../services/db/helpers');

const getOne = async (email) => {
  try {
    const query = {
      name: 'get-user',
      text: `
            SELECT
              "user".first_name, "user".last_name, "user".username, "user".email
            FROM 
              "user" WHERE "user".email = $1;
      `,
      values: [email],
    };

    const res = await client.query(query);
    return res.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const createOne = async (userData) => {
  try {
    const [dataKeysString, dataValuesArray] =
      transformInsertionDataForQueryString(userData);

    const query = {
      name: 'create-user',
      text: `
            INSERT INTO "user" (${dataKeysString})
            VALUES(${dataValuesArray
              .map((_, idx) => `$${idx + 1}`)
              .join(', ')}) RETURNING *;
      `,
      values: dataValuesArray,
    };

    const res = await client.query(query);
    console.log(res.rows[0]);
    return res.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getOne, createOne };
