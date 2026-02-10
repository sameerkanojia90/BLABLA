import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, Button, theme } from "antd";
import Searchrides from "./searchrides";

const { Header, Content, Footer } = Layout;

const API = import.meta.env.VITE_API;



const Dashboard = () => {
  const navigate = useNavigate();


  const items = [
  { 
    key: "1", 
    label: "Dashboard",
    onClick: () => navigate('/dashboard')
  },
  { 
    key: "2", 
    label: "Bookings",
    onClick: () => navigate('/bookings')
  },
  { 
    key: "3", 
    label: "Profile",
    onClick: () => navigate('/profile')
  },
];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API}/api/user/logout`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Logout error:", error);
    }
  };


  const handlePublish = () => {
    navigate("/publishride");
  };

  return (
    <Layout className="max-h-screen">
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div style={{ color: "white", fontSize: "18px", marginRight: "20px" }}>
          BlaBlacar
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ flex: 1 }}
        />

        <div className="flex gap-4 mr-6">
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>

          <Button type="primary" onClick={handlePublish}>
            Publish Ride
          </Button>
        </div>

      </Header>

      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}

        />

        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <h1 className="text-2xl  text-[#00aff5]">
            Welcome to the Dashboard</h1>


<Searchrides/>
        </div>

      </Content>



    
    </Layout>
  );
};

export default Dashboard;