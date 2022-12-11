import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import moment from "moment";

// truncate returns the string truncated to a given length. If string would
// continue after the truncation, hyphens are added at the end.
const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

function InstitutionCard({ institution }) {
  return (
    <div>
      <Container className="mb-4">
        <Card>
          <Row className="mx-2 align-items-center ">
            <Col className="col-sm-2 col-lg-1 col-md-2">
              <Link to={"/institution/" + institution._id}>
                <img
                  src={
                    institution.avatar
                      ? institution.avatar
                      : "/assets/person-circle.svg"
                  }
                  className="rounded-circle"
                  width={60}
                  height={60}
                  alt={institution.name}
                />
              </Link>
            </Col>
            <Col className="col-sm-10 col-lg-11 col-md-10">
              <Link to={"/institution/" + institution._id}>
                <Card.Title className="mt-2">{institution.name}</Card.Title>
              </Link>

              <p>{truncate(institution.information, 250)}</p>
              <Link to={"/institution/" + institution._id}>Read more</Link>
              <p className="text-end">
                {moment(institution.createdAt).format("DD-MM-YYYY")}
              </p>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default InstitutionCard;
