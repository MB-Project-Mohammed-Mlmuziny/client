import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Form, Input, Button, Layout } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (
      password.match(
        // eslint-disable-next-line
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*]).{8,}$/
      )
    ) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/register`, {
          name,
          email,
          password,
        })
        .then(() => {
          navigate("/logIn");

          Swal.fire({
            position: "top",
            icon: "success",
            title: "verification link sent to your email",
          });
        })
        .catch((err) => {
          if (err.response.data.error.split(" ")[0] === "E11000")
            Swal.fire({
              position: "top",
              icon: "warning",
              text: "this email already exceeded",
            });
          else console.log(err);
        });
    } else {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "your password is weak",
        text: "the password have top be at least 6 character and contain at least 1 Capital letter, small, special character, and number ",
      });
    }
  };

  return (
    // <Container maxWidth="md">
    //   <Typography variant="h3" align="center" mb={2}>
    //     register
    //   </Typography>
    //   <Box sx={{ bgcolor: "background.paper", p: 2 }}>
    //     <form onSubmit={handleSubmit}>
    //       <FormGroup>
    //         <TextField
    //           onChange={(e) => setName(e.target.value)}
    //           fullWidth
    //           id="userName"
    //           label="User Name"
    //           placeholder="User Name"
    //           margin="normal"
    //           required
    //         />
    //         <TextField
    //           onChange={(e) => setEmail(e.target.value)}
    //           fullWidth
    //           type="email"
    //           id="email"
    //           label="email"
    //           placeholder="Email"
    //           margin="normal"
    //           required
    //         />
    //         <TextField
    //           onChange={(e) => setPassword(e.target.value)}
    //           fullWidth
    //           type="password"
    //           id="password"
    //           label="password"
    //           placeholder="password"
    //           margin="normal"
    //           required
    //         />
    //       </FormGroup>
    //       <Typography align="center" my={2}>
    //         <Button variant="contained" type="submit">
    //           register
    //         </Button>
    //       </Typography>
    //     </form>
    //   </Box>
    // </Container>
    <Layout.Content className="content" style={{ minHeight: "100vh" }}>
      <h1 className="title">register</h1>

      <div className="box">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="userName"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="/register">register now! </Link>
          </Form.Item>

          {/* <Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}
        </Form>
      </div>
    </Layout.Content>
  );
};
