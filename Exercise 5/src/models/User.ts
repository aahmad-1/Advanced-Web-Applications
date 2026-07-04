import mongoose, { Document, Schema } from "mongoose"; //MongoDB User model

interface ITodo {
    todo: string;
    checked: boolean;
}

interface IUser extends Document {
    name: string;
    todos: ITodo[];
}

const todoSchema = new Schema({
    todo: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    }
});

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    todos: [todoSchema]
});

const User = mongoose.model<IUser>("User", userSchema);

export { User, IUser, ITodo };