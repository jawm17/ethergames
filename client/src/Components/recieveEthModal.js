import React from "react";
import "./recieveEthModalStyle.css";

export default function RecieveEthModal(props) {

    return (
        <div id="gray">
            <div id="modalBodyRecieving">
                <div id="recieveTitle">
                Ethereum address
                </div>
                <div>
                    <img src={props.qr}></img>
                </div>
                <div>
                    {props.address}
                </div>
                <div id="closeButton" onClick={() => props.close()}>
                    exit
                </div>
            </div>
        </div>
    );
}