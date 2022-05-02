import { pool } from '../db';
import { transformInsertionDataForQueryString } from "../db/helpers"

export const getRefreshToken = async (token) => {
    try {
        const query = {
            name: 'get-refresh-token',
            text: `
                  SELECT * FROM 
                    "refresh_tokens" WHERE "refresh_tokens".token = $1;
            `,
        };

        const tokenData = await pool.query(query, [token])
        return tokenData.rows[0];
    } catch (error) {
        throw new Error(error)
    }
}

export const saveRefreshToken = async ({ token, userId }) => {
    try {
        const [dataKeysString, dataValuesArray] =
            transformInsertionDataForQueryString({
                userId,
                token,
            });
        const query = {
            name: 'save-refresh-token',
            text: `
                INSERT INTO "refresh_tokens" (${dataKeysString})
                VALUES
                    (${dataValuesArray
                    .map((_, idx) => `$${idx + 1}`)
                    .join(', ')}) RETURNING *;
            `
        }

        const tokenData = await pool.query(query, dataValuesArray)
        console.table(tokenData.rows)
        return tokenData.rows[0];
    } catch (error) {
        throw new Error(error)
    }
}