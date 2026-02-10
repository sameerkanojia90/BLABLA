import React, { useEffect, useState } from "react";
import { Divider, Form, Input, Button, AutoComplete } from "antd";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

function Publishride() {
  const [cities, setCities] = useState([]);
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [rides, setRides] = useState([]);
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

            <Form.Item label="From" name="From" rules={[{ required: true }]}
              style={{ width: "220px" }}
            >
              <AutoComplete
                options={fromOptions}
                onSearch={(value) => handleSearch(value, "from")}
                placeholder="From"
                filterOption={false}
              />
            </Form.Item>

            <Form.Item label="To" name="To" rules={[{ required: true }]}
              style={{ width: "220px" }}
            >
              <AutoComplete
                options={toOptions}
                onSearch={(value) => handleSearch(value, "to")}
                placeholder="To"
                filterOption={false}
              />
            </Form.Item>

            <Form.Item label="Date" name="Date" rules={[{ required: true }]}
              style={{ width: "220px" }}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item label="Price" name="Price" rules={[{ required: true }]}
              style={{ width: "220px" }}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Seats" name="Seats" rules={[{ required: true }]}
              style={{ width: "220px" }}
            >
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
      <div className="publsih-box">

        {rides.length === 0 && <p>No rides found</p>}

       {rides.map((ride, index) => (
<div className="displaydiv">
  <div className="ridediv"
    key={index} 
    
  >
    <h3>{ride.From} ➜ {ride.To}</h3>
    <p>Date: {new Date(ride.Date).toLocaleDateString()}</p>
    <p>Price: ₹{ride.Price}</p>
    <p>Seats: {ride.Seats}</p>
  </div>
</div>
))}
      </div>
    </div>
  );
}

export default Publishride;