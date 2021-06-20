import React from "react";
import SnakeGame from "../Snake/SnakeGame";
import PacboyScreen from "../GameHomeScreens/PacboyScreen";
import TetrisScreen from "../GameHomeScreens/TetrisScreen";
import Asteroids from "../Asteroids/Asteroids";
import HomeScreen from "../GameHomeScreens/HomeScreen";

export default function GameSwitcher(props) {
    if (props.game === "snake") {
        return (
            <div id="currentGame-container">
                <SnakeGame />
            </div>
        );
    } else if (props.game === "asteroids") {
        return (
            <div id="currentGame-container">
                <Asteroids />
            </div>
        );
    } else if (props.game === "tetris") {
        return (
            <div id="currentGame-container">
                <TetrisScreen />
            </div>
        );
    } else if (props.game === "pacman") {
        return (
            <div id="currentGame-container">
                <PacboyScreen />
            </div>
        );
    } else {
        return (
            <div id="currentGame-container">
                <HomeScreen/>
            </div>
        );
    }
}