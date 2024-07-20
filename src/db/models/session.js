import { model, Schema } from "mongoose";
import {setUpdateSettings, mongooseSaveError} from "./hooks.js";

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:"user",
        required: true,

    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    accessTokenValidUntil: {
        type: Date,
        required: true,
    },
    refreshTokenValidUntil: {
        type: Date,
        required: true,
    },
},
 {
        timestamps: true,
        versionKey: false,
    },
);
sessionSchema.post("save", mongooseSaveError);

sessionSchema.pre("findOneAndUpdate", setUpdateSettings );

sessionSchema.post("findOneAndUpdate", mongooseSaveError);

export const sessioCollection = model('session', sessionSchema);