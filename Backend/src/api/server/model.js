import baseschema from '../baseschema'
const extendSchema = require('mongoose-extend-schema');
import mongoose, { Schema } from "mongoose";


const serverSchema = extendSchema(baseschema,
    {
        name: {
            type: String
        },
        clientid: {
            type: String
        },
        iv: {
            type: String
        },
        key: {
            type: String
        },
        connection: {
            type: String
        }
    }
)

serverSchema.methods = {
    view(full) {
        const view = {
            id: this.id,
            name: this.name,
            clientid: this.clientid,
            iv: this.iv,
            key: this.key,
            connection: this.connection
        };

        return full
            ? {
                ...view
                // add properties for a full view
            }
            : view;
    }
};

const model = mongoose.model("server", serverSchema);

export const schema = model.schema;
export default model;

