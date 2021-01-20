import React from "react";

export default function Bubbles() {

    const style = {
        outer: {
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            backgroundColor: "pink"
        }
    }

    return (
        <div style={style.outer}>

        </div>
    );
}