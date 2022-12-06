// TODO: profile and own user profile
// TODO: control if is admin or not
import React, { useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { logout_api, deleteOwnAccount_api } from "../../api/Api";

import {
  UserContext,
  TokenContext,
  InstitutionContext,
} from "../../environment";

function Profile() {
  let [isSelf, setIsSelf] = useState(true);

  // with the rename (user: currentUser) we have to use it with the new name (currentUser)
  let { user: currentUser, setUser: setContextUser } = useContext(UserContext);
  let { setInstitution: setContextInstitution } =
    useContext(InstitutionContext);
  let { setToken } = useContext(TokenContext);

  const navigate = useNavigate();

  const delete_account = async (e) => {
    console.log("Delete self account");
    deleteOwnAccount_api()
      .then((response) => {
        console.log("User deleted");
        console.log(response);
        setToken(null);
        setContextUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  const logout = async (e) => {
    logout_api({})
      .then((response) => {
        console.log(response);
        setToken(null);
        setContextUser(null);
        setContextInstitution(null);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        return;
      });
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
              //     ? toImageUrl(user.avatar)
              //     : "/assets/person-circle.svg"
              // }
              src={"/assets/person-circle.svg"}
              alt=""
            />
            {isSelf && (
              <button className="btn btn-secondary mt-5" onClick={logout}>
                Log out
              </button>
            )}
          </div>
          <div className="ps-5 col-sm-9">
            <h1>Username</h1>

            <h5 className="mt-4">Biography:</h5>
            <p>This is the Biography</p>

            <h5 className="mt-4">Register date:</h5>
            <p>23/10/22</p>

            <Row>
              <Col className="text-center">
                {isSelf && (
                  <Link to="/editProfile" className="btn btn-primary mt-5">
                    Edit profile
                  </Link>
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
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
