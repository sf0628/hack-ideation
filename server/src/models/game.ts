import { InferSchemaType, model, Schema } from "mongoose";

// example schema for a notes data
const gameSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: false},
    questions: { 
        type: [ String ],
        required: false,
    },
    maxMembers: { type: Number, min: 2},
}, { timestamps: true });

type Game = InferSchemaType<typeof gameSchema>;

export default model<Game>("Game", gameSchema);