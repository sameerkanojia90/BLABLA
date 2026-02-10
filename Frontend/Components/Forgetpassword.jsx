import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;   

function ForgetPassword() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(`${API}/api/user/forgetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success) {
        message.success("Reset link sent to your email!");
        navigate("/login");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <>

  

    <div className="Forgetpassword">
      <Card className="Forgetcard">
        <h2>Forgot Password</h2>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
                autoComplete="email"

            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your registered email" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Send Reset Link
          </Button>

          <Button
            type="link"
            onClick={() => navigate("/login")}
           
          >
            Back to Login
          </Button>
        </Form>
      </Card>
    </div>
   </>
  );
}

export default ForgetPassword;