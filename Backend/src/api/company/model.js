import mongoose, { Schema } from "mongoose";

const companiesSchema = new Schema(
  {
    name: {
      type: String
    },
    noOfUsers: {
      type: Number
    },
    taxId: {
      type: String
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

companiesSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      taxId: this.taxId,
      name: this.name,
      noOfUsers: this.noOfUsers,
      description: this.description,
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
const model = mongoose.model("Company", companiesSchema);

export const schema = model.schema;
export default model;
