import React from "react";
import "./styles/authMessageStyle.css";

export default function AuthMessage(props) {
    return(
        <div className="messageText">
            *{props.message.msgBody}
        </div>
    )
}