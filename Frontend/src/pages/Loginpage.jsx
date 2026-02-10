import React from "react";
import { Button, Form, Input, Card } from "antd";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API;

function Loginpage() {

  const navigate = useNavigate();



  const onFinish = async (values) => {
    try {
      const res = await fetch(`${API}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: values.email,
          password: values.password
        }),
      });

      const data = await res.json();
      console.log("Login Response:", data);

      if (data.success) {
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }

    } catch (error) {
      console.error(error);
      alert("Server not responding");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="Loginpagediv">
      <header className="log-header">
        <h2 className="log-head"> BlaBlacar</h2>
      </header>


      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Card className="loginpage-card">

          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Login
          </h2>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >

            <Form.Item
              name="email"
              
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password />
            </Form.Item>
            <div style={{ textAlign: "right", marginBottom: "10px" }}>
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => navigate("/forgetpassword")}
              >
                Forgot Password?
              </span>
            </div>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button className="logbtn-login" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>

        </Card>
      </div>
    </div>
  );
}

export default Loginpage;
