import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/api/user/dashboard`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          navigate("/login");
        }
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

   const handleLogout = async () => {
    try {
      const res = await fetch(`${API}/api/user/logout`, {
        method: "GET",
        credentials: "include"
      });

      const data = await res.json();

      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="mainpage">
     <div className="first-div">
         <header className="main-header">
        <h2 className="main-head">BlaBlacar</h2>
      </header>
      <div className="LOGOUT">  
        <button className="Log-out" onClick={handleLogout}>Logout
         </button>
</div>
     </div>

      <div className="details-info">
        <div className="form">
          Welcome to Dashboard
        </div>
      </div>
    </div>
  );
}

export default Dashboard;