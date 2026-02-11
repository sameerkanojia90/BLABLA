import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;


function Rideinfo() {

  const { id } = useParams();
  const [rideData, setRideData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!id) return;

    fetch(`${API}/api/drides/ride/${id}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRideData(data.ride);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading.....</h2>;
  if (!rideData) return <h2>Ride Not Found</h2>;

  return (
<>

<header className="info-header">
  BlaBlacar
</header>



    <div className="info">
      <div className="info-details">
        <h3>Ride Details</h3>
      <p><b>From:</b> {rideData.From}</p>
      <p><b>To:</b> {rideData.To}</p>
      <p><b>Date:</b> {rideData.Date}</p>
      <p><b>Price:</b> ₹{rideData.Price}</p>

      <h3>Published By</h3>
      <p>Email: {rideData.user?.email}</p>
      <p>Phone: {rideData.user?.phoneNo}</p>
      </div>
    </div>
    </>
  );
}

export default Rideinfo;