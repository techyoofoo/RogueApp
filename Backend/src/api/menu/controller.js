import mongoose, { Schema } from "mongoose";
import menuSchema from './model';

export const create = (req, res) => {
    const model = mongoose.model(req.params.table_name, menuSchema);
    const create = new model(req.body);
    create
    .save()
    .then(data => {
      res.send({ status: 200, Message: "Created sucessfully" });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while creating."
      });
    });
};