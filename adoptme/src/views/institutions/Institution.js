// profile and own profile institutions

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

function Institution() {
  let [isSelf, setIsSelf] = useState(true);

  const logout = async (e) => {
    e.preventDefault();
    console.log("Log out");

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

  return (
    <div className="profile">
      <Container className="mb-5 pb-5">
        <Row>
          <div className="col-sm-3 text-center">
            <img
              className="mb-3 img img-responsive profile-pic"
              // src={
              //   user.avatar
              //     ? toImageUrl(institution.avatar)
              //     : "/assets/person-circle.svg"
              // }
              src={"/assets/person-circle.svg"}
              alt=""
            />
          </div>
          <div className="ps-5 col-sm-9">
            <h1>Institution name</h1>

            <h5 className="mt-4">Information:</h5>
            <p>This is the Information about this institution</p>
            <p>This is the Information about this institution</p>
            <p>This is the Information about this institution</p>
            <p>This is the Information about this institution</p>
            <p>This is the Information about this institution</p>
            <p>This is the Information about this institution</p>
            <p>This is the Information about this institution</p>
          </div>
        </Row>
        <Row>
          <div className="col-sm-6">
            <h5 className="mt-4">Email:</h5>
            <p>instiution@gmail.com</p>

            <h5 className="mt-4">Website:</h5>
            <p>https://institution-web.com</p>
          </div>
          <div className="col-sm-6">
            <h5 className="mt-4">Phone number:</h5>
            <p>+34 654789625</p>

            <h5 className="mt-4">Register date:</h5>
            <p>23/10/22</p>

            <Row>
              <Col className="text-center">
                {isSelf && (
                  <Link to="/editInstitution" className="btn btn-primary mt-5">
                    Edit profile
                  </Link>
                )}
              </Col>
              <Col className="text-center">
                {isSelf && (
                  <button className="btn btn-secondary mt-5" onClick={logout}>
                    Log out
                  </button>
                )}
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Institution;
