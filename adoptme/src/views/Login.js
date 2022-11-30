import React, { useState, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";

import { UserContext, TokenContext } from "../environment";
import { User } from "../models";
import { useNavigate } from "react-router-dom";

function Login() {
  const [state, setState] = useState({
    email_id: "",
    password: "",
  });

  const { setToken } = useContext(TokenContext);
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    console.log("Email: " + state.email_id + " password:" + state.password);

    // loginStudentApi({
    //   email: state.email_id,
    //   password: state.password,
    // })
    //   .then((response) => {
    //     console.log(response);
    //     // Save el token
    //     setToken(response.accessToken);
    //     // Remove the token for not to add it to the user
    //     delete response.accessToken;
    //     // Parse the user
    //     let user_ = User.from(response);
    //     setUser(user_);
    //     navigate("/lab3message");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return;
    //   });
  };

  return (
    <div className="login">
      <Container className="mb-5 col-lg-4 col-sm-7 col-md-6">
        <h1 className="text-center">Login</h1>
        <Form>
          <Form.Group
            className="mb-3 text-start "
            controlId="email_id"
            onChange={handleChange}
          >
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group
            className="mb-3 text-start "
            controlId="password"
            onChange={handleChange}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>

          <Button
            className="text-center col-6"
            variant="primary"
            type="submit"
            onClick={login}
          >
            Login
          </Button>

          <Button
            className="text-center col-6"
            variant="primary"
            type="submit"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
