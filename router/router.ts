import { Request, Response, NextFunction } from "express";
import { Express } from "express";
import { logIn, loadRanking, saveUserPoints, signUp } from "./controller/tapsController";
import Models from '../models/index'

export const routerTaps = (app:Express) => {
  app.post('/login', async (req:Request, res:Response, _next:NextFunction) => {
    //Call to controller to create/save the user game information
    const response = await logIn(Models.Taps,req.body);
    res.status(200).send(response)
  })

  app.post('/signUp', async (req:Request, res:Response, _next:NextFunction) => {
    //Call to controller to create/save the user game information
    const response = await signUp(Models.Taps,req.body);
    res.status(200).send(response)
  })

  app.post('/points', async (req:Request, res:Response, _next:NextFunction) => {
    //Call to controller to create/save the user game information
    const response = await saveUserPoints(Models.Taps,req.body);
    res.status(200).send(response)
  })

  app.get('/ranking', async (req:Request, res:Response, _next:NextFunction) => {
    //Call to controller to get the ranking order by points
    const ranking = await loadRanking(Models.Taps);
    res.status(200).send(ranking);
  })

  app.use('', (_req, res) => {
    res.send("Tap server");
  })
}