import React, { useState, useEffect } from "react";
import "./styles/scoreTxStyle.css";

export default function ScoreTx(props) {
    const [date, setDate] = useState(0);

    useEffect(() => {
        formatDate(props.date);
    }, []);

    function formatDate(date) {
        let time = new Date(date);
        setDate(time);
    }

    if (date != 0) {
        return (
            <div className="scores-body">
                <li>
                    {(date.getMonth() > 8
                        ? date.getMonth() + 1
                        : "0" + (date.getMonth() + 1)) +
                        "/" +
                        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
                        "/" +
                        date.getFullYear()}
                </li>
                <li>
                    {props.score}
                </li>
                <li>
                    {props.game}
                </li>
            </div>
        );
    } else {
        return null;
    }
}