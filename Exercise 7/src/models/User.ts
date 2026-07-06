import mongoose, { Document, Schema } from "mongoose"; // same as User.ts from demo code but email instead of username

interface IUser extends Document {
    email: string
    password: string
}

const UserSchema: Schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", UserSchema)

export {User, IUser}