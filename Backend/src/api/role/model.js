import baseschema from '../baseschema'
const extendSchema = require('mongoose-extend-schema');
import mongoose, { Schema } from "mongoose";

const roleSchema = extendSchema(baseschema,
    {
        name: {
            type: String
        },
        permission: {
            type: Array,
            default: ["Read"]
        }
    }
)

roleSchema.methods = {
    view(full) {
        const view = {
            id: this.id,
            name: this.name,
            permission: this.permission
        };

        return full
            ? {
                ...view
                // add properties for a full view
            }
            : view;
    }
};

export default roleSchema;
