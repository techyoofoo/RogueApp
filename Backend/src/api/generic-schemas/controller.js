
import mongoose, { Schema } from "mongoose";
import baseschema from '../baseschema'

export const create = (req, res) => {
    const model = mongoose.model(req.params.table_name, baseschema);
    const create = new model(req.body);
    create
    .save()
    .then(data => {
      res.send({ status: 200, Message: "Created sucessfully" });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while creating the Company."
      });
    });
};