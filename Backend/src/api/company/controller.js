import Company from "./model";
import mongoose, { Schema } from "mongoose";

export const create = (req, res) => {
  const modelTest = mongoose.model(req.params.table_name, Company);
  const createProd = new modelTest(req.body);
  createProd
    .save()
    .then(data => {
      res.send({ status: 200, Message: "Company registered sucessfully" });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while creating the Company."
      });
    });
};

// Retrieve and return all notes from the database.
export const fetchAllCompanys = (req, res, next) => {
  Company.find({})
    .select("-_id -__v -createdAt -updatedAt")
    .then(CompanyDtls => {
      res.send(CompanyDtls);
    })
    .catch(next);
};

// Update Company information
export const updateCompanyById = async (req, res, next) => {   
 /*  db.getCollection('companies').update(
    { defaulted: { $exists: false }},
    { $set: { test: "asda" }},
    { multi: true }
  )  */
  await Company.findOneAndUpdate(req.params.id, req.body, { new: true })
    .then(CompanyInfo => {
        console.log('CompanyInfo', CompanyInfo)
      res.send({Message:`${CompanyInfo.name} Updated Successfully`});
    })
    .catch(next);
};

//Delet Company by id
export const deleteCompanyById = async (req,res, next) => {
    await Company.deleteOne({ _id: req.params.id })
    .then(CompanyInfo => {
        console.log('CompanyInfo', CompanyInfo.deletedCount, )
        if(CompanyInfo.deletedCount > 0)
            res.send({Message:`${req.params.id} Deleted Successfully`});
        else
            res.send({Message: "No records found"})
    })
    .catch(next);
}