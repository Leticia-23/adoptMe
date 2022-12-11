import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function AnimalMiniCard({ animal }) {
  return (
    <div>
      <Container className="mb-4">
        <Card>
          <Row className="mx-2 my-1 align-items-center ">
            <Col className="col-sm-2 col-lg-3 col-md-5">
              <Link to={"/animal/" + animal._id}>
                <img
                  src={
                    animal.photo ? animal.avatar : "/assets/person-circle.svg"
                  }
                  className="rounded-circle"
                  width={60}
                  height={60}
                  alt={animal.animal_name}
                />
              </Link>
            </Col>
            <Col className="col-sm-10 col-lg-9 col-md-7">
              <Card.Title className="mt-2 mx-2">
                {animal.animal_name}
              </Card.Title>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default AnimalMiniCard;
