const { google } = require("googleapis");
const { getOAuthClient } = require("../utils/googleClient");
const { saveGoogleTokens } = require("../models/google.model");
const { fetchEvent } = require("../models/event.model")

// Initiates Google OAuth login
exports.googleLogin = (req, res) => {
  const { user_id, event_id } = req.query;

  if (!user_id) return res.status(400).send("Missing user_id");

  const oauth2Client = getOAuthClient();
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/calendar.events",
    ],
    prompt: "consent",
    state: JSON.stringify({ user_id, event_id }),
  });

  res.redirect(authUrl);
};


// Handles Google OAuth callback
exports.googleCallback = async (req, res) => {
  const oauth2Client = getOAuthClient();
  let state = {};
  try {
    state = JSON.parse(req.query.state || "{}");
  } catch (err) {
    console.error("❌ Failed to parse state:", err.message);
  }

  const { user_id, event_id } = state;

  try {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);

    // Save tokens for the user
    await saveGoogleTokens({
      user_id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date,
    });

    // Add event to Google Calendar
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Fetch the event details from your database

    console.log(state, "<< state")
    const event = await fetchEvent(event_id);

    const calendarEvent = {
      summary: event.name,
      description: event.description,
      start: {
        dateTime: new Date(event.start_time).toISOString(),
        timeZone: "Europe/London", // adjust as needed
      },
      end: {
        dateTime: new Date(event.end_time).toISOString(),
        timeZone: "Europe/London",
      },
    };

    await calendar.events.insert({
      calendarId: "primary",
      resource: calendarEvent,
    });

    console.log(`✅ Event '${event.name}' added to Google Calendar for user ${user_id}`);

    res.redirect(`${process.env.CLIENT_URL}/calendar-connected?status=success&event_id=${event_id}`);
  } catch (err) {
    console.error("❌ OAuth error:", err);
    res.redirect(`${process.env.CLIENT_URL}/calendar-connected?status=error&event_id=${event_id || ""}`);
  }
};