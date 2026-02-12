// import React from "react";
// import { Button, Form, Input, Card } from "antd";
// import { useNavigate } from "react-router-dom";
// const API = import.meta.env.VITE_API;

// function Loginpage() {

//   const navigate = useNavigate();



//   const onFinish = async (values) => {
//     try {
//       const res = await fetch(`${API}/api/user/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           email: values.email,
//           password: values.password
//         }),
//       });

//       const data = await res.json();
//       console.log("Login Response:", data);

//       if (data.success) {
//         navigate("/dashboard");
//       } else {
//         alert(data.message || "Invalid credentials");
//       }

//     } catch (error) {
//       console.error(error);
//       alert("Server not responding");
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <div className="Loginpagediv">
//       <header className="log-header">
//         <h2 className="log-head"> BlaBlacar</h2>
//       </header>


//       <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
//         <Card className="loginpage-card">

//           <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//             Login
//           </h2>

//           <Form
//             name="basic"
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 16 }}
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}
//             autoComplete="off"
//           >

//             <Form.Item
//               name="email"
              
//               rules={[{ required: true, message: "Please input your email!" }]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               rules={[{ required: true, message: "Please input your password!" }]}
//             >
//               <Input.Password />
//             </Form.Item>
//             <div style={{ textAlign: "right", marginBottom: "10px" }}>
//               <span
//                 style={{ color: "blue", cursor: "pointer" }}
//                 onClick={() => navigate("/forgetpassword")}
//               >
//                 Forgot Password?
//               </span>
//             </div>

//             <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//               <Button className="logbtn-login" type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>

//           </Form>

//         </Card>
//       </div>
//     </div>
//   );
// }

// export default Loginpage;
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
  Space,
  theme
} from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;
const API = import.meta.env.VITE_API;

function Loginpage() {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const onFinish = async (values) => {
    try {
      const res = await fetch(`${API}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
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
          <Col xs={22} sm={16} md={10} lg={8}>
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
                    Login to continue your journey
                  </Text>
                </div>

                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                >
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
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password" }
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter password"
                    />
                  </Form.Item>

                  <Row justify="end" style={{ marginBottom: 16 }}>
                    <Text
                      type="secondary"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/forgetpassword")}
                    >
                      Forgot Password?
                    </Text>
                  </Row>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      block
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Form>

                <div style={{ textAlign: "center" }}>
                  <Text type="secondary">
                    Don’t have an account?{" "}
                    <Text
                      strong
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
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

export default Loginpage;