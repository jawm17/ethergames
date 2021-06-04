import React, { useState, useContext } from "react";
import { createStage, checkCollision } from "../../gameHelpers";
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";
import { useInterval } from "../../hooks/useInterval";
import { useGameStatus } from "../../hooks/useGameStatus";
import { AuthContext } from '../../context/AuthContext';
import UserService from "../../services/UserService";
import axios from "axios";
import Stage from './Stage';
import Display from './Display';
import StartButton from "./StartButton";

const Tetris = (props) => {
    const authContext = useContext(AuthContext);
    let address = authContext.address;
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [startDisplay, setStartDisplay] = useState("flex");
    const [endDisplay, setEndDisplay] = useState("none");

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const style = {
        startScreen: {
            display: startDisplay,
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "yellow",
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            justifyContent: "center",
            alignItems: "center",

        },
        endScreen: {
            display: endDisplay,
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "yellow",
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            justifyContent: "center",
            alignItems: "center",

        }
    }

    const movePlayer = (dir) => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }

    async function startGame() {
        if (address) {
            try {
                const data = await axios.post("/user/balance", { "address": address });
                const { balance } = data.data;
                if (Math.floor(balance / 0.0001) >= 1) {
                    //reset everything
                    setStage(createStage());
                    setDropTime(1000);
                    setStartDisplay("none");
                    setEndDisplay("none");
                    resetPlayer();
                    setGameOver(false);
                    setScore(0);
                    setRows(0);
                    setLevel(0);
                    props.start();
                } else {
                    alert("Please deposit funds in your account");
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const drop = () => {
        // increase level when player has cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            // increase speed
            setDropTime(1000 / (level + 1) + 200);
        }
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            // game over 
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
                props.gameOver(score);
                setEndDisplay("flex");
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime)

    return (
        <div>
            <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={e => keyUp(e)}>
                <div id="startScreen" style={style.startScreen}>
                    <div id="startInfo">
                        <div id="snakeStartTitle">
                            TETRIS
                        </div>
                        <div id="snakeStartSub">
                            Press play to start
                        </div>
                    </div>
                </div>
                <div id="startScreen" style={style.endScreen}>
                    <div id="startInfo">
                        <div id="snakeEndTitle">
                            Game Over
                        </div>
                        <div id="snakeStartSub">
                            Press play to start
                        </div>
                    </div>
                </div>
                <StyledTetris>
                    <Stage stage={stage} />
                </StyledTetris>
                <aside>
                    <div id="test">
                        <Display text={`Level: ${level}`} />
                        <Display text={`Rows: ${rows}`} />
                        <Display text={`Score: ${score}`} />
                    </div>
                </aside>
                <div>
                    <StartButton callback={startGame} />
                </div>
            </StyledTetrisWrapper>
        </div>
    );

}
export default Tetris;