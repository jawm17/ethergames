import React from "react";
import history from "../../history";
import "./footerStyle.css";

const Footer = () => {
  return (
    <footer className="footerHome">
      <div className="icons-container">
        <div className="icons">
          <a href="https://www.facebook.com/">
            <i class="fab fa-reddit"></i>
          </a>
        </div>
        <div className="icons">
          <a href="https://twitter.com/?lang=en">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <div className="icons">
          <a href="https://www.instagram.com/?hl=en">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="icons">
          <a href="https://www.youtube.com/">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <div className="icons">
          <a href="https://www.linkedin.com/">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
      <div className="footer-info">
        <ul id="footer-list">
          <li className="footer-page" onClick={() => history.push("/about")}>about</li>
          <li className="footer-page">terms</li>
          <li className="footer-page">need help?</li>
          <li className="footer-page">token</li>
        </ul>
      </div>
      {/* <div className="support-title">
                <h1>More Supporters</h1>
            </div>
            <div className="support-container">
                <div className="icons"><i className="fab fa-apple"></i></div>
                <div className="icons"><i className="fab fa-google"></i></div>
                <div className="icons"><i className="fab fa-js"></i></div>
                <div className="icons"><i className="fab fa-github"></i></div>
            </div> */}
      <div className="copy-write">
        <p>©2021 ethergames.io</p>
      </div>
    </footer>
  );
};
export default Footer;
