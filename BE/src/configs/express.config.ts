import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
export default function (app: express.Express) {
  app.use(bodyParser.json());
  app.use(cors());
}
