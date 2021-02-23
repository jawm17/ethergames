import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";

const StartButton = ({callback}) => (
    <StyledStartButton onClick={callback} id="pointer">
         play
    </StyledStartButton>
);

export default StartButton;