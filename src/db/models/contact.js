import { model, Schema } from "mongoose";
import {setUpdateSettings, mongooseSaveError} from "./hooks.js";

const contactShema = new Schema(

    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        isFavourite: {
            type: Boolean,
            default: false,
            required: false,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        photo: {
            type: String
        },
        contactType: {
            type: String,
            required: false,
            default:'personal',
            enum: ['work','home','personal'],
            
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

contactShema.post("save", mongooseSaveError);

contactShema.pre("findOneAndUpdate", setUpdateSettings );

contactShema.post("findOneAndUpdate", mongooseSaveError);

export const contactsCollection = model('contacts', contactShema);