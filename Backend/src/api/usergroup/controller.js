import UserGroupSchema from "./model";
import mongoose, { Schema } from "mongoose";

export const create = (req, res) => {
    UserGroupSchema.find({
        name: req.body.name,
    }).then(reslt => {
        if (reslt.length !== 0)
            res.send({ Message: "Group already exist" });
        else {
            const createUserGroup = new UserGroupSchema(req.body);
            createUserGroup
                .save()
                .then(data => {
                    res.send({ status: 200, Message: "Group saved successfully" });
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
    UserGroupSchema.find({}).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error occurred while retrieve the groups."
        });
    })
}

export const updateGroupById = async (req, res) => {
    await UserGroupSchema.findOneAndUpdate({ _id: req.params.id }, req.body, { new: false })
        .then(GroupInfo => {
            res.send({ Message: `${GroupInfo.name} Updated Successfully` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error occurred while updating  group."
            });
        });
}

export const deleteGroupById = async (req, res) => {
    await UserGroupSchema.deleteOne({ _id: req.params.id })
        .then(GroupInfo => {
            if (GroupInfo.deletedCount > 0)
                res.send({ Message: `${req.params.id} Deleted Successfully` });
            else
                res.send({ Message: "No records found" })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error occurred while deleting group."
            });
        });
}

export const findGroupById = async (req, res) => {
    await UserGroupSchema.findById({ _id: req.params.id })
        .then(GroupInfo => {
            res.send(GroupInfo);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}