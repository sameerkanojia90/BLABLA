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
      const res = await fetch(`${API}/api/drides/bookingstatus`, {
        credentials: "include",
      });

      const data = await res.json();
          console.log("BOOKING DATA:", data.bookings);


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
    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
      My Bookings
    </h2>

    {bookings.length === 0 ? (
      <h3 style={{ textAlign: "center" }}>No bookings found</h3> ) : (
      bookings.map((booking) => (
        <div
          key={booking._id}
          className="booking-card"
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9"
          }}
        >
          {booking.ride ? (
            <>
              <h3>
                {booking.ride.From} → {booking.ride.To}
              </h3>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.ride.Date).toLocaleDateString()}
              </p>

              <p>
                <strong>Price:</strong> ₹{booking.ride.Price}
              </p>
            </>
          ) : (
            <p style={{ color: "red" }}>
              Ride details not available (old booking)
            </p>
          )}

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color:
                  booking.status === "approved"
                    ? "green"
                    : booking.status === "rejected"
                    ? "red"
                    : "orange",
                fontWeight: "bold"
              }}
            >
              {booking.status}
            </span>
          </p>
        </div>
      ))
    )}
  </div>
);
}


export default Bookings;