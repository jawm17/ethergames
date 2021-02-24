import React, { useContext } from "react";
import "./footerStyle.css";

const Footer = (props) => {
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
        <ul>
          <a href="">
            <li>About</li>
          </a>
          <a href="">
            <li>Need Help?</li>
          </a>
          <a href="">
            <li>Destinations</li>
          </a>
          <a href="">
            <li>Tips</li>
          </a>
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
        <p>©2021 Ether Games</p>
      </div>
    </footer>
  );
};
export default Footer;
