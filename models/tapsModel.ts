import { model, Schema, SchemaTypes } from "mongoose";
import Taps from "../interfaces/taps.interface";

const tapsSchema = new Schema<Taps>({
  email:{
    type:String,
    required:true
  },
  userName:{
    type:String,
    required:true
  },
  points:{
    type:Number,
    default:0
  }
})

const TapsModel = model<Taps>("taps", tapsSchema);

export default TapsModel;