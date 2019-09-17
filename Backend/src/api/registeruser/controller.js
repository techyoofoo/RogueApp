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
  UserRegistration.find()
    .then(users => {
      res.send(users);
    })
    .catch(next);
  // .catch(err => {
  //     res.status(500).send({
  //         message: err.message || "Some error occurred while retrieving notes."
  //     });
  // });
};

//Validate user credentials
exports.ValidateUser = (req, res, next) => {
  console.log("User Details", req.body);
  UserRegistration.find({
    userName: req.body.username,
    password: req.body.pass
  })
    .then(reslt => {
      console.log(reslt.length);
      if (reslt.length === 0)
        res.send({ Message: "Invalid login details", status: 204 });
      else {
        //console.log("status", reslt[0].scanDeviceTakenStatus, reslt);
        if (
          reslt[0].scanDeviceTakenStatus === false ||
          reslt[0].scanDeviceTakenStatus === undefined
        )
          res.send({ Message: "Scan device not purchased", status: 304, data: {id: reslt[0]._id, username: reslt[0].userName}});
        else res.send({ Message: "Valid User", status: 200,  empid: reslt[0]._id});
      }     
    })
    .catch(next);
};
