import { userCollection } from "../db/models/user.js";
import bcrypt from "bcrypt";


export const findUser = filter => userCollection.findOne(filter); 

export const registerUser = async (data) => {
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, 10);
    return await userCollection.create({...data, password:hashPassword});

};