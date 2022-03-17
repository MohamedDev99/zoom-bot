import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { ContextProvider } from "./hooks/Context";
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { lightTheme, MeetingProvider } from "amazon-chime-sdk-component-library-react";
import { ThemeProvider } from "styled-components";
import { ConsoleLogger, LogLevel, VideoPriorityBasedPolicy } from "amazon-chime-sdk-js";
import MeetingId from "./components/meetingId";
import { RecoilRoot } from "recoil";

const logger = new ConsoleLogger("SDK", LogLevel.INFO);
const videoDownlinkBandwidthPolicy = new VideoPriorityBasedPolicy(logger);

const meetingConfig = {
    logger,
    videoDownlinkBandwidthPolicy,
};

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ThemeProvider theme={lightTheme}>
                <MeetingProvider {...meetingConfig}>
                    <RecoilRoot>
                        <Routes>
                            <Route path="/" element={<App />} />
                            <Route path="/:id" element={<MeetingId />} />
                        </Routes>
                    </RecoilRoot>
                </MeetingProvider>
            </ThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
