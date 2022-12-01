import fetch from 'node-fetch'
import dotenv from 'dotenv'
import { Model } from "mongoose";
import Taps from '../../interfaces/taps.interface';
import { response } from 'express';

const API_KEY = process.env.API_KEY;
export const signUp = async<T>(model:Model<T>, payload:{userEmail:string, username:string, points:number | undefined})=>{
  let user: any = await model.find({email:payload.userEmail});
  let response:{ok:boolean, msg: string | any};

  if(user.length == 0){
    //Creamos el usuario en el BD
    user = await model.create({email:payload.userEmail, userName: payload.username, points: 0});
    response = {ok:true, msg:user}
  }else{
    //Se actualiza su puntuacion si esta es 0
    response = {ok:false, msg:"This user already exists try with other email or user name"}
  }
  return response;
}

export const logIn = async<T>(model:Model<T>, payload:{userEmail:string, username:string, points:number | undefined}) =>{
  let user: any = await model.find({email:payload.userEmail});
  let response:{ok:boolean, msg: string | any};

  if(user.length == 0){
    //Creamos el usuario en el BD
    response = {ok:false, msg:"Oops email/username are incorrect"}
  }else{
    //Se actualiza su puntuacion si esta es 0
    user.userName == payload.username ? response = {ok:true, msg:"logged"} :
    response = {ok:true, msg:user}
  }
  return response;
}

export const saveUserPoints = async<T>(model:Model<T>, payload:{userEmail:string, username:string, points:number}) =>{
  let user: any = await model.find({email:payload.userEmail});
  let response:{ok:boolean, msg: {userEmail:string, username:string, points:number}}={ok:true, msg:user};
    //Se actualiza su puntuacion si esta es 0
    
  if(user[0].points < payload.points){
    user = await model.findByIdAndUpdate({_id:user[0]._id}, {$set:{email:payload.userEmail, userName: payload.username, points: payload.points}});
    return response={ok:true, msg:{userEmail:payload.userEmail, username:payload.username, points:payload.points}}    
  }else{
    response = {ok:true, msg:{userEmail:user[0].userEmail, username:user[0].username, points:user[0].points}}
  }
  return response;
}

export const loadRanking = async<T>(model:Model<T>) => {
  //Se devuelve la base de datos en orden de mayor a menor puntuación
  let ranking: any = await model.find({}).sort({points:-1}).lean().exec();

  return ranking;
}