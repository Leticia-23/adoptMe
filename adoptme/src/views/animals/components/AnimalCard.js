import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { toImageUrl } from "../../../api/Api";
import moment from "moment";

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
              <Link to={"/animal"}>
                <img
                  src={
                    animal.photo
                      ? toImageUrl(animal.photo)
                      : "/assets/person-circle.svg"
                  }
                  className="rounded-circle"
                  width={60}
                  height={60}
                  alt={animal.animal_name}
                />
              </Link>
            </Col>
            <Col className="col-sm-10 col-lg-11 col-md-10">
              <Link to={"/animal"}>
                <Card.Title className="mt-2">{animal.animal_name}</Card.Title>
              </Link>

              <p>{truncate(animal.description, 250)}</p>
              {/* TODO: link to animal */}
              <Link to={"/animal"}>Read more</Link>
              <p className="text-end">
                {moment(animal.createdAt).format("DD-MM-YYYY")}
              </p>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default AnimalCard;
