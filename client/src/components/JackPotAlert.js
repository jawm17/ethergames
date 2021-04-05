import React, { useEffect } from "react";
import "./styles/jackPotAlertStyle.css";
const confetti = require('canvas-confetti');

export default function JackPotAlert(props) {

    var myConfetti = confetti.create(document.getElementById("confettiCanvas"), { resize: true });

    useEffect(() => {
        myConfetti({
            zIndex: 1200,
            particleCount: 200,
            spread: 360,
            shapes: ["circle"]
        });
        setTimeout(() => {
            myConfetti.reset();
        }, 10000);
    })

    return (
        <div>
            <canvas id="confettiCanvas"></canvas>
            <div id="jackPotModalOuter">
                <div id="jackPotModal">
                    <div id="alertTitle">
                        NEW HIGHSCORE!!!
                    </div>
                    <div id="alertSubTitle">
                        You won {props.pot} eth
                    </div>
                    <div id="btnCenter">
                        <div id="closeJackPotModal" onClick={() => props.close()}>
                            close
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}