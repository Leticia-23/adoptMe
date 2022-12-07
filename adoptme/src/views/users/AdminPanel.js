import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";

import InstitutionMiniCard from "../institutions/components/InstitutionMiniCard";
import UserMiniCard from "./components/UserMiniCard";

// Source: https://stackoverflow.com/a/58519810
function splitInGroups(arr, n) {
  return arr.reduce(
    (r, e, i) => (i % n ? r[r.length - 1].push(e) : r.push([e])) && r,
    []
  );
}

function AdminPanel() {
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

  const register_institution = async (e) => {
    e.preventDefault();
    console.log(
      "Name: " +
        state.name +
        " Email:" +
        state.email +
        " Password:" +
        state.password +
        " Repeat password: " +
        state.repeatPassword
    );

    /* createUser({
      name: state.name,
      email: state.email,
      password: state.password,
      repeatPassword: state.repeatPassword,
    })
      .then((response) => {
        console.log(response);
        navigate("/lab3-login");
      })
      .catch((error) => {
        console.log(error);
        return;
      }); */
  };

  // const [institutions, setInstitution] = useState([]);
  const institution1 = ["5487", "name institution"];
  const institution2 = ["5487", "name institution"];
  const institution3 = ["5487", "name institution"];
  const institution4 = ["5487", "name institution"];
  const institution5 = ["5487", "name institution"];
  const institutions = [
    institution1,
    institution2,
    institution3,
    institution4,
    institution5,
  ];
  let table = splitInGroups(institutions, 3);

  // const [users, setUsers] = useState([]);
  const user1 = ["1693", "name user"];
  const users = [user1, user1, user1, user1, user1];
  let table_user = splitInGroups(users, 3);

  return (
    <div className="adminPanel">
      <Container className="mb-5 pb-5">
        <h1 className="text-start">Register institution</h1>
        <Form>
          <Row className="col-12">
            <Col className="col-lg-9 col-md-9 col-sm-11 ">
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3 text-start "
                    controlId="name"
                    onChange={handleChange}
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3 text-start "
                    controlId="password"
                    onChange={handleChange}
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter temporal password"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3 text-start "
                    controlId="email"
                    onChange={handleChange}
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3 text-start "
                    controlId="repeatPassword"
                    onChange={handleChange}
                  >
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col className="col-lg-3 col-md-3 col-sm-1 align-self-center">
              <Button
                variant="primary"
                type="submit"
                onClick={register_institution}
              >
                Register institution
              </Button>
            </Col>
          </Row>
        </Form>

        <h1 className="text-start mt-4">Institutions</h1>
        <Container>
          <div className="border list-cards-box">
            {table.map((row, i) => (
              <div className="row mt-2" key={i}>
                {row.map((institution, j) => (
                  <div className="col-md-4" key={j}>
                    <InstitutionMiniCard institution={institution} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Container>

        <h1 className="text-start mt-4">Users</h1>
        <Container>
          <div className="border list-cards-box">
            {table_user.map((row, i) => (
              <div className="row mt-2" key={i}>
                {row.map((user, j) => (
                  <div className="col-md-4" key={j}>
                    <UserMiniCard user={user} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default AdminPanel;
