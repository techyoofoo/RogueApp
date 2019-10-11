import mongoose, { Schema } from "mongoose";
import MenuSchema from './model';

export const create = (req, res) => {
  const create = new MenuSchema(req.body);
  create
    .save()
    .then(data => {
      res.send({ status: 200, Message: "Created successfully" });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while creating."
      });
    });
};

export const getAll = (req, res) => {
  MenuSchema.find({}).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "error occurred while retrieve the menus."
    });
  })
}

export const updateMenuById = async (req, res) => {
  await MenuSchema.findOneAndUpdate({ _id: req.params.id }, req.body, { new: false })
    .then(MenuInfo => {
      res.send({ Message: `${MenuInfo.name} Updated Successfully` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while updating menu."
      });
    });
}

export const deleteMenuById = async (req, res) => {
  await MenuSchema.deleteOne({ _id: req.params.id })
    .then(MenuInfo => {
      if (MenuInfo.deletedCount > 0)
        res.send({ Message: `${req.params.id} Deleted Successfully` });
      else
        res.send({ Message: "No records found" })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while deleting menu."
      });
    });
}

export const findMenuById = async (req, res) => {
  await MenuSchema.findById({ _id: req.params.id })
    .then(MenuInfo => {
      res.send(MenuInfo);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}