import mongoose, { Schema } from "mongoose";
import schema from './model';
import axios from 'axios';

export const create = (req, res) => {
  const model = mongoose.model(req.params.table_name, schema);
  const create = new model(req.body);
  create
    .save()
    .then(data => {
      axios.post('http://localhost:3000/send', {
        queue: 'common',
        message: `${data._id} Created successfully`
      }).then(function (response) {
        res.data = response.data;
        //console.log(response);
      }).catch(function (error) {
        //console.log(error);
      });

      res.send({ status: 200, id: data._id, Message: "Created successfully" });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while creating."
      });
    });
};


export const getAll = (req, res) => {
  const model = mongoose.model(req.params.table_name, schema);
  model.find({}).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  })
}

export const updateById = async (req, res) => {
  const model = mongoose.model(req.params.table_name, schema);
  await model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: false })
    .then(result => {
      res.send({ id: result._id, Message: `Updated Successfully` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while updating."
      });
    });
}

export const deleteById = async (req, res) => {
  const model = mongoose.model(req.params.table_name, schema);
  await model.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.deletedCount > 0)
        res.send({ Message: `${req.params.id} Deleted Successfully` });
      else
        res.send({ Message: "No records found" })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while deleting."
      });
    });
}

export const findById = async (req, res) => {
  const model = mongoose.model(req.params.table_name, schema);
  await model.findById({ _id: req.params.id })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}