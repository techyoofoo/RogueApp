import baseschema from '../baseschema'
const extendSchema = require('mongoose-extend-schema');
import mongoose, { Schema } from "mongoose";

const userGroupSchema = new extendSchema(baseschema,
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    roleId: [
      { type: Schema.Types.ObjectId, ref: 'role' }
    ]
  }
);

userGroupSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
      roleId: this.roleId
    };

    return full
      ? {
        ...view
        // add properties for a full view
      }
      : view;
  }
};
// const model = mongoose.model("UserGroup", userGroupSchema);

// export const schema = model.schema;
// export default model;

export default userGroupSchema;


