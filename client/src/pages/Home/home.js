import React from "react";
import history from '../../history';

export default function Home() {

    return (
        <div>
            <div onClick={() => history.push("/login")}>
                sign in
            </div>
        </div>
    );
}