import express from 'express'
import connect from './db/db'

import { Express } from 'express'

import serverApp from './server'

const startServer = async () => {
  const app:Express = express();

  connect().then(async function onServerInit(){
    try{
      console.log("DB connected")

      serverApp(app);

      app.listen(process.env.PORT || 4000, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
      });
      
    }catch(error){
      console.log("Error connecting to DB")
    }
  })

  app.get("/", (_req, res) => {
    res.send("TAP tap server")
  })
}

startServer();