import React, { useContext, useState } from "react";
import history from "../../history";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import "./navBarStyle.css";

const NavBar = (props) => {
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
        AuthContext
    );

    const onClickLogoutHandler = () => {
        AuthService.logout().then((data) => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    };

    const unauthenticatedNavBar = () => {
        return (
            <>
                <nav id="nav">
                    <h1 id="logoMain" onClick={() => history.push("/")}>ethergames.io</h1>
                    <div className="nav-links">
                        <div className="inline">
                            <div className="navButton" onClick={() => history.push("/")}>Arcade</div>
                        </div>
                        <div className="inline">
                            <div className="navButton" onClick={() => history.push("/login")}>Log In</div>
                        </div>
                    </div>
                </nav>
            </>
        )
    }

    const authenticatedNavBar = () => {
        if (props.page === "account") {
            return (
                <>
                    <nav id="nav">
                        <h1 id="logoMain" onClick={() => history.push("/")}>ethergames.io</h1>
                        <div className="nav-links">
                            <div className="inline">
                                <div className="navButton" onClick={() => history.push("/")}>Arcade</div>
                            </div>
                            <div className="inline">
                                <div className="navButton" onClick={() => onClickLogoutHandler()}>Log Out</div>
                            </div>
                        </div>
                    </nav>
                </>
            )
        } else {
            return (
                <>
                    <nav id="nav">
                        <h1 id="logoMain" onClick={() => history.push("/")}>ethergames.io</h1>
                        <div className="nav-links">
                            <div className="inline">
                                <div className="navButton" onClick={() => history.push("/")}>Arcade</div>
                            </div>
                            <div className="inline">
                                <div className="navButton" onClick={() => history.push("/account")}>Account</div>
                            </div>
                            {/* <label className="switch">
                                <input type="checkbox" checked={staked} onClick={() => setStaked(!staked)} />
                                <span className="slider round"></span>
                                <div className="sliderTitle">{staked ? "paid" : "free"}</div>
                            </label> */}
                        </div>
                    </nav>
                </>
            )
        }
    }

    return (
        <>
            {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </>
    )
};
export default NavBar;
