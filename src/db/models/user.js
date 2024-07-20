import { model, Schema } from "mongoose";
import {setUpdateSettings, mongooseSaveError} from "./hooks.js";

const userSchema = new Schema({
    name:{
        type: String,
        required:true,
    }, 
    email: {
        type: String,
        unique: true,
        required:true,  
    }, 
    password: {
        type: String,
        required:true,
    },
},
{
    timestamps: true,
    versionKey: false,
},
);


userSchema.post("save", mongooseSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", mongooseSaveError);

export const userCollection = model('user', userSchema);