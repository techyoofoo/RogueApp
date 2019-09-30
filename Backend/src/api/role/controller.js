import RoleSchema from "./model";
import mongoose, { Schema } from "mongoose";

export const create = (req, res) => {
    RoleSchema.find({
        name: req.body.name,
    }).then(reslt => {
        if (reslt.length !== 0)
            res.send({ Message: "Role already exist" });
        else {
            const createRole = new RoleSchema(req.body);
            createRole
                .save()
                .then(data => {
                    res.send({ status: 200, Message: "Role saved sucessfully" });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "error occurred while creating the role."
                    });
                });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error occurred while creating the role."
        });
    });
};

export const getAll = (req, res) => {
    RoleSchema.find({}).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error occurred while retrieve the roles."
        });
    })
}


export const updateRoleById = async (req, res) => {
    await RoleSchema.findOneAndUpdate({ _id: req.params.id }, req.body, { new: false })
        .then(RoleInfo => {
            res.send({ Message: `${RoleInfo.name} Updated Successfully` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error occurred while updating  roles."
            });
        });
}

export const deleteRoleById = async (req, res) => {
    await RoleSchema.deleteOne({ _id: req.params.id })
        .then(RoleInfo => {
            if (RoleInfo.deletedCount > 0)
                res.send({ Message: `${req.params.id} Deleted Successfully` });
            else
                res.send({ Message: "No records found" })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error occurred while deleting roles."
            });
        });
}

export const findRoleById = async (req, res) => {
    await RoleSchema.findById({ _id: req.params.id })
        .then(RoleInfo => {
            res.send(RoleInfo);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}