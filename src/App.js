// import { useEffect, useState } from "react";
import { useContext } from "react";
// import { useSpeechRecognition } from "react-speech-recognition";
// import useSpeechSynthesis from "./hooks/useSpeechSynthesis";
// import questionsData from "./data/testData";
// import MeetingCard from "./components/MeetingCard";
// import axios from "axios";
import ReactPlayer from "react-player";
import { SocketContext } from "./hooks/Context";

function App() {
    // ? this function call amazon Polly api to get audio back
    // const say = async (message, voice) => {
    //     const data = await axios
    //         .post("http://localhost:5500/speech", {
    //             text: message,
    //             voiceId: voice,
    //         })
    //         .then((res) => res)
    //         .catch((err) => console.log(err));
    //     console.log(data);
    //     const audioStream = data.data.AudioStream.data;
    //     const uInt8Array = new Uint8Array(audioStream);
    //     const arrayBuffer = uInt8Array.buffer;
    //     const blob = new Blob([arrayBuffer]);
    //     const url = URL.createObjectURL(blob);

    //     const audio = new Audio(url);
    //     audio.play();
    // };

    // // *  a hook to controll speech synthesis API
    // // const { speak, isBotSpeaking } = useSpeechSynthesis();

    // // ! function for change color of console log in the browser
    // const consoleLogColor = (msg, color) =>
    //     console.log("%c" + msg, "color:" + color + ";font-weight:bold;");

    // // * some states
    // const [questionNumber, setQuestionNumber] = useState(0);
    // const [beHappy, setBeHappy] = useState(true);
    // const [language, setLanguage] = useState("CN");
    // const [botStarting, setBotStarting] = useState(false);
    // // const [botSays, setBotSays] = useState("");

    // // * controll the topics
    // const [topicNumber, setTopicNumber] = useState(1);
    // const topicController = () => {
    //     consoleLogColor("topic number =====>> " + topicNumber, "red");
    //     setQuestionNumber(0);
    //     if (topicNumber <= 3) {
    //         setTopicNumber((topicNumber) => topicNumber + 1);
    //     } else {
    //         setTopicNumber(0);
    //     }
    // };

    // // ? function for check the questions length
    // const checker = (questions, startingWord, language) => {
    //     if (questionNumber < questions.length) {
    //         setBotSays(`${questionNumber + 1} - ${questions[questionNumber]}`);
    //         if (beHappy) {
    //             // * choosing "be happy" at the first time
    //             consoleLogColor(questionNumber + " ===>> " + questions[questionNumber], "yellow");
    //             // speak(startingWord + " ." + questions[questionNumber], language && 21);
    //             say(startingWord + " ." + questions[questionNumber], "Amy");
    //             setBeHappy(false);
    //             setQuestionNumber((questionNumber) => questionNumber + 1);
    //         } else {
    //             consoleLogColor(questionNumber + " ===>> " + questions[questionNumber], "yellow");
    //             say(questions[questionNumber], "Amy");
    //             // speak(questions[questionNumber], language && 21);
    //             setQuestionNumber((questionNumber) => questionNumber + 1);
    //         }
    //     } else {
    //         setBotSays(
    //             language
    //                 ? "通过以上的问题，你们是否还希望继续约会喔？请回答“是”或“否）"
    //                 : "Through the above questions. do you still want to continue dating? Please answer Yes or No"
    //         );
    //         consoleLogColor(
    //             `>>>>the topic ${topicNumber} doesn't have any questions now `,
    //             "#99dde7"
    //         ); // ? finish the questions
    //         speak(
    //             language
    //                 ? "通过以上的问题，你们是否还希望继续约会喔？请回答“是”或“否）"
    //                 : "Through the above questions. do you still want to continue dating? Please answer Yes or No",
    //             language && 19
    //         );
    //     }
    // };

    // // * listening commands
    // const startingCommands = [
    //     {
    //         command: ["hi", "hello", "hey", "你好"], // ? the bot will be starting with english language or chinese language
    //         callback: ({ command }) => {
    //             consoleLogColor(command + " command >>>", "#00D024"); // ?
    //             setBotStarting(true); // ! this's meaning the bot is ON

    //             // ! detects hi , hello or hey
    //             if (["hi", "hello", "hey"].includes(command)) {
    //                 setLanguage("EN");
    //                 consoleLogColor("English Path Selected", "white");
    //                 speak(`Hi. I am your personal AI love coach be happy I will accompany you during dating,
    //                      don't be nervous Take a deep breath. I'll ask you both a lot of interesting questions
    //                      Just answering alternatively Remember to look the eyes each other when talking Because
    //                      the eyes are the windows to the soul. When you both finish answer, please speak “BeHappy” to let me know`);

    //                 setBotSays("you selected the english path");
    //             }
    //             // ! detects chinese hello
    //             else {
    //                 consoleLogColor("Chinese Path Selected", "white");
    //                 setBotSays("you selected the chinese path");

    //                 speak(
    //                     `您好. 我是你专属的人工智能爱情教练 小悦
    //                 接下来，我将陪伴你一起约会，不要紧张喔
    //                  放松深呼吸. 我会问你们俩很多有趣的问题
    //                  你们轮流回答就好了
    //                 记得说话的时候. 要看着彼此的眼睛
    //                 因为眼睛是心灵的窗口
    //                 当你们俩都回答完. 请对我说 “小悦”
    //                     `,
    //                     21
    //                 );
    //             }
    //         },
    //     },
    // ];

    // // * English Progress
    // const englishCommands = [
    //     {
    //         command: "be happy", // ! Be Happy Command
    //         callback: ({ command }) => {
    //             consoleLogColor(command + " command >>>", "#00D024"); // ?
    //             consoleLogColor("topic number ===>> " + topicNumber, "#99dde7"); // ? number of topic
    //             checker(
    //                 questionsData[topicNumber - 1],
    //                 `so let's start the Questions of the topic ${topicNumber}`
    //             );
    //         },
    //     },
    //     {
    //         command: ["yes", "no"], // ! Yes or No Commands
    //         callback: ({ command }) => {
    //             consoleLogColor("topic number ===>> " + topicNumber, "#99dde7");
    //             if (questionNumber + 1 > questionsData[topicNumber - 1].length) {
    //                 if (command === "yes") {
    //                     // ? check if user complete the questions or not
    //                     if (topicNumber <= questionsData.length / 2) {
    //                         speak(
    //                             "Great, it looks like you have good conversation. Science shows that every great love story is a never-ending conversation! Next, I will keep asking you both more fun and interesting questions. waiting for you talking together, Be You, Be Happy!"
    //                         );
    //                         setBotSays(
    //                             "Great, it looks like you have good conversation. Science shows that every great love story is a never-ending conversation! Next, I will keep asking you both more fun and interesting questions. waiting for you talking together, Be You, Be Happy!"
    //                         );
    //                     } else {
    //                         speak(
    //                             "Congratulations, you find your love successfully. Please check your dating report in your Email! Today, all of questions has helped you know each other in the first impression. Science shows that every great love story is a never-ending conversation!  I have more dating coaching service to help you fall in love scientifically.  Waiting for you talking together and find your true love! Be You, Be Happy!"
    //                         );
    //                         setBotSays(
    //                             "Congratulations, you find your love successfully. Please check your dating report in your Email! Today, all of questions has helped you know each other in the first impression. Science shows that every great love story is a never-ending conversation!  I have more dating coaching service to help you fall in love scientifically.  Waiting for you talking together and find your true love! Be You, Be Happy!"
    //                         );
    //                     }
    //                 } else {
    //                     // ? check if user complete the questions or not
    //                     if (topicNumber <= questionsData.length / 2) {
    //                         speak(
    //                             "Don't be sad, love is a high choice of hormones. You deserve for true love, who is waiting for you in this world.  I will continue to help you to find your true love scientifically! Be You, Be Happy!"
    //                         );
    //                         setBotSays(
    //                             "Don't be sad, love is a high choice of hormones. You deserve for true love, who is waiting for you in this world.  I will continue to help you to find your true love scientifically! Be You, Be Happy!"
    //                         );
    //                     } else {
    //                         speak(
    //                             "Don't be sad, love is a high choice of hormones. You deserve for true love, who is waiting for you in this world.  Please check your dating report in your Email .I will continue to help you to find your true love scientifically! Be You, Be Happy!"
    //                         );
    //                         setBotSays(
    //                             "Don't be sad, love is a high choice of hormones. You deserve for true love, who is waiting for you in this world.  Please check your dating report in your Email .I will continue to help you to find your true love scientifically! Be You, Be Happy!"
    //                         );
    //                     }
    //                 }
    //                 topicController();
    //             }
    //         },
    //     },
    // ];

    // // * Chinese Progress
    // const chineseCommands = [
    //     {
    //         command: ["be happy"], // ! Be Happy Command in Chinese language
    //         callback: ({ command }) => {
    //             consoleLogColor(command + " command >>>", "#00D024"); // ?
    //             consoleLogColor("topic number ===>> " + topicNumber, "#99dde7"); // ? number of topic
    //             checker(questionsData[topicNumber + 2], "所以讓我們開始問題 ", true);
    //         },
    //     },
    //     {
    //         command: ["是", "否"], // ! Yes or No in chinese language
    //         callback: ({ command }) => {
    //             consoleLogColor("topic number ===>> " + topicNumber, "red");
    //             if (questionNumber + 1 > questionsData[topicNumber - 1].length) {
    //                 if (command === "是") {
    //                     // ? bot detects "yes" in chinese language
    //                     if (topicNumber <= questionsData.length / 2) {
    //                         speak(
    //                             "非常棒，看起来你们很聊的来喔，科学表明，真爱就是一辈子都有聊不完的话题喔！接下来我会继续问你们，更多好玩有趣的问题，等着你们一起来聊，做最好的自己，一起必悦喔！",
    //                             19
    //                         );
    //                         setBotSays(
    //                             "非常棒，看起来你们很聊的来喔，科学表明，真爱就是一辈子都有聊不完的话题喔！接下来我会继续问你们，更多好玩有趣的问题，等着你们一起来聊，做最好的自己，一起必悦喔！"
    //                         );
    //                     } else {
    //                         speak(
    //                             "恭喜你们，牵手成功!稍后你会在邮箱里收到你们的约会预测报告！今天的问题让你们彼此有了初步的了解，真爱需要科学经营，我还有更多的约会教练服务，帮助你们科学相爱，等着你们一起来聊，找到属于自己的真爱喔！做最好的自己，一起必悦喔！",
    //                             19
    //                         );
    //                         setBotSays(
    //                             "恭喜你们，牵手成功!稍后你会在邮箱里收到你们的约会预测报告！今天的问题让你们彼此有了初步的了解，真爱需要科学经营，我还有更多的约会教练服务，帮助你们科学相爱，等着你们一起来聊，找到属于自己的真爱喔！做最好的自己，一起必悦喔！"
    //                         );
    //                     }
    //                 } else {
    //                     // ? bot detects "no" in chinese language
    //                     if (topicNumber <= 3) {
    //                         speak(
    //                             "不要难过，相爱是荷尔蒙的高度选择，这个世界总有一个属于你的真爱，在不远的地方等着你，我会继续帮助你们，科学找寻真爱喔！做最好的自己，一起必悦喔",
    //                             19
    //                         );
    //                         setBotSays(
    //                             "不要难过，相爱是荷尔蒙的高度选择，这个世界总有一个属于你的真爱，在不远的地方等着你，我会继续帮助你们，科学找寻真爱喔！做最好的自己，一起必悦喔"
    //                         );
    //                     } else {
    //                         speak(
    //                             "不要难过，相爱是荷尔蒙的高度选择，这个世界总有一个属于你的真爱，在不远的地方等着你. 稍后你会在邮箱里收到你们的约会预测报告. 我会继续帮助你们，科学找寻真爱喔！做最好的自己，一起必悦喔！",
    //                             19
    //                         );
    //                         setBotSays(
    //                             "不要难过，相爱是荷尔蒙的高度选择，这个世界总有一个属于你的真爱，在不远的地方等着你. 稍后你会在邮箱里收到你们的约会预测报告. 我会继续帮助你们，科学找寻真爱喔！做最好的自己，一起必悦喔！"
    //                         );
    //                     }
    //                 }
    //                 topicController();
    //             }
    //         },
    //     },
    // ];

    // // * get speechRecognition variables
    // const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({
    //     commands: botStarting // ! detects if the bot is ON or OFF
    //         ? language === "CN" // ! detects language
    //             ? chineseCommands
    //             : englishCommands
    //         : startingCommands,
    // });

    // useEffect(() => {
    //     // ! if the bot is Speaking the browser will stop listening
    //     // const unsubscribe = isBotSpeaking
    //     //     ? SpeechRecognition.stopListening()
    //     //     : SpeechRecognition.startListening({ language: language === "CN" ? "zh-CN" : "en-US" });
    //     // return unsubscribe;
    //     // say("Hi! My name is Amy. I will read any text you type here.", "Amy");
    // }, []);

    // // *  check if browser supports or not
    // if (!browserSupportsSpeechRecognition) {
    //     consoleLogColor("not supported", "white");
    // }

    // ! print any statement in the console
    // useEffect(() => console.log(transcript), [transcript]);

    // const [fileUploadData, setFileUploadData] = useState(null);

    // const upload = async () => {
    //     console.log(fileUploadData);
    //     const formData = new FormData();
    //     formData.append("uploadFile", fileUploadData.file);
    //     formData.append("bucketName", fileUploadData.bucketName);
    //     formData.append("fileName", fileUploadData.fileName);
    //     console.log(formData);
    //     const uploaded = await axios.post("http://localhost:5500/upload", formData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         },
    //     });
    //     console.log(uploaded);
    // };

    const { myVideo } = useContext(SocketContext);

    return (
        <div className="videoLayout">
            <ReactPlayer url={myVideo} playing={true} />

            <video src={myVideo}></video>
            {/* <div
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
                {/* <MeetingCard speaking={isBotSpeaking} /> *
            </div> */}

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
