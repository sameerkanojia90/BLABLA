import React, { useEffect, useState } from "react";
import { Form, Input, Button, AutoComplete, Card, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

function Searchrides() {
  const [cities, setCities] = useState([]);
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [rides, setRides] = useState([]);
  const [searched, setSearched] = useState(false);
  const [passengerCount, setPassengerCount] = useState({});

  const navigate = useNavigate();

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

    type === "from" ? setFromOptions(filtered) : setToOptions(filtered);
  };





  const onFinish = async (values) => {
    try {



      setSearched(true);

      const formattedValues = {
        ...values,
        Date: values.Date.toISOString()
      };

      const query = new URLSearchParams(formattedValues).toString();

      const res = await fetch(`${API}/api/drides/searchrides?${query}`, {
        method: "GET",
        credentials: "include"
      });

      const data = await res.json();

      if (data.success) {
        setRides(data.rides);
      } else {
        setRides([]);
      }

    } catch (error) {
      console.log(error);
      setRides([]);
    }
  };






  const handleBook = async (rideId, seats) => {
  try {

    if (!seats || seats <= 0) {
      alert("Enter valid passenger count");
      return;
    }

    const res = await fetch(`${API}/api/drides/bookride`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ rideId, seats })
    });

    const data = await res.json();

    if (data.success) {

      setRides(prev =>
        prev.map(r =>
          r._id === rideId ? { ...r, Seats: r.Seats - seats } : r
        )
      );

      alert("Seats booked successfully");

    } else {
      alert(data.message || "Booking failed");
    }

  } catch (err) {
    console.log(err);
  }
};
  
  return (
    <div style={{ padding: "40px" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

          <Form.Item
            label="From"
            name="From"
            rules={[{ required: true, message: "Please select origin" }]}
            style={{ width: "220px" }}
          >
            <AutoComplete
              options={fromOptions}
              onSearch={(value) => handleSearch(value, "from")}
              placeholder="From"
              filterOption={false}
            />
          </Form.Item>

          <Form.Item
            label="To"
            name="To"
            rules={[{ required: true, message: "Please select destination" }]}
            style={{ width: "220px" }}
          >
            <AutoComplete
              options={toOptions}
              onSearch={(value) => handleSearch(value, "to")}
              placeholder="To"
              filterOption={false}
            />
          </Form.Item>

          <Form.Item
            label="Date"
            name="Date"
            rules={[{ required: true, message: "Please select date" }]}
            style={{ width: "220px" }}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              disabledDate={(current) =>
                current && current < new Date().setHours(0, 0, 0, 0)
              }
            />

          </Form.Item>

          <Form.Item
            label="Seats"
            name="Seats"
            rules={[{ required: true, message: "Enter seats" }]}
            style={{ width: "220px" }}
          >
            <Input type="number" min={1} />
          </Form.Item>

        </div>

        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form>

      <div style={{ marginTop: "40px" }}>
        {searched && rides.length === 0 && (
          <p style={{ fontWeight: "bold" }}>No rides found</p>
        )}

        {rides.map((ride) => (
          <Card key={ride._id} style={{ marginBottom: "20px" }}>
            <h3>{ride.From} ➜ {ride.To}</h3>
            <p>Date: {new Date(ride.Date).toLocaleDateString()}</p>
            <p>Price: ₹{ride.Price}</p>
            <p>Seats Available: {ride.Seats}</p>


            <Button
              style={{ marginRight: "10px" }}
              onClick={() => navigate(`/ride/${ride._id}`)}
            >
              Info
            </Button>

           
            <Input
              type="number"
              min={1}
              max={ride.Seats}
              value={passengerCount[ride._id] || ""}
              placeholder="Passengers"
              style={{ width: "80px",
               marginRight: "10px" }}
              onChange={(e) =>
                setPassengerCount(prev => ({
                  ...prev,
                  [ride._id]: Number(e.target.value)
                }))
              }
            />

            <Button
              type="primary"
              disabled={
                !passengerCount[ride._id] ||
                passengerCount[ride._id] <= 0 ||
                passengerCount[ride._id] > ride.Seats
              }
              onClick={() =>
                handleBook(ride._id, passengerCount[ride._id])
              }
            >
              BOOK
            </Button>








          </Card>
        ))}
      </div>
    </div>
  );
}

export default Searchrides;


