import dotenv from "dotenv";
import express from "express";
import path from "path";

import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

import * as Controllers from './controllers'

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();

Controllers.register(app);

exports.api = functions.https.onRequest(app);

// start the express server
// app.listen(port, () => {
//   // tslint:disable-next-line:no-console
//   console.log( `server started at http://localhost:${ port }` );
// });
