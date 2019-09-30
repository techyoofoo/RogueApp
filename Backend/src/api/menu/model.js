import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema(
    {
        id: {
            type: String
        },
        name: {
            type: String
        },
        state: {
            type: String,
            enum: ["Enable", "Disable"],
            default: "Enable"
        },
        path: {
            type: String
        },
        roleId: [
            { type: Schema.Types.ObjectId, ref: 'role' }
        ],
        children: [
            {
                id: {
                    type: String
                },
                name: {
                    type: String
                },
                title: {
                    type: String
                },
                state: {
                    type: String,
                    enum: ["Enable", "Disable"],
                    default: "Enable"
                },
                path: {
                    type: String
                }
            }
        ]
    }
);

menuSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            name: this.name,
            state: this.state,
            path: this.path,
            children: this.children
        };

        return full
            ? {
                ...view
                // add properties for a full view
            }
            : view;
    }
};
// const model = mongoose.model("menu", menuSchema);

// export const schema = model.schema;
// export default model;
export default menuSchema;
