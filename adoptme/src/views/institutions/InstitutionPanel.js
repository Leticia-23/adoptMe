// institution panel
import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import AnimalMiniCard from "../animals/components/AnimalMiniCard";

// Source: https://stackoverflow.com/a/58519810
function splitInGroups(arr, n) {
  return arr.reduce(
    (r, e, i) => (i % n ? r[r.length - 1].push(e) : r.push([e])) && r,
    []
  );
}

function InstitutionPanel() {
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

  const register_animal = async (e) => {
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

  // const [animals, setAnimals] = useState([]);
  const animal1 = ["6497", "animal name"];
  const animals = [animal1, animal1, animal1, animal1, animal1];
  let table = splitInGroups(animals, 3);
  return (
    <div className="institutionPanel">
      <Container className="mb-5 pb-5">
        <h1 className="text-start">Register animal</h1>
        {/* TODO: change form to register animal */}
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
              <Button variant="primary" type="submit" onClick={register_animal}>
                Register institution
              </Button>
            </Col>
          </Row>
        </Form>

        <h1 className="text-start mt-4">Animals</h1>
        <Container>
          <div class="border list-cards-box">
            {table.map((row, i) => (
              <div className="row mt-2" key={i}>
                {row.map((animal, j) => (
                  <div className="col-md-4" key={j}>
                    <AnimalMiniCard animal={animal} />
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

export default InstitutionPanel;
