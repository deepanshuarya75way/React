import mongoose, { connections } from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1
    },
    firstName: {
        type: String,
        required: true,
        minlength: 1
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: false
    },
    refresh_token: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: true,
        default: "user"
    }
})

export const User = mongoose.model("user", userSchema)

export const getUserById = (id: string) => {User.findById(id)}
export const getUserByEmail =  (email:string) =>  User.findOne({email});
export const createUser =  (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
export const UpdateUserById =  (id:string, values: Record<string, any>) => User.findByIdAndUpdate(id, values, {new: true});
export const UpdateUserByEmail = (email:string, values: Record<string, any>) => User.findOneAndUpdate({email}, values, {new: true});