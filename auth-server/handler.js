'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  "https://amysikora.github.io/meet/"
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

// =====================
// getAuthURL
// =====================
module.exports.getAuthURL = async () => {
  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",  // Allow all origins
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ authUrl }),
    };
  } catch (error) {
    console.error("Error generating auth URL:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Failed to generate auth URL",
        error: error.message,
      }),
    };
  }
};

// ==========================
// getAccessToken (defensive)
// ==========================
module.exports.getAccessToken = async (event) => {
  try {
    console.log("Incoming event for getAccessToken:", JSON.stringify(event));

    const rawCode = event?.pathParameters?.code;
    if (!rawCode) {
      console.error("Missing 'code' in pathParameters");
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          message: "Missing authorization code in path parameters",
        }),
      };
    }

    const code = decodeURIComponent(rawCode);

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(tokens),
    };
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Failed to retrieve access token",
        error: error.message,
      }),
    };
  }
};

// ==================================
// getCalendarEvents (defensive)
// ==================================
module.exports.getCalendarEvents = async (event) => {
  try {
    console.log("Incoming event for getCalendarEvents:", JSON.stringify(event));

    const rawToken = event?.pathParameters?.access_token;
    if (!rawToken) {
      console.error("Missing 'access_token' in pathParameters");
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          message: "Missing access token in path parameters",
        }),
      };
    }

    const access_token = decodeURIComponent(rawToken);
    oAuth2Client.setCredentials({ access_token });

    const response = await new Promise((resolve, reject) => {
      calendar.events.list(
        {
          calendarId: CALENDAR_ID,
          auth: oAuth2Client,
          timeMin: new Date().toISOString(),
          singleEvents: true,
          orderBy: "startTime",
        },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ events: response.data.items }),
    };
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Failed to fetch calendar events",
        error: error.message,
      }),
    };
  }
};
