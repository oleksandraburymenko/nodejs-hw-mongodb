import { OAuth2Client } from "google-auth-library"
import {readFile} from "node:fs/promises";
import path from "node:path";

import { env } from "node:process";

const googleOAuthSettingPath = path.resolve("google-oauth.json");
const googleOAuthSettings = JSON.parse(await readFile(googleOAuthSettingPath));

const clientId = env("GOOGLE_AUTH_CLIENT_ID");
const clientSecret = env("GOOGLE_AUTH_CLIENT_SECRET");

const googleOAuthClient = new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri: googleOAuthSettings.web.redirect_uris[0]
})


export const generateAuthUrl = ()=> {
    googleOAuthClient.generateAuthUrl({
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ]
    })

}