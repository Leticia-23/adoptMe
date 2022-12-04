// profile and own user profile
// control if is admin or not
import React, { useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";

function Profile() {
  let [isSelf, setIsSelf] = useState(true);

  const delete_account = async (e) => {
    e.preventDefault();
    console.log("Delete acount");

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
      <Container className="mb-5">
        <Row>
          <Col className="col-lg-3 col-md-3 col-sm-11 text-center">
            <img
              className="mb-3 img img-responsive profile-pic"
              // src={
              //   user.avatar
              //     ? toImageUrl(user.avatar)
              //     : "/assets/person-circle.svg"
              // }
              src={"/assets/person-circle.svg"}
              alt=""
            />
            {isSelf && (
              <button
                className="btn btn-secondary mt-5"
                onClick={delete_account}
              >
                Log out
              </button>
            )}
          </Col>
          <Col className="col-lg-9 col-md-9 col-sm-1">
            <h1>Username</h1>

            <h4 className="mt-4">Biography:</h4>
            <p>This is the Biography</p>

            <h4 className="mt-4">Register date:</h4>
            <p>23/10/22</p>

            <Row>
              <Col className="text-center">
                {isSelf && (
                  <button
                    className="btn btn-primary mt-5"
                    onClick={delete_account}
                  >
                    Edit profile
                  </button>
                )}
              </Col>
              <Col className="text-center">
                {isSelf && (
                  <button
                    className="btn btn-danger mt-5 text-center"
                    onClick={delete_account}
                  >
                    Delete account
                  </button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
