import { useMeetingManager } from "amazon-chime-sdk-component-library-react";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useRecoilState } from "recoil";
import { meetingInfo } from "./atom/meetingAtom";
import AudioRecorder from "./components/AudioRec";
import MeetingCard from "./components/MeetingCard";
// import ReactPlayer from "react-player";
// import { SocketContext } from "./hooks/Context";
import useBot from "./hooks/useBot";

function App() {
    // ! function for change color of console log in the browser
    const consoleLogColor = (msg, color) =>
        console.log("%c" + msg, "color:" + color + ";font-weight:bold;");

    // * useBot hook
    const {
        isBotSpeaking,
        startingCommands,
        englishCommands,
        chineseCommands,
        language,
        botStarting,
    } = useBot();
    // * get speechRecognition variables
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({
        commands: botStarting // ! detects if the bot is ON or OFF
            ? language === "CN" // ! detects language
                ? chineseCommands
                : englishCommands
            : startingCommands,
    });

    useEffect(() => {
        // ! if the bot is Speaking the browser will stop listening
        console.log(isBotSpeaking);

        isBotSpeaking
            ? SpeechRecognition.stopListening()
            : SpeechRecognition.startListening({ language: language === "CN" ? "zh-CN" : "en-US" });

        // say("Hi! My name is Amy. I will read any text you type here.", "Amy");
    });

    // *  check if browser supports or not
    if (!browserSupportsSpeechRecognition) {
        consoleLogColor("not supported", "white");
    }

    // ! print any statement in the console
    useEffect(() => console.log(transcript), [transcript]);

    // const [fileUploadData, setFileUploadData] = useState(null);

    // const upload = async () => {
    //     console.log(fileUploadData);
    //     const formData = new FormData();
    //     formData.append("bucketName", "behappy-chinese-video-question");
    //     // formData.append("fileName", "my first video");
    //     formData.append("uploadFile", fileUploadData.file);
    //     console.log(formData);
    //     const uploaded = await axios
    //         .post("http://localhost:5500/upload", formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         })
    //         .then((res) => res.json())
    //         .catch((err) => err.message);
    //     console.log(uploaded);
    // };

    // const meetingManager = useMeetingManager();
    // const navigate = useNavigate();
    // const [meetingInfoData, setMeetingInfoData] = useRecoilState(meetingInfo);

    // useEffect(() => {
    //     const joinMeeting = async () => {
    //         console.log("start meeting");
    //         // Fetch the meeting and attendee data from your server application
    //         const response = await axios
    //             .get("http://localhost:5000/meeting")
    //             .then((res) => res.data)
    //             .catch((err) => console.log(err.message));

    //         console.log(response);
    //         const joinData = {
    //             meetingInfo: response?.meetingResponse?.Meeting,
    //             attendeeInfo: response?.attendee?.Attendee,
    //             // SDK doesn't choose any device
    //             deviceLabels: async () => {
    //                 // Do something
    //                 const stream = await navigator.mediaDevices.getUserMedia({
    //                     video: true,
    //                     audio: true,
    //                 });
    //                 // Do something
    //                 return stream;
    //             },
    //         };
    //         setMeetingInfoData(joinData);

    //         // Use the join API to create a meeting session using the above data
    //         // await meetingManager.join(joinData);
    //         navigate(`/${response?.meetingResponse.Meeting.MeetingId}`);
    //         // Skip devices setup

    //         // Start the session to join the meeting
    //         // await meetingManager.start();
    //     };
    //     joinMeeting();
    // }, [navigate, meetingManager]);

    return (
        <div className="videoLayout h-screen">
            <div className="flex flex-col gap-y-8">
                {/* <button onClick={joinMeeting}>Join</button> */}
            </div>
            {/* <input
                    type="file"
                    onChange={(f) => {
                        console.log(f.target.files[0]);
                        setFileUploadData({ file: f.target.files[0] });
                    }}
                />
                <button onClick={upload}>upload</button> */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "7rem",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <div style={{ display: "flex", gap: "5rem", alignItems: "center" }}>
                    <MeetingCard
                        img="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                        speaking={!isBotSpeaking}
                    />
                    <MeetingCard
                        img="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                        speaking={!isBotSpeaking}
                    />
                </div>
                <MeetingCard speaking={isBotSpeaking} />
            </div>

            {/* <img className="pics" src="/img/2.jpg" alt="" /> */}
            {/* <ReactPlayer
                height="100%"
                width="100%"
                url="https://drive.google.com/file/d/1eCwmaNXpclg_SS7RPzzn_5tfv47o-de2//preview"
                playing={true}
            /> */}
            {/* {transcript && (
                <div className={`card ${isBotSpeaking ? "isBotSpeaking" : "isBotNotSpeaking"}`}>
                    <p>{isBotSpeaking ? "bot says ::  " + botSays : "you say ::  " + transcript}</p>
                </div>
            )} */}
        </div>
    );
}

export default App;
