import React from "react";
import "./AuthStyle.css";

export default function Login() {

    return (
        <div>
            <h1 id="logo"><a href="index.html">Crypto Arcade</a></h1>
            <form autocomplete="off" class="form">
                <div class="control">
                    <h1>Sign up</h1>
                </div>
                <div class="control block-cube block-input">
                    <input name="username" placeholder="Username" type="text" />
                    <div class="bg-top">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg-right">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg">
                        <div class="bg-inner"></div>
                    </div>
                </div>
                <div class="control block-cube block-input">
                    <input name="password" placeholder="Password" type="password" />
                    <div class="bg-top">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg-right">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg">
                        <div class="bg-inner"></div>
                    </div>
                </div>
                <div class="control block-cube block-input">
                    <input name="password" placeholder="Repeat Password" type="password" />
                    <div class="bg-top">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg-right">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg">
                        <div class="bg-inner"></div>
                    </div>
                </div>
                <button class="btn block-cube block-cube-hover" type="button">
                    <div class="bg-top">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg-right">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="text">SIGN UP</div>
                </button>
                <div class="already-have">
                    <p><a href="log-in.html">Already have an account? Sign in</a></p>
                </div>
            </form>
        </div>
    );
}