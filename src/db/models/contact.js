import { model, Schema } from "mongoose";
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
        contactType: {
            type: String,
            required: true,
            default:'personal',
            enum: ['work','home','personal'],
            
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
export const contactsCollection = model('contacts', contactShema);