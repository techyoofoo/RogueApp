import { success, notFound } from "../../services/response/";
import UserSchema from "./model";
import mongoose, { Schema } from "mongoose";

// Create and Save a new user
exports.create = (req, res) => {
  //const model = mongoose.model(req.params.table_name, UserSchema);
  const createUserReg = new UserSchema(req.body);
  // Save User in the database
  createUserReg
    .save()
    .then(data => {
      res.send({ status: 200, Message: "User registered successfully" });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while creating the User."
      });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res, next) => {
  // const model = mongoose.model(req.params.table_name, UserSchema);
  UserSchema.find({}).select('-_id -__v -createdAt -updatedAt')
    .then(users => {
      res.send(users);
    })
    .catch(next);
};

//Validate user credentials
exports.ValidateUser = (req, res, next) => {
  console.log("User Details", req.body);
  // const model = mongoose.model(req.params.table_name, UserSchema);
  UserSchema.find({
    userName: req.body.userName,
    password: req.body.password
  })
    .then(reslt => {
      // console.log(reslt);
      if (reslt.length === 0)
        res.send({ Message: "Invalid login details", status: 204 });
      else {
        res.send({ Message: "Login Success", status: 200, data: { userName: reslt[0].userName, firstName: reslt[0].firstName } });
      }
    })
    .catch(next);
};

export const updateUserById = async (req, res) => {
  await UserSchema.findOneAndUpdate({ _id: req.params.id }, req.body, { new: false })
    .then(UserInfo => {
      res.send({ Message: `${UserInfo.userName} Updated Successfully` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while updating user."
      });
    });
}

export const deleteUserById = async (req, res) => {
  await UserSchema.deleteOne({ _id: req.params.id })
    .then(UserInfo => {
      if (UserInfo.deletedCount > 0)
        res.send({ Message: `${req.params.id} Deleted Successfully` });
      else
        res.send({ Message: "No user found" })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while deleting user."
      });
    });
}

export const findUserById = async (req, res) => {
  await UserSchema.findById({ _id: req.params.id })
    .then(UserInfo => {
      res.send(UserInfo);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}
