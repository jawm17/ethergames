import React from "react";
import "./styles/confirmPaymentModalStyle.css";

export default function ConfirmPaymentModal(props) {

    return (
        <div>
            <div id="grayedOut">
                <div id="modalRectangle">
                    <div id="confirmPaymentBtn" onClick={() => props.close()}>
                        confirm
                    </div>
                </div>
            </div>
        </div>
    );
}