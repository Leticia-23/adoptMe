import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import { createUser } from "../api/Api";

function Signup() {
  const [successMsg, setSuccessMsg] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const signup = async (e) => {
    e.preventDefault();

    createUser({
      name: state.name,
      email: state.email,
      password: state.password,
      repeatPassword: state.repeatPassword,
    })
      .then((response) => {
        console.log(response);
        setSuccessMsg(response);
        setAlertMsg("");
      })
      .catch((error) => {
        console.log(error);
        setAlertMsg(error.error);
        setSuccessMsg("");
        return;
      });
  };
  return (
    <div className="signup">
      <Container className="mb-5 col-lg-4 col-sm-7 col-md-6">
        <h1 className="text-center" style={{ color: "#ff7043" }}>
          Sign up
        </h1>

        {alertMsg !== "" && (
          <div className="alert alert-danger">{alertMsg}</div>
        )}
        {successMsg !== "" && (
          <div className="alert alert-success">{successMsg}</div>
        )}

        <Form className="justify-content-center">
          <Form.Group
            className="mb-3 text-start "
            controlId="name"
            onChange={handleChange}
          >
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" />
          </Form.Group>

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

          <Form.Group
            className="mb-3 text-start "
            controlId="repeatPassword"
            onChange={handleChange}
          >
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>

          <Col className="text-center mt-5 mb-5 pb-5">
            <Button
              className="col-6"
              variant="primary"
              type="submit"
              onClick={signup}
            >
              Sign up
            </Button>
          </Col>
        </Form>
      </Container>
    </div>
  );
}

export default Signup;
