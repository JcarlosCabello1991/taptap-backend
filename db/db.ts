import mongoose,{Mongoose} from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const MONGO_ATLAS_DB = process.env.DB_URL || "";

function connect(): Promise<Mongoose> {
  return mongoose.connect(MONGO_ATLAS_DB);
}

export default connect;