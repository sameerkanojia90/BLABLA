import React, { useEffect, useState } from "react";
import { Layout, Card, Avatar, Descriptions, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";const { Content } = Layout;
const API = import.meta.env.VITE_API;


function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing,setIsEditing] = useState(false);
  const [form] = Form.useForm();

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
      .catch(() => navigate("/login"));
  }, []);






  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API}/api/user/profile`, {
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        form.setFieldsValue(data.user);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);





  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await fetch(`${API}/api/user/upload-profile`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        message.success("Profile picture updated");
        fetchProfile();
      } else {
        message.error("Upload failed");
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong");
    }
  };






  const handleUpdate = async (values) => {
  try {
    const res = await fetch(`${API}/api/user/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (data.success) {
      message.success("Profile updated successfully");
      setIsEditing(false);
      fetchProfile();
    } else {
      message.error("Update failed");
    }
  } catch (err) {
    console.log(err);
    message.error("Something went wrong");
  }
};

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

return (
  <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
    <Content
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <Card style={{ width: 400, borderRadius: "8px" }}>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Avatar
            size={100}
            src={
              user?.profilePic
                ? `${API}/uploads/${user.profilePic}`
                : null
            }
            icon={!user?.profilePic && <UserOutlined />}
          />

          <div style={{ marginTop: "15px" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
            />
          </div>
        </div>

        {isEditing ? (

          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdate}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Enter name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Enter email" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phoneNo"
              label="Phone"
            >
              <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Update
            </Button>

            <Button
              block
              style={{ marginTop: "10px" }}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </Form>

        ) : (

          <>
            <h3 style={{ marginBottom: "15px" }}>{user?.name}</h3>

            <Descriptions column={1}>
              <Descriptions.Item label="Email">
                {user?.email}
              </Descriptions.Item>

              <Descriptions.Item label="Phone">
                {user?.phoneNo || "Not Provided"}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </div>
          </>
        )}




      </Card>
    </Content>
  </Layout>
);

}

export default Profile;