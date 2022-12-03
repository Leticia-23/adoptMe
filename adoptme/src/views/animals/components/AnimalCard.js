import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// truncate returns the string truncated to a given length. If string would
// continue after the truncation, hyphens are added at the end.
const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

function AnimalCard({ animal }) {
  return (
    // TODO: change all real data
    // TODO: linkear title and image
    <div>
      <Container className="mb-4">
        <Card>
          <Row className="mx-2 align-items-center ">
            <Col className="col-sm-2 col-lg-1 col-md-2">
              <Link to={"/"}>
                <img
                  src={
                    "/assets/person-circle.svg"
                    // animal.photo ? toImageUrl(animal.photo) : "/assets/person-circle.svg"
                  }
                  className="rounded-circle"
                  width={60}
                  height={60}
                  //   alt={user.username}
                  alt={animal[2]}
                />
              </Link>
            </Col>
            <Col className="col-sm-10 col-lg-11 col-md-10">
              <Link to={"/"}>
                <Card.Title className="mt-2">{animal[0]}</Card.Title>
              </Link>

              <p>{truncate(animal[1], 250)}</p>
              {/* TODO: link to animal */}
              <Link to={"/"}>Read more</Link>
              <p className="text-end">{animal[3]}</p>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default AnimalCard;
