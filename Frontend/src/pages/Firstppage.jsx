
import React from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, Button, theme } from "antd";

const { Header, Content, Footer } = Layout;

const items = [
  { key: "1", label: "Home" },
  { key: "2", label: "About" },
  { key: "3", label: "Contact" },
];

function Firstppage() {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            marginRight: "20px",
          }}
        >
          BlaBlacar
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ flex: 1 }}
        />

        <Button
          type="primary"
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>

        <Button onClick={() => navigate("/login")}>
          Login
        </Button>
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
        <img src="./image.png"   style={{ height: "300px",width:"100%" }}   alt="problem"></img>
  </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        BlaBlacar ©{new Date().getFullYear()} Created by Sameer
      </Footer>
    </Layout>
  );
}

export default Firstppage;