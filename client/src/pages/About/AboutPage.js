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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Dignissim cras tincidunt lobortis feugiat vivamus at augue. Morbi
              quis commodo odio aenean sed adipiscing diam donec.
            </p>
          </div>
          <div className="about-header">
            <h1>Future Development</h1>
          </div>
          <div className="about-paragraph">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Dignissim cras tincidunt lobortis feugiat vivamus at augue. Morbi
              quis commodo odio aenean sed adipiscing diam donec.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
