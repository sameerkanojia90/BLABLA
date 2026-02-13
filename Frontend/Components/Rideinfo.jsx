
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Layout,
  Card,
  Typography,
  Row,
  Col,
  Tag,
  Spin,
  Avatar,
  Button,
  Divider,
  message,
} from "antd";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

const API = import.meta.env.VITE_API;

function Rideinfo() {
  const { id } = useParams();
  const [rideData, setRideData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔐 Auth Check
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

  // 📦 Fetch Ride
  useEffect(() => {
    if (!id) return;

    fetch(`${API}/api/drides/ride/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRideData(data.ride);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );

  if (!rideData)
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Title level={3}>Ride Not Found</Title>
      </div>
    );

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Content style={{ padding: "40px 20px", display: "flex", justifyContent: "center" }}>
        <Card
          style={{ width: 600, borderRadius: 12 }}
          hoverable
        >
          {/* Route Section */}
          <Title level={3} style={{ textAlign: "center" }}>
            <EnvironmentOutlined /> {rideData.From} → {rideData.To}
          </Title>

          <Divider />

          {/* Ride Info */}
          <Row gutter={16}>
            <Col span={12}>
              <Text strong>
                <CalendarOutlined /> Date:
              </Text>
              <br />
              <Tag color="blue">{rideData.Date}</Tag>
            </Col>

            <Col span={12}>
              <Text strong>Price:</Text>
              <br />
              <Tag color="green">₹ {rideData.Price}</Tag>
            </Col>
          </Row>

          <Divider />

          {/* Driver Info */}
          <Title level={4}>Driver Information</Title>

          <Row align="middle" gutter={16}>
            <Col>
              <Avatar size={64} icon={<UserOutlined />} />
            </Col>

            <Col>
              <Text>
                <MailOutlined /> {rideData.user?.email}
              </Text>
              <br />
              <Text>
                <PhoneOutlined /> {rideData.user?.phoneNo}
              </Text>
            </Col>
          </Row>

          <Divider />

          {/* <Button
            type="primary"
            size="large"
            block
            onClick={() => message.success("Ride Booked Successfully!")}
          >
            Book Ride
          </Button> */}
        </Card>
      </Content>
    </Layout>
  );
}

export default Rideinfo;