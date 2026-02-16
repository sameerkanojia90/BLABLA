import React, { useEffect, useState } from "react";
import { Divider, Form, Input, Button, AutoComplete, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

function Publishride() {
  const [cities, setCities] = useState([]);
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [rides, setRides] = useState([]);
    const[ status,setStatus] = useState([]);

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

  const fetchRides = async () => {
    try {
      const res = await fetch(`${API}/api/drides/getrides`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        console.log("Fetched rides:", data);
        setRides(data.rides);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);


 const fetchStatus = async () => {
    try {
      const res = await fetch(`${API}/api/drides/getstatus/:id`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        console.log("Fetched rides Status:", data);
        setStatus(data.done);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);


const updateStatus = async (bookingId, status) => {
  await fetch(`${API}/api/drides/update-booking-status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ bookingId, status })
  });

  fetchRides(); 
};






  const onFinish = async (values) => {
    try {
      const res = await fetch(`${API}/api/drides/publishride`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success) {
        alert("Ride Published Successfully");
        fetchRides();
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  useEffect(() => {
    fetch("/cities.json")
      .then(res => res.json())
      .then(data => setCities(data))
      .catch(err => console.log(err));
  }, []);





  const handleSearch = (value, type) => {
    if (!value) {
      type === "from" ? setFromOptions([]) : setToOptions([]);
      return;
    }

    const filtered = cities
      .filter(city =>
        city.name.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 8)
      .map(city => ({
        value: city.name,
        label: `${city.name}, ${city.state}`
      }));

    type === "from"
      ? setFromOptions(filtered)
      : setToOptions(filtered);



  };


return (
  <div className="Publishride">
    <div className="publish-form">
      <Form layout="vertical" onFinish={onFinish}>
        <div style={{ display: "flex", gap: "20px" }}>
          <Form.Item label="From" name="From" rules={[{ required: true }]} style={{ width: "220px" }}>
            <AutoComplete
              options={fromOptions}
              onSearch={(value) => handleSearch(value, "from")}
              placeholder="From"
              filterOption={false}
            />
          </Form.Item>

          <Form.Item label="To" name="To" rules={[{ required: true }]} style={{ width: "220px" }}>
            <AutoComplete
              options={toOptions}
              onSearch={(value) => handleSearch(value, "to")}
              placeholder="To"
              filterOption={false}
            />
          </Form.Item>

          <Form.Item label="Date" name="Date" rules={[{ required: true }]} style={{ width: "220px" }}>
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              disabledDate={(current) =>
                current && current < new Date().setHours(0, 0, 0, 0)
              }
            />
          </Form.Item>

          <Form.Item label="Price" name="Price" rules={[{ required: true }]} style={{ width: "220px" }}>
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Seats" name="Seats" rules={[{ required: true }]} style={{ width: "220px" }}>
            <Input type="number" />
          </Form.Item>
        </div>

        <Button type="primary" htmlType="submit">
          Publish Ride
        </Button>
        <Divider />
      </Form>
    </div>

    <div className="publish-head">
      <h2>Published Rides</h2>
    </div>

    <div className="publsih-box" style={{ marginTop: "20px" }}>
      {rides.length === 0 && <p>No rides found</p>}

      {rides.map((ride) => (
        <div key={ride._id} style={{ marginBottom: "25px" }}>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}
          >
            <h2>{ride.From} ➜ {ride.To}</h2>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(ride.Date).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short"
              })}
            </p>

            <p><strong>Price:</strong> ₹{ride.Price}</p>
            <p><strong>Seats Left:</strong> {ride.Seats}</p>

            <Divider />

            <h3>Bookings</h3>

            {ride.bookings && ride.bookings.length > 0 ? (
              ride.bookings.map((b) => (
                <div
                  key={b._id}
                  style={{
                    border: "1px solid #eee",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    background: "#fafafa"
                  }}
                >
                  <p><strong>Customer:</strong> {b.user?.name}</p>
                  <p><strong>Status:</strong> {b.status}</p>

                  {b.status === "pending" && (
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      <Button
                        type="primary"
                        onClick={() => updateStatus(b._id, "approved")}
                      >
                        Approve
                      </Button>

                      <Button
                        danger
                        onClick={() => updateStatus(b._id, "rejected")}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p style={{ color: "#999" }}>No bookings yet</p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Publishride;