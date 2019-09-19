import mongoose = require("mongoose");
import { ObjectId } from "bson";

export interface IToken extends mongoose.Document {
  user_id: ObjectId; 
  token: string; 
};

export const TokenSchema = new mongoose.Schema({
  user_id: {type:ObjectId, required: true},
  token: String,
});

const Token = mongoose.model<IToken>('Token', TokenSchema);
export default Token;