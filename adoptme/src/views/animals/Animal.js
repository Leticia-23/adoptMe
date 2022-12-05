// profile and own profile institutions

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

function Animal() {
  let [isInstOwner, setisInstOwner] = useState(true);
  let [isRegistered, setisRegistered] = useState(true);
  let [isAdopted, setisAdopted] = useState(true);

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
    <div className="animal">
      <Container className="mb-5 pb-5">
        <Row>
          <div className="col-sm-8">
            <h1>Animal name</h1>

            <h5 className="mt-4">Description:</h5>
            <p>
              This is the description about this institution This is the
              description about this institution This is the description about
              this institution This is the description about this institution
              This is the description about this institution
            </p>
            <p>
              This is the description about this institution This is the
              description about this institution This is the description about
              this institution This is the description about this institution
              This is the description about this institution
            </p>
          </div>
          <div className="col-sm-4 text-center">
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
        </Row>
        <Row>
          <div className="col-sm-4">
            <h5 className="mt-4">Specie:</h5>
            <p>Cat</p>

            <h5 className="mt-4">Breed:</h5>
            <p>Chartreux Cat</p>

            {isRegistered && <h5 className="mt-4">Born date:</h5>}
            {isRegistered && <p>25/03/22</p>}

            {isRegistered && <h5 className="mt-4">Color:</h5>}
            {isRegistered && <p>Gray</p>}

            {isRegistered && <h5 className="mt-4">Sterile:</h5>}
            {isRegistered && <p>No</p>}
          </div>
          <div className="col-sm-4">
            <h5 className="mt-4">Sex:</h5>
            <p>Female</p>

            <h5 className="mt-4">Institution:</h5>
            <p>Name institution with link to the profile</p>

            {isRegistered && <h5 className="mt-4">Size:</h5>}
            {isRegistered && <p>7 Kg</p>}

            {isRegistered && <h5 className="mt-4">Danger:</h5>}
            {isRegistered && <p>No</p>}
          </div>
          <div className="col-sm-4">
            <h5 className="mt-4">Adopted:</h5>
            <p>No</p>

            {isInstOwner && isAdopted && (
              <h5 className="mt-4">Adoption date:</h5>
            )}
            {isInstOwner && isAdopted && <p>25/05/22</p>}
            {isInstOwner && isAdopted && (
              <h5 className="mt-4">Person who adopted:</h5>
            )}
            {isInstOwner && isAdopted && (
              <p>
                Name user adopted link to the profile or this person is not
                registered in this community
              </p>
            )}
          </div>
        </Row>
        <Row>
          <Col className="text-center">
            {isInstOwner && (
              <Link to="/editAnimal" className="btn btn-primary mt-5">
                Edit animal information
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Animal;
