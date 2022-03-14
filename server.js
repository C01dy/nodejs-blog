const express = require('express');
const { client } = require('./src/services/db');
require('dotenv').config();

const app = express();

client
  .connect()
  .then(() => {
    app.listen(process.env.SERVER_PORT || 3000, (err) => {
      if (err) {
        throw new Error(err);
      } else {
        console.log(`Server is running on ${process.env.PORT || 3000}`);
      }
    });
  })
  .catch((error) => console.error(error));
