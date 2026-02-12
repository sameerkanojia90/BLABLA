import React from "react";
import {
  Button,
  Form,
  Input,
  Card,
  Layout,
  Row,
  Col,
  Typography,
  Space
} from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;
const API = import.meta.env.VITE_API;

function Signuppage() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await fetch(`${API}/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          phoneNo: values.phoneNo
        }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Server not responding");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <Row
          justify="center"
          align="middle"
          style={{ minHeight: "100vh", background: "#f0f2f5" }}
        >
          <Col xs={22} sm={18} md={12} lg={10}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
              }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <div style={{ textAlign: "center" }}>
                  <Title level={2} style={{ marginBottom: 0 }}>
                    BlaBlaCar
                  </Title>
                  <Text type="secondary">
                    Create your account to start sharing rides
                  </Text>
                </div>

                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                  >
                    <Input size="large" placeholder="Enter full name" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Enter valid email" }
                    ]}
                  >
                    <Input size="large" placeholder="Enter email" />
                  </Form.Item>

                  <Form.Item
                    label="Phone Number"
                    name="phoneNo"
                    rules={[{ required: true, message: "Please enter phone number" }]}
                  >
                    <Input size="large" placeholder="Enter phone number" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter password" }]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Create password"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                      { required: true, message: "Please confirm password" }
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Confirm password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      block
                    >
                      Create Account
                    </Button>
                  </Form.Item>
                </Form>

                <div style={{ textAlign: "center" }}>
                  <Text type="secondary">
                    Already have an account?{" "}
                    <Text
                      strong
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Text>
                  </Text>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Signuppage;