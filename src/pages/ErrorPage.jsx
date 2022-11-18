import React from "react";
import notFound from "../images/notFound.svg";
import { Link } from "react-router-dom";
import "../styles/Error.css";

const ErrorPage = () => {
  return (
    <section className="errorBar">
      <div className="errorCard">
        <img src={notFound} alt="404 Error" />
        <span>404 Error, Page Not Found!!</span>

        <Link to="/">
          <button>Back Home</button>
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
