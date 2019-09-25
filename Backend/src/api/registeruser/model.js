import mongoose, { Schema } from "mongoose";

const userRegistrationSchema = new Schema(
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
    status: {
      type: String,
      enum: ["Active", "In-Active"],
      default: "Active"
    },
    userType: {
      type: String,
      enum: ["ANONYMOUS", "CUSTOMER"],
      default: "CUSTOMER"
    },
    roleId: [
      { type: Schema.Types.ObjectId, ref: 'role' }
    ],
    companyName: {
      type: String
    }
  },
  {
    timestamps: true
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
const model = mongoose.model("UserRegistration", userRegistrationSchema);

export const schema = model.schema;
export default model;
