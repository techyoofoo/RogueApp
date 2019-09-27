import mongoose, { Schema } from "mongoose";
import baseschema from '../baseschema'
const extendSchema = require('mongoose-extend-schema');

const companiesSchema = extendSchema(baseschema,
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
    }
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

//const model = mongoose.model("company", companiesSchema);

//export const schema = model.schema;
export default companiesSchema;