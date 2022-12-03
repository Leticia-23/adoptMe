import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// truncate returns the string truncated to a given length. If string would
// continue after the truncation, hyphens are added at the end.
const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

function InstitutionCard({ institution }) {
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
                    // institution.avatar ? toImageUrl(user.avatar) : "/assets/person-circle.svg"
                  }
                  className="rounded-circle"
                  width={60}
                  height={60}
                  //   alt={user.username}
                  alt={institution[2]}
                />
              </Link>
            </Col>
            <Col className="col-sm-10 col-lg-11 col-md-10">
              <Link to={"/"}>
                <Card.Title className="mt-2">{institution[0]}</Card.Title>
              </Link>

              <p>{truncate(institution[1], 250)}</p>
              {/* TODO: link to institution */}
              <Link to={"/"}>Read more</Link>
              <p className="text-end">{institution[3]}</p>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default InstitutionCard;
