import mongoose, { Schema } from "mongoose";
import baseschema from '../baseschema';
const extendSchema = require('mongoose-extend-schema');

const userRegistrationSchema = new extendSchema(baseschema,
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    age: {
      type: Number
    },
    gender: {
      type: String
    },
    password: {
      type: String
    },
    userName: {
      type: String
    },
    mobileNo: {
      type: Number
    },
    userType: {
      type: String,
      enum: ["ANONYMOUS", "CUSTOMER"],
      default: "CUSTOMER"
    },
    groupId: {
      type: Schema.Types.ObjectId, ref: "usergroup"
    },
    companyName: {
      type: String
    }
  }
);

userRegistrationSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      age: this.age,
      gender: this.gender,
      password: this.password,
      userName: this.userName,
      mobileNo: this.mobileNo,
      status: this.status,
      userType: this.userType,
      groupId: this.groupId,
      companyName: this.companyName
    };

    return full
      ? {
        ...view
        // add properties for a full view
      }
      : view;
  }
};
const model = mongoose.model("user", userRegistrationSchema);
export const schema = model.schema;
export default model;
