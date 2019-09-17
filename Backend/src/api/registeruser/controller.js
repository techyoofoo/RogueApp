import { success, notFound } from "../../services/response/";
import UserRegistration from "./model";

// Create and Save a new user
exports.create = (req, res) => {
  const createUserReg = new UserRegistration(req.body);
  // Save User in the database
  createUserReg
    .save()
    .then(data => {
      res.send({ status: 200, Message: "User registered sucessfully" });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while creating the User."
      });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res, next) => {
  UserRegistration.find({}).select('-_id -__v -createdAt -updatedAt')
    .then(users => {
      res.send(users);
    })
    .catch(next);  
};

//Validate user credentials
exports.ValidateUser = (req, res, next) => {
  console.log("User Details", req.body);
  UserRegistration.find({
    userName: req.body.username,
    password: req.body.pass
  })
    .then(reslt => {
      // console.log(reslt);
      if (reslt.length === 0)
        res.send({ Message: "Invalid login details", status: 204 });
      else {
        res.send({ Message: "Login Success", status: 200, data: {userName: reslt[0].userName, firstName: reslt[0].firstName}});        
      }     
    })
    .catch(next);
};
