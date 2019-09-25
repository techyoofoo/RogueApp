import RoleSchema from "./model";
import mongoose, { Schema } from "mongoose";

export const createRole = (req, res) => {
    const model = mongoose.model(req.params.table_name, RoleSchema);
    model.find({
        name: req.body.name,
    }).then(reslt => {
        if (reslt.length !== 0)
            res.send({ Message: "Role already exist" });
        else {
            const createRole = new model(req.body);
            createRole
                .save()
                .then(data => {
                    res.send({ status: 200, Message: "Role saved sucessfully" });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "error occurred while creating the Role."
                    });
                });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error occurred while creating the Role."
            });
        });
};

export const getAllRoles = (req, res) => {
    const model = mongoose.model(req.params.table_name, RoleSchema);
    model.find({}).then(result => {
          res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error occurred while retrieve the Roles."
        });
    })
}