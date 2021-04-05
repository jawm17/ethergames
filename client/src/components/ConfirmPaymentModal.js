import React, { useState } from "react";
import "./styles/confirmPaymentModalStyle.css";

export default function ConfirmPaymentModal(props) {
    const [checked, setChecked] = useState(false);

    function handleChange(checkbox) {
        if(checkbox.target.checked === true) {
            setChecked(true);
            console.log("checked");
        } else {
            setChecked(false);
            console.log("not checked");
        }
    }

    function confirmPayment() {
        if(checked) {
            localStorage.setItem(`confirmedPayment${props.game}`, true);
            props.close();
        } else {
            props.close();
        }
    }

    return (
        <div>
            <div id="grayedOut">
                <div id="modalRectangle">
                    <div id="paymentMessage">
                        This game cost $0.25 per play
                    </div>
                    <div id="ignoreDiv">
                        Don't show this message again
                        <input type="checkbox" onChange={(e) => handleChange(e)}  id="vehicle3" name="vehicle3" value="Boat"/>
                    </div>
                    <div id="confirmPaymentBtn" onClick={() => confirmPayment()}>
                        confirm
                    </div>
                </div>
            </div>
        </div>
    );
}