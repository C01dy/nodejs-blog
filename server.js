const express = require('express');
const { getAll } = require('./src/models/post');
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

      getAll().then((data) => console.log(data));
    });
  })
  .catch((error) => console.error(error));
