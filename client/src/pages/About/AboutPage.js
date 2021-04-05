import React from "react";
import NavBar from "../../components/Nav/NavBar";
import Footer from "../../components/Footer/Footer";
import "./AboutPage.css";

export default function About() {
  return (
    <div>
      <NavBar />
      <div id="about">
        <div className="about-hero-container">
            <div className="ether-logo"></div>
        </div>
      </div>
      <div className="about-words-container">
        <div className="about-words">
          <div className="about-header">
            <h1>About</h1>
          </div>
          <div className="about-paragraph">
            <p>
              Ethergames is a pay-per-play classic arcade style gaming site where users can win real money. 
              The site uses the cryptocurrency Ethereum for secure, trustless payments. Deposit Ethereum in your account and start playing.
            </p>
          </div>
          <div className="about-header">
            <h1>Future Development</h1>
          </div>
          <div className="about-paragraph">
            <p>
              Multiplayer games and custom lottery coming soon!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
