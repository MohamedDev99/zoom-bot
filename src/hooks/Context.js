import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

// const socket = io("http://localhost:5000");
const socket = io("https://socket-server-ss.vercel.app/");

const ContextProvider = ({ children }) => {
    const isAdmin = window.location.hash === "#init" ? true : false;

    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState("");
    const [call, setCall] = useState({});
    const [me, setMe] = useState("");
    const [isEnabled, setIsEnabled] = useState({ video: true, audio: true });

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
            console.log(myVideo);
        });

        if (isAdmin) {
            socket.on("me", (id) => {
                setMe(id);
                console.log("isConnected ..." + id);
            });
        }

        socket.on("callUser", ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, []);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: call.from });
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on("signal", (data) => {
            socket.emit("callUser", { userToCall: id, signalData: data, from: me, name });
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    };

    const playStop = () => {
        let enabled = myVideo.current.srcObject.getVideoTracks()[0].enabled;
        if (enabled) {
            myVideo.current.srcObject.getVideoTracks()[0].enabled = false;
            setIsEnabled((pre) => {
                return { ...pre, video: false };
            });
        } else {
            myVideo.current.srcObject.getVideoTracks()[0].enabled = true;
            setIsEnabled((pre) => {
                return { ...pre, video: true };
            });
        }
    };

    const muteUnmute = () => {
        const enabled = myVideo.current.srcObject.getAudioTracks()[0].enabled;
        if (enabled) {
            myVideo.current.srcObject.getAudioTracks()[0].enabled = false;
            setIsEnabled((pre) => {
                return { ...pre, audio: false };
            });
        } else {
            myVideo.current.srcObject.getAudioTracks()[0].enabled = true;
            setIsEnabled((pre) => {
                return { ...pre, audio: true };
            });
        }
    };

    return (
        <SocketContext.Provider
            value={{
                call,
                callAccepted,
                myVideo,
                userVideo,
                stream,
                name,
                setName,
                callEnded,
                me,
                callUser,
                leaveCall,
                answerCall,
                playStop,
                muteUnmute,
                isEnabled,
            }}>
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
