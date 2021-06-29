const postTweets = require('./postTweet');

const { google } = require("googleapis");
const service = google.sheets("v4");
const dotenv = require('dotenv').config();

const authClient = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
);

const destructAnswers = (ans) => {
    try {
        if (ans[1].includes("****")) {
            message = ans[1].replace('****', ans[2]);
        }
        else {
            message = ans[1];
        }
        postTweets(message);
        console.log('Tweeted one!');
    }
    catch (err) {
        console.log(err.message);
    }
};

module.exports = async () => {
    try {

        const token = await authClient.authorize();
        authClient.setCredentials(token);

        const res = await service.spreadsheets.values.get({
            auth: authClient,
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            range: "A:C",
        });

        if (res.data.values) {
            res.data.values.map(answ => {
                if (answ.length != 0) { destructAnswers(answ); }
            });
        }

        service.spreadsheets.values.clear({
            auth: authClient,
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            range: "A:C",
        });

    } catch (error) {
        console.log(error);
    }
};
