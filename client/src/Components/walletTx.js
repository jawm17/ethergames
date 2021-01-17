import React, { useState, useEffect } from "react";

export default function WalletTx(props) {
    const [txText, setTxText] = useState("");
    const [date, setDate] = useState(0);

    useEffect(() => {
        checkTx();
        formatDate(props.date);
    }, []);

    function checkTx() {
        if (props.address.toUpperCase() === props.to.toUpperCase()) {
            setTxText(`Recieved ETH from ${props.from}`);
        }
    }

    function formatDate(date) {
        // set date
        if (date.length === 10) {
            let adjustedDate = parseInt(date + "000");
            let time = new Date(adjustedDate);
            setDate(time);
        } else {
            let time = new Date(date);
            setDate(time);
        }
    }

    if (txText) {
        return (
            <tr>
                <td>{((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()}</td>
                <td>{txText}</td>
                <td>{props.amount}</td>
            </tr>
        );
    } else {
        return null;
    }
}