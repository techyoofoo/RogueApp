import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {    
    name: {
      type: String
    },
    price: {
      type: Number
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: ["Active", "In-Active"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

productSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      // productID: this.productID,
      name: this.name,
      price: this.price,
      productDescription: this.productDescription,      
      status: this.status
    };

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view;
  }
};
const model = mongoose.model("Product", productSchema);

export const schema = model.schema;
export default model;
