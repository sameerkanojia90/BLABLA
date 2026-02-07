import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";

const API = import.meta.env.VITE_API;

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const res = await fetch(`${API}/api/user/resetpassword/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (data.success) {
      message.success("Password updated");
      navigate("/login");
    } else {
      message.error(data.message);
    }
  };

  

  return (
    <Card>
      <Form onFinish={onFinish}>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="New Password" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Reset Password
        </Button>
      </Form>
    </Card>
  );
}

export default ResetPassword;