import React from "react";
import "./sendEthModalStyle.css";

export default function SendEthModal(props) {

    return (
        <div id="gray">
            <div id="modalBody">
                <div id="withdrawTitle">
                    Withdraw Funds
                </div>
                <div id="closeButton" onClick={() => props.close()}>
                    exit
                </div>
            </div>
        </div>
    );
}