import React, { useEffect, useState } from "react";
import NavBar from "../../components/Nav/NavBar";
import Footer from "../../components/Footer/Footer";
import "../ThatNewNew/ThatNewNew.css";

export default function HomeScreen() {
  return (
    <div className="currentGameInfo" id="currentGameInfo">
      <h1>ETHER GAMES</h1>
      <p>Play Game You Love and Win Money</p>
    </div>
  );
}
