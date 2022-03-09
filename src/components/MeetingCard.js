import { useRef } from "react";
import ReactPlayer from "react-player";

export default function MeetingCard({ img, speaking }) {
    // * make a reference for the video player
    const playerRef = useRef();
    return (
        <div className={`layout ${speaking && "isSpeaking"}`}>
            {img ? (
                <img src={img} alt="" />
            ) : (
                <ReactPlayer
                    height="100%"
                    width="100%"
                    url="./video/botVideo.mp4"
                    playing={speaking ? true : false}
                    muted={true}
                    ref={playerRef}
                    onProgress={({ playedSeconds }) => {
                        if (playedSeconds >= 300) {
                            playerRef.current?.seekTo(10);
                        }
                    }}
                />
            )}
        </div>
    );
}
