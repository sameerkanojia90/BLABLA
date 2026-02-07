import React from "react";
import { useNavigate } from "react-router-dom";

function Firstppage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="first-header">
        <div className="heading">
          <h2 className="first-head"> BlaBlacar</h2>
        </div>



        <div className="buttons">
          <button
            className="signup"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>

          <button
            className="login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Firstppage;
