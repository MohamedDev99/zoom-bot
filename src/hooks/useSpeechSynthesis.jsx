import { useEffect, useState } from "react";

const useSpeechSynthesis = (props = {}) => {
    const [voices, setVoices] = useState([]);
    const [isBotSpeaking, setIsBotSpeaking] = useState(false);
    const [supported, setSupported] = useState(false);

    const processVoices = (voiceOptions) => {
        setVoices(voiceOptions);
    };

    const getVoices = () => {
        // Firefox seems to have voices upfront and never calls the
        // voiceschanged event
        let voiceOptions = window.speechSynthesis.getVoices();
        if (voiceOptions.length > 0) {
            processVoices(voiceOptions);
            return;
        }

        window.speechSynthesis.onvoiceschanged = (event) => {
            voiceOptions = event.target.getVoices();
            processVoices(voiceOptions);
        };
    };

    useEffect(() => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            setSupported(true);
            getVoices();
        }
    }, []);

    const speak = (txt, voice) => {
        if (!supported) return;
        setIsBotSpeaking(true);
        // Firefox won't repeat an utterance that has been
        // spoken, so we need to create a new instance each time
        const utterance = new window.SpeechSynthesisUtterance();
        let myTimeout;
        function myTimer() {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
            myTimeout = setTimeout(myTimer, 10000);
        }
        myTimeout = setTimeout(myTimer, 10000);
        window.speechSynthesis.cancel();
        utterance.text = txt;
        utterance.voice = window.speechSynthesis.getVoices()[voice ? voice : 4];
        // console.log("Voice : " + window.speechSynthesis.getVoices()[voice ? voice : 4].name);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.onend = () => {
            setIsBotSpeaking(false);
            clearTimeout(myTimeout);
        };
        window.speechSynthesis.speak(utterance);
    };

    const cancel = () => {
        if (!supported) return;
        setIsBotSpeaking(false);
        window.speechSynthesis.cancel();
    };

    return {
        supported,
        speak,
        isBotSpeaking,
        cancel,
        voices,
    };
};

export default useSpeechSynthesis;
