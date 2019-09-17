import Product from "./model";

export const create = (req, res) => {
  const createProd = new Product(req.body);
  createProd
    .save()
    .then(data => {
      res.send({ status: 200, Message: "Product registered sucessfully" });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "error occurred while creating the Product."
      });
    });
};
// Retrieve and return all notes from the database.
export const fetchAllProducts = (req, res, next) => {
  Product.find({})
    .select("-_id -__v -createdAt -updatedAt")
    .then(productDtls => {
      res.send(productDtls);
    })
    .catch(next);
};

// Update product information
export const updateProductById = async (req, res, next) => {    
  await Product.findOneAndUpdate(req.params.id, req.body, { new: true })
    .then(productInfo => {
        console.log('productInfo', productInfo)
      res.send({Message:`${productInfo.name} Updated Successfully`});
    })
    .catch(next);
};

//Delet Product by id
export const deleteProductById = async (req,res, next) => {
    await Product.deleteOne({ _id: req.params.id })
    .then(productInfo => {
        console.log('productInfo', productInfo.deletedCount, )
        if(productInfo.deletedCount > 0)
            res.send({Message:`${req.params.id} Deleted Successfully`});
        else
            res.send({Message: "No records found"})
    })
    .catch(next);
}