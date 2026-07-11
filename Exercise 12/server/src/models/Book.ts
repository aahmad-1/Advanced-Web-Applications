import mongoose, {Document, Schema} from "mongoose";

interface IBook extends Document {
    name: string;
    author: string;
    pages: number;
}

const BookSchema = new Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    pages: {type: Number, required: true},
});

const Book = mongoose.model<IBook>("Book", BookSchema);

export {Book};