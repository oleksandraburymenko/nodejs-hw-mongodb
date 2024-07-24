import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import bcrypt from "bcrypt";
import { userCollection } from "../db/models/user.js";
import { SMTP } from "../constants/index.js";
import { env } from "../utils/env.js";
import { sendMail } from "../utils/sendMail.js";
import { TEMPLATES_DIR } from "../constants/index.js";


export const findUser = filter => userCollection.findOne(filter); 

export const registerUser = async (data) => {
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, 10);
    return await userCollection.create({...data, password:hashPassword});

};

export const requestResetToken = async (email) => {
    const user = await userCollection.findOne({ email });
    if (!user) {
        throw createHttpError(404, 'User not found');
    }
    const resetToken = jwt.sign({
        sub: user._id,
        email,
    },
        env('JWT_SECRET'),
        {
            expiresIn: '5m',
        }
    );
    const resetPasswordTemplatePath = path.join(
        TEMPLATES_DIR,
        'reset-password-email.html',
    );
    const templatesSource = (
        await fs.readFile(resetPasswordTemplatePath)).toString();
    const template = handlebars.compile(templatesSource);
    const html = template({
        name: user.name,
        link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
        });
    
    
        await sendMail({
            from: env(SMTP.SMTP_FROM),
            to: email,
            subject: 'Reset your password',
            html,
        });
    console.log(email);
};

export const resetPassword = async (payload) => {
    let entries;
      try {
      entries = jwt.verify(payload.token, env('JWT_SECRET'));
    } catch (err) {
          if (err instanceof Error) throw createHttpError(401, err.message);
      throw err;
      }
      
      const user = await userCollection.findOne({
      email: entries.email,
      _id: entries.sub,
    });
      
      if (!user) {
          throw createHttpError(404, 'User not found');
      }
       const encryptedPassword = await bcrypt.hash(payload.password, 10);
      
      await userCollection.updateOne(
          { _id: user._id },
          { password: encryptedPassword },
      );
  
};