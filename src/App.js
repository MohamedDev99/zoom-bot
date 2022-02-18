import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import useSpeechSynthesis from "./hooks/useSpeechSynthesis";
import {
    englishQuestionsTopic1,
    englishQuestionsTopic2,
    chineseQuestionsTopic1,
    chineseQuestionsTopic2,
    englishQuestionsTopic3,
    chineseQuestionsTopic3,
} from "./data/testData";

const utterance = new window.SpeechSynthesisUtterance();

function App() {
    const say = (str) => {
        window.speechSynthesis.cancel();
        utterance.text = str;
        utterance.voice = speechSynthesis.getVoices()[voice === 1 ? 4 : 19];
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);
    };
    // * get SpeechSynthesis variables
    const { speak, voices, speaking } = useSpeechSynthesis({ onEnd: () => console.log("is end") });
    // const text = welcomeData[1];
    // const voice = voices[4];

    // * question number State
    // const [questionNumber, setQuestionNumber] = useState(0);
    //   //* start listening
    //   useEffect(() => {
    //     console.log(speaking + ">>>>");
    //     say("你好", 19);
    // }, [speaking]);

    const [questionNumber, setQuestionNumber] = useState(0);
    const [beHappy, setBeHappy] = useState(true);
    const [voice, setVoice] = useState(1);

    // * controll the topics
    const [topicNumber, setTopicNumber] = useState(1);
    const topicController = () => {
        console.log("topic number ===>> " + topicNumber);
        setQuestionNumber(0);
        if (topicNumber <= 3) {
            setTopicNumber((topicNumber) => topicNumber + 1);
        } else {
            setTopicNumber(0);
        }
    };
    // * get the topic number
    const getTopicNumber = (topicNumber, arrOfSolutions) => {
        console.log("topic number ===>> " + topicNumber);
        if (topicNumber === 1) {
            return arrOfSolutions[0];
        } else if (topicNumber === 2) {
            return arrOfSolutions[1];
        } else {
            return arrOfSolutions[2];
        }
    };

    // ? function for check the questions length
    const checker = (questions, startingWord) => {
        console.log(" length ===>> " + questions.length);
        if (questionNumber < questions.length) {
            if (beHappy) {
                // * choosing "be happy" at the first time
                console.log(questionNumber + " ===>> " + questions[questionNumber]);
                say({ startingWord } + questions[questionNumber]);
                setBeHappy(false);
                setQuestionNumber((questionNumber) => questionNumber + 1);
            } else {
                console.log(questionNumber + " ===>> " + questions[questionNumber]);
                say(questions[questionNumber]);
                setQuestionNumber((questionNumber) => questionNumber + 1);
            }
        } else {
            console.log(">>>> the end of questions");
            say(
                "Through the above questions, do you still want to continue dating? Please answer Yes or No",
                5
            );
            topicController();
        }
    };
    // * listening commands
    const commands = [
        {
            command: ["hi", "hello", "hey", "你好"], // ? the bot will be starting with english langue or chinese langue
            callback: ({ command }) => {
                console.log(command + " >>>");
                if (["hi", "hello", "hey"].includes(command)) {
                    //? detect hi , hello or hey
                    say(
                        "Hi, I am your personal AI love coach behappy I will accompany you during dating, don't be nervous Take a deep breath,"
                    );
                    setTimeout(() => {
                        say(
                            "I'll ask you both a lot of interesting questions Just answering alternatively Remember to look the eyes each other when talking Because the eyes are the windows to the soul."
                        );
                        setTimeout(
                            () =>
                                say(
                                    " When you both finish answer, please say “BeHappy” to let me know"
                                ),
                            9600
                        );
                    }, 6200);
                    setVoice(1);
                } else {
                    // ? detect chinese hello
                    say(
                        `您好，我是你专属的人工智能爱情教练 小悦
                    接下来，我将陪伴你一起约会，不要紧张喔
                     放松深呼吸，我会问你们俩很多有趣的问题
                     你们轮流回答就好了
                    记得说话的时候，要看着彼此的眼睛
                    因为眼睛是心灵的窗
                    当你们俩都回答完，请对我说 “小悦”`
                    );
                    say(
                        "您好，我是你专属的人工智能爱情教练, 小悦 接下来，我将陪伴你一起约会，不要紧张喔, 放松深呼吸"
                    );
                    setTimeout(() => {
                        say(
                            "我会问你们俩很多有趣的问题,你们轮流回答就好了, 记得说话的时候，要看着彼此的眼睛 因为眼睛是心灵的窗口"
                        );
                        setTimeout(() => say("当你们俩都回答完，请对我说 “小悦”."), 9600);
                    }, 7600);
                    setVoice(0);
                }
            },
        },
        {
            command: ["yes", "no", "是", "否"],
            callback: ({ command }) => {
                if (command === "yes") {
                    getTopicNumber(topicNumber, [
                        say(
                            "Great, it looks like you have good conversation. Science shows that every great love story is a never-ending conversation! Next, I will keep asking you both more fun and interesting questions. waiting for you talking together, Be You, Be Happy!"
                        ),
                        say(
                            "Great, it looks like you have good conversation. Science shows that every great love story is a never-ending conversation! Next, I will keep asking you both more fun and interesting questions. waiting for you talking together, Be You, Be Happy!"
                        ),
                        say(
                            "Congratulations, you find your love successfully. Please check your dating prediction report in your Email! Today, all of questions has helped you know each other in the first impression. Science shows that every great love story is a never-ending conversation!  I have more dating coaching service to help you fall in love scientifically.  Waiting for you talking together and find your true love! Be You, Be Happy!"
                        ),
                    ]);
                } else if (command === "是") {
                    // ? bot detects "yes" in chinese langue
                    getTopicNumber(topicNumber, [
                        say(
                            "非常棒，看起来你们很聊的来喔，科学表明，真爱就是一辈子都有聊不完的话题喔！接下来我会继续问你们，更多好玩有趣的问题，等着你们一起来聊，做最好的自己，一起必悦喔！"
                        ),
                        say(
                            "非常棒，看起来你们很聊的来喔，科学表明，真爱就是一辈子都有聊不完的话题喔！接下来我会继续问你们，更多好玩有趣的问题，等着你们一起来聊，做最好的自己，一起必悦喔！"
                        ),
                        say(
                            "恭喜你们，牵手成功!稍后你会在邮箱里收到你们的约会预测报告！今天的问题让你们彼此有了初步的了解，真爱需要科学经营，我还有更多的约会教练服务，帮助你们科学相爱，等着你们一起来聊，找到属于自己的真爱喔！做最好的自己，一起必悦喔！"
                        ),
                    ]);
                } else if (command === "否") {
                    // ? bot detects "no" in chinese langue
                    getTopicNumber(topicNumber, [
                        say(
                            "不要难过，相爱是荷尔蒙的高度选择，这个世界总有一个属于你的真爱，在不远的地方等着你，我会继续帮助你们，科学找寻真爱喔！做最好的自己，一起必悦喔"
                        ),
                        say(
                            "不要难过，相爱是荷尔蒙的高度选择，这个世界总有一个属于你的真爱，在不远的地方等着你，我会继续帮助你们，科学找寻真爱喔！做最好的自己，一起必悦喔"
                        ),
                        say(
                            "不要难过，相爱是荷尔蒙的高度选择，这个世界总有一个属于你的真爱，在不远的地方等着你. 稍后你会在邮箱里收到你们的约会预测报告. 我会继续帮助你们，科学找寻真爱喔！做最好的自己，一起必悦喔！"
                        ),
                    ]);
                } else {
                    getTopicNumber(topicNumber, [
                        say(
                            "Don't be sad, love is a high choice of hormones. You deserve for true love, who is waiting for you in this world.  I will continue to help you to find your true love scientifically! Be You, Be Happy!"
                        ),
                        say(
                            "Don't be sad, love is a high choice of hormones. You deserve for true love, who is waiting for you in this world.  I will continue to help you to find your true love scientifically! Be You, Be Happy!"
                        ),
                        say(
                            "Don't be sad, love is a high choice of hormones. You deserve for true love, who is waiting for you in this world.  Please check your dating prediction report in your Email .I will continue to help you to find your true love scientifically! Be You, Be Happy!"
                        ),
                    ]);
                }
            },
        },
        {
            command: ["be happy", "谢谢"],
            callback: ({ command }) => {
                console.log(command + " >>>");
                console.log("question ==>> " + questionNumber); // ? number of question
                if (command === "be happy") {
                    // * english progress
                    // getTopicNumber(topicNumber, [
                    //     checker(englishQuestionsTopic1, "so let's start the Questions ...."),
                    //     checker(englishQuestionsTopic2, "so let's start the Questions ...."),
                    //     checker(englishQuestionsTopic3, "so let's start the Questions ...."),
                    // ]);
                    console.log("topic number ===>> " + topicNumber);
                    if (topicNumber === 1) {
                        checker(englishQuestionsTopic1, "so let's start the Questions ....");
                    } else if (topicNumber === 2) {
                        checker(englishQuestionsTopic2, "so let's start the Questions ....");
                    } else {
                        checker(englishQuestionsTopic3, "so let's start the Questions ....");
                    }
                } else {
                    // * chinese progress
                    getTopicNumber(topicNumber, [
                        checker(chineseQuestionsTopic1, "所以讓我們開始問題 ...."),
                        checker(chineseQuestionsTopic2, "所以讓我們開始問題 ...."),
                        checker(chineseQuestionsTopic3, "所以讓我們開始問題 ...."),
                    ]);
                }
            },
        },
    ];

    // * get speechRecognition variables
    const { transcript, resetTranscript, browserSupportsSpeechRecognition, listening } =
        useSpeechRecognition({ commands });

    useEffect(() => SpeechRecognition.startListening({ language: "zh-CN" }));

    // *  check if browser supports or not
    if (!browserSupportsSpeechRecognition) {
        console.log("not supported");
    }

    // useEffect(() => console.log(transcript), [transcript]);

    return (
        <div className="">
            <img className="pics" src="/img/2.jpg" alt="" />
        </div>
    );
}

export default App;
