import { InferSchemaType, model, Schema } from "mongoose";

// example schema for a notes data
const noteSchema = new Schema({
    title: { type: String, required: true},
    text: { type: String },
}, { timestamps: true });

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);