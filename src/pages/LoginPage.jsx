import React, { useState } from "react";
import { useAuthContext } from "../store/authContext";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import "../styles/Auth.css";
import { Link } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";

const LoginPage = () => {
  const { user, login, setUser, loading } = useAuthContext();
  const { name, email, password } = user;
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <section className="registerBar">
      <div className="registerCard">
        <h1>Sign In</h1>

        <form onSubmit={login}>
          <div className="formInput">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="formInput">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />

            {showPassword ? (
              <BsFillEyeSlashFill
                className="eyeIcon"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <BsFillEyeFill
                className="eyeIcon"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <div className="loginWith">
            <p>
              Don't have an Account?
              <Link to="/register">
                <span> Register</span>
              </Link>
            </p>
          </div>

          <button>{loading ? "Processing..." : "Sign In"}</button>
        </form>

        <div className="orMore">
          <div className="formLine"></div>
          <p>OR</p>
          <div className="formLine"></div>
        </div>

        <GoogleAuth />
      </div>
    </section>
  );
};

export default LoginPage;
