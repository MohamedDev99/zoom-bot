require("dotenv").config();

const express = require("express");
const app = express();
const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");
const cors = require("cors");
const region = "us-east-1";

const PORT = process.env.PORT || 5000;

const chime = new AWS.Chime({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
chime.endpoint = new AWS.Endpoint("https://service.chime.aws.amazon.com/console");

// AWS.config.getCredentials((err) => {
//     console.log("Region: ", AWS.config);
//     if (err) console.log(err.stack);
//     // credentials not loaded
//     else {
//         console.log("Access key:", AWS.config.credentials.accessKeyId);
//     }
// });

app.use(cors());

app.get("/meeting", async (req, res) => {
    const response = {};
    try {
        response.meetingResponse = await chime
            .createMeeting({
                ClientRequestToken: uuid(),
                MediaRegion: region,
            })
            .promise();
        response.attendee = await chime
            .createAttendee({
                MeetingId: response.meetingResponse.Meeting.MeetingId,
                ExternalUserId: uuid(),
            })
            .promise();
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
    console.log(" new meeting created  :::: ", response);
    return res.send(response);
});

app.listen(PORT, () =>
    console.log(`Video calling POC server listening at http://localhost:${PORT}`)
);
