import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

function Firstppage() {
  const navigate = useNavigate();

  return (
    <>
    <header className="header">
      <h2 className="first-head"> BlaBlacar</h2>
    </header>
     
      <div className="Login-box">
    
      <Card className="login-card">
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
      </Card>
    </div>
    </>
  );
}

export default Firstppage;
