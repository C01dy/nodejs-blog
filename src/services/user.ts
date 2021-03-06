import { pool } from '../db';
import {
  transformInsertionDataForQueryString,
} from '../db/helpers'

export const getOne = async (email) => {
  try {
    const query = {
      name: 'get-user',
      text: `
            SELECT
              "user".id, "user".first_name, "user".last_name, "user".username, "user".email, "user".password
            FROM 
              "user" WHERE "user".email = $1;
      `,
    };

    const user = await pool.query(query, [email])
    console.table(user.rows)
    return user.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const createOne = async (userData) => {
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
    };

    const user = await pool.query(query, dataValuesArray)
    return user.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

