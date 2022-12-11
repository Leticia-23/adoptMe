import React from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <Container className="mb-5">
        <h1
          className="font-weight-light text-center fw-bold"
          style={{ color: "#ff7043" }}
        >
          AdoptMe
        </h1>
        <p className="mt-4 fs-5 text-center">
          The information system about animals adoptions
        </p>
        <Row className="mt-5">
          <Col>
            <Card className="card-home">
              <Card.Body className="text-center">
                <Card.Title style={{ color: "#ff7043" }}>Animals </Card.Title>
                <Card.Text> You can see all the animals </Card.Text>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => navigate("/animals")}
                >
                  Animals list
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="card-home">
              <Card.Body className="text-center">
                <Card.Title style={{ color: "#ff7043" }}>
                  Institutions{" "}
                </Card.Title>
                <Card.Text> You can see all the institutions </Card.Text>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => navigate("/institutions")}
                >
                  Institutions list
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <p className="mt-5 fs-5 m-2 text-center">
          Thanks to <b>AdoptMe </b>
          you can:
        </p>
        <div className="fs-5 row justify-content-center my-4 pb-5">
          <div className="col-lg-5">
            <ul>
              <li>Find out which animals are up for adoption</li>
              <br></br>
              <li>Have information about these animals</li>
            </ul>
          </div>
          <div className="col-lg-5">
            <ul>
              <li>Find out which institutions collaborate with us</li>
              <br></br>
              <li>Have information about these institutions</li>
            </ul>
          </div>
        </div>

        <p className="fs-5 my-4 text-center">
          The abandonment of animals is unfortunately widespread.
          <br></br>A large part of these animals are dogs and cats of different
          breeds.
          <br></br>
          With your help we can ensure that animals that need a home have one.
        </p>
        <p className="fs-2 text-center mb-5 pb-5">
          <span style={{ color: "#ff7043" }}>
            <b>ADOPT</b>, DON'T BUY{" "}
          </span>
        </p>
      </Container>
    </div>
  );
}

export default Home;
