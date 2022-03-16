import { useParams } from "react-router-dom";

export default function MeetingId() {
    const params = useParams();
    return (
        <div className="flex items-center justify-center h-screen">Meeting Id : {params.id}</div>
    );
}
