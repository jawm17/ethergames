import React from "react";
import "./styles/recieveEthModalStyle.css";

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
                    <h1>Address</h1> {props.address}
                </div>
                <div id="closeButton" onClick={() => props.close()}>
                    close
                </div>
            </div>
        </div>
    );
}