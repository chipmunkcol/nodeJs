
// require('dotenv').config();
// const { Client } = require('pg');
import 'dotenv/config'
import pkg from 'pg';
const { Client } = pkg;

export const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

client.connect(err => {
  if (err) {
    console.log('Failed to connect db ' + err);
  } else {
    console.log('Connect to db done!');
  }
});
