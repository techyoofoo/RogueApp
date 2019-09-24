import mongoose, { Schema } from "mongoose";

const baseSchema = new Schema(
    {
      status: {
        type: String,
        enum: ["Active", "In-Active"],
        default: "Active",
        required: true
      },
      timestamps: {
        type : Date, 
        default: Date.now,
        required: true
      }
    }
  );

  export default baseSchema;
