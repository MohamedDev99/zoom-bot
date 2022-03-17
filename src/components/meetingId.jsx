import {
    AudioInputControl,
    ContentShareControl,
    ControlBar,
    useMeetingManager,
    UserActivityProvider,
    VideoInputControl,
    VideoTileGrid,
} from "amazon-chime-sdk-component-library-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { meetingInfo } from "../atom/meetingAtom";

export default function MeetingId() {
    const params = useParams();
    const meetingData = useRecoilValue(meetingInfo);
    const meetingManager = useMeetingManager();

    console.log(meetingData);

    useEffect(() => {
        // Use the join API to create a meeting session using the above data
        const join = async () => {
            await meetingManager.join(meetingData);
            // Skip devices setup

            // Start the session to join the meeting
            await meetingManager.start();
        };
        join();
    }, [meetingData, meetingManager]);
    return (
        <div className="flex items-center justify-center h-screen">
            Meeting Id : {params.id}
            <div>
                <UserActivityProvider>
                    <VideoTileGrid layout="standard" className="videos" />
                    <ControlBar className="controls-menu" layout="docked-horizontal" showLabels>
                        <AudioInputControl />
                        <VideoInputControl />
                        <ContentShareControl />
                    </ControlBar>
                </UserActivityProvider>
            </div>
        </div>
    );
}
