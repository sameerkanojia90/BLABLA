import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Card, Input } from "antd";
const API = import.meta.env.VITE_API;
function Signuppage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneno] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

 

  async function handleSignup() {

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API}/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          credentials: "include",
        body: JSON.stringify({ name, email, password, phoneNo }),
      });

      const data = await res.json();
      console.log("Signup Response:", data);

      if (data.success) {
        navigate("/login");
      } else {
        alert(data.message || "Invalid credentials");
      }

    } catch (error) {
      console.error(error);
      alert("Server not responding");
    }
  }

  return (
    <>

    <div className="signuppage-header">
      <header className="sig-header">
        <h2 className="sigheadingm">BlaBlacar</h2>
      </header>
    </div>
      <div className="Signup-container">
        <Card className="Signup-box">
          <h2 className="signup-heading">Signup</h2>

          <div className="signup-form">

            <div className="input-groups">
              <label className="input-label">Name</label>
              <Input
                className="in"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-groups">
              <label className="input-label">Email</label>
              <Input
                className="in"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-groups">
              <label className="input-label">Password</label>
              <Input
                className="in"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                suffix={
                  showPassword ? (
                    <EyeInvisibleOutlined
                      onClick={() => setShowPassword(false)}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <EyeOutlined
                      onClick={() => setShowPassword(true)}
                      style={{ cursor: "pointer" }}
                    />
                  )
                }
              />
            </div>

            <div className="input-groups">
              <label className="input-label">Confirm Password</label>
              <Input
                className="in"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                suffix={
                  showConfirm ? (
                    <EyeInvisibleOutlined
                      onClick={() => setShowConfirm(false)}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <EyeOutlined
                      onClick={() => setShowConfirm(true)}
                      style={{ cursor: "pointer" }}
                    />
                  )
                }
              />
            </div>

            <div className="input-groups">
              <label className="input-label">Phone no</label>
              <Input
                className="in"
                placeholder="Enter your phone no"
                value={phoneNo}
                onChange={(e) => setPhoneno(e.target.value)}
              />
            </div>

            <div className="signup-button">
              <button className="signup-btn" onClick={handleSignup}>
                Signup
              </button>
            </div>

          </div>
        </Card>
      </div>
    </>
  );
}

export default Signuppage;
