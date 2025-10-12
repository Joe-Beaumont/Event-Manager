const { google } = require("googleapis");
const { getOAuthClient } = require("../utils/googleClient");
const { saveGoogleTokens } = require("../models/google.model");

// Initiates Google OAuth login
exports.googleLogin = (req, res) => {
    const oauth2Client = getOAuthClient();

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/calendar.events",
        ],
        prompt: "consent", // ensures refresh token is returned
    });

    res.redirect(authUrl);
};

// Handles Google OAuth callback
exports.googleCallback = async (req, res, next) => {
    const oauth2Client = getOAuthClient();
    const code = req.query.code;

    try {
        // Get tokens from Google
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const user_id = req.user?.user_id;

        //   // HARD-CODED USER FOR TESTING
        //     const user_id = 1; 

        // Example: get user_id from session/auth (adjust to your auth system)
        // const user_id = req.user?.user_id;
        if (!user_id) throw new Error("User not authenticated");

        // Save tokens in DB
        await saveGoogleTokens({
            user_id,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expiry_date: tokens.expiry_date,
        });

        res.redirect(`${process.env.CLIENT_URL}/calendar-connected?status=success`);
    } catch (err) {
        console.error("OAuth error:", err);
        res.redirect(`${process.env.CLIENT_URL}/calendar-connected?status=error`);
    }
};
