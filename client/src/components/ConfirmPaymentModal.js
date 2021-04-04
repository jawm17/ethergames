import React from "react";
import "./styles/confirmPaymentModalStyle.css";

export default function ConfirmPaymentModal(props) {

    return (
        <div>
            <div id="grayedOut">
                <div id="modalRectangle">
                    <div id="paymentMessage">
                        This game cost $0.25 per play
                    </div>
                    <div id="ignoreDiv">
                        Don't show this message again
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"/>
                    </div>
                    <div id="confirmPaymentBtn" onClick={() => props.close()}>
                        confirm
                    </div>
                </div>
            </div>
        </div>
    );
}