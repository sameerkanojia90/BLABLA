import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

function Bookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/user/dashboard`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          navigate("/login");
        }
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API}/api/bookings/mybookings`, {
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="Bookingsmain-div">
      <div className="Booked-ride-div">
        
      </div>
    </div>
  );
}

export default Bookings;