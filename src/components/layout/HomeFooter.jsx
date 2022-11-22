import React from "react";
import "../../styles/Footer.css";
import { BsTwitter, BsGithub } from "react-icons/bs";

const HomeFooter = () => {
  return (
    <footer className="homeFooter">
      <div className="footerCard">
        <div className="footLogo  hideFoot">
          <h1>graze</h1>
        </div>

        <div className="footmedium">
          <p>
            Made by{" "}
            <a href="https://reetesh-virous.netlify.app/" target="_blank">
              Reetesh
            </a>{" "}
            with Love.
          </p>
          <span>&copy; {new Date().getFullYear()} All rights reserved</span>
        </div>

        <div className="footSocial  hideFoot">
          <a href="https://twitter.com/imbitcoinb" target="_blank">
            <BsTwitter />
          </a>

          <a href="https://github.com/Virous77" target="_blank">
            <BsGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
