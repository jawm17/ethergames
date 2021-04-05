import React, { useContext, useState, useEffect } from "react";
import history from "../../history";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import "./navBarStyle.css";

const NavBar = (props) => {
    const [colorStyle, setColorStyle] = useState({ borderColor: "rgb(72, 254, 12)", color: "rgb(72, 254, 12)" });
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

    const style = {
        tetrisColor: {
            borderColor: "yellow",
            color: "yellow"
        },
        snakeColor: {
            borderColor: "rgb(72, 254, 12)",
            color: "rgb(72, 254, 12)"
        },
        asteroidsColor: {
            borderColor: "gray",
            color: "lightgray"
        },
        pacmanColor: {
            borderColor: "blue",
            color: "lightblue"
        },
    }

    useEffect(() => {
        if (props.page === "snake") {
            setColorStyle(style.snakeColor);
        } else if (props.page === "tetris") {
            setColorStyle(style.tetrisColor)
        } else if (props.page === "asteroids") {
            setColorStyle(style.asteroidsColor)
        } else if (props.page === "pacman") {
            setColorStyle(style.pacmanColor)
        }
    }, []);

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
                        <h1 id="logoMain" style={colorStyle} onClick={() => history.push("/")}>ethergames.io</h1>
                        <div className="nav-links">
                            <div className="inline">
                                <div className="navButton" style={colorStyle} onClick={() => history.push("/")}>Arcade</div>
                            </div>
                            <div className="inline">
                                <div className="navButton" style={colorStyle} onClick={() => history.push("/account")}>Account</div>
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
