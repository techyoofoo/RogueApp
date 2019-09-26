import UserGroupSchema from "./model";
import mongoose, { Schema } from "mongoose";

export const create = (req, res) => {
    const model = mongoose.model(req.params.table_name, UserGroupSchema);
    model.find({
        name: req.body.name,
    }).then(reslt => {
        if (reslt.length !== 0)
            res.send({ Message: "Group already exist" });
        else {
            const createUserGroup = new model(req.body);
            createUserGroup
                .save()
                .then(data => {
                    res.send({ status: 200, Message: "Group saved sucessfully" });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "error occurred while creating the group."
                    });
                });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error occurred while creating the group."
            });
        });
};

export const getAll = (req, res) => {
    const model = mongoose.model(req.params.table_name, UserGroupSchema);
    model.find({}).then(result => {
          res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error occurred while retrieve the groups."
        });
    })
}