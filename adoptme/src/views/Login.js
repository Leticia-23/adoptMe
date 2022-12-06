import React, { useState, useContext } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";

import { UserContext, TokenContext, InstitutionContext } from "../environment";
import { User, Institution } from "../models";
import { useNavigate } from "react-router-dom";

import { login_api } from "../api/Api";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { setToken } = useContext(TokenContext);
  const { setUser } = useContext(UserContext);
  const { setInstitution } = useContext(InstitutionContext);

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
    console.log("Email: " + state.email + " password:" + state.password);

    login_api({
      email: state.email,
      password: state.password,
    })
      .then((response) => {
        console.log(response);
        // Save el token
        setToken(response.accessToken);
        // Remove the token for not to add it to the user
        delete response.accessToken;
        // Parse the user

        console.log(response.role);

        // Check if is user or institution
        if (response.role === "institution") {
          delete response.role;
          let institution_ = Institution.from(response);
          setInstitution(institution_);
          navigate("/");
        } else {
          console.log("if dentro user");
          let user_ = User.from(response);
          setUser(user_);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  return (
    <div className="login">
      <Container className=" justify-content-center mb-5 col-lg-4 col-sm-7 col-md-6">
        <h1 className="text-center">Log in</h1>
        <Form className="justify-content-center">
          <Form.Group
            className="mb-3 text-start "
            controlId="email"
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

          <Col className="text-center mt-5">
            <Button
              className="col-6"
              variant="primary"
              type="submit"
              onClick={login}
            >
              Login
            </Button>
          </Col>
          <Col className="text-center mt-5 mb-5 pb-5">
            <Button
              className="col-6"
              variant="primary"
              type="submit"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </Col>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
