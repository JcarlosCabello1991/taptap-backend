import express,{ Router } from 'express'
import { Express } from 'express';
import cors from 'cors'
import { routerTaps } from './router/router';
import dotenv from 'dotenv';

dotenv.config();

export default async(app:Express) => {
  app.use(cors({
    origin:'*'
  }))

  const router = Router();

  app.use(router);
  app.use(express.json({ limit: "50mb" }));
  
  routerTaps(app);
  app.use('/', (_req, res) => {
      res.send("TapTap Server")
    })
  app.listen(process.env.PORT_SERVER || 4000, () => {
    console.log("Server running");
  })
}