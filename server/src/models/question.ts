import { InferSchemaType, model, Schema } from "mongoose";

// example schema for a question data
const questionSchema = new Schema({
    questions: { type: String, required: true},
    game: { type: Schema.Types.ObjectId, ref: "Game"}

});

type Question = InferSchemaType<typeof questionSchema>;

export default model<Question>("Question", questionSchema);