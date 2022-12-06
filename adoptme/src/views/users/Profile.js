// TODO: profile and own user profile
// TODO: control if is admin or not
// TODO: delete user as admin -> put button and handlerAPI
import React, { useState, useContext } from "react";
import { useEffectOnce } from "usehooks-ts";
import { Container, Row, Col } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import moment from "moment";

import { toImageUrl } from "../../api/Api";

import {
  logout_api,
  deleteOwnAccount_api,
  getSelfInformation,
  getUserInformation,
} from "../../api/Api";
import User from "../../models/User";

import {
  UserContext,
  TokenContext,
  InstitutionContext,
} from "../../environment";

// Add this in your component file
require("react-dom");

function Profile() {
  let [user, setUser] = useState(null);
  let [isSelf, setIsSelf] = useState(false);

  // with the rename (user: currentUser) we have to use it with the new name (currentUser)
  let { user: currentUser, setUser: setContextUser } = useContext(UserContext);
  let { setInstitution: setContextInstitution } =
    useContext(InstitutionContext);
  let { setToken } = useContext(TokenContext);

  let { userId } = useParams();

  useEffectOnce(() => {
    let id = userId;
    let is_self = false;

    // No personal profile if not logged in
    if (!userId && !currentUser) {
      return;
    }

    console.log("useEffectOncee");
    // If no id or id is the same as the current user one
    if (!userId || (currentUser && currentUser.id === userId)) {
      setIsSelf(true);
      is_self = true;
      id = currentUser.id;
    }

    if (is_self) {
      console.log("here");
      getSelfInformation()
        .then((result) => {
          let user = User.from(result);
          setUser(user);
          setContextUser(user);
          console.log("is self: ", user);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // TODO: check this works too from /profile/47128934782
      console.log("there");
      getUserInformation(id)
        .then((result) => {
          let user = User.from(result);
          setUser(user);
          setContextUser(user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

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

  /*  if (!user) {
    return <></>;
  } */

  return (
    <div className="profile">
      <Container className="mb-5 pb-5">
        <Row>
          <div className="col-sm-3 text-center">
            <img
              className="mb-3 img img-responsive profile-pic"
              src={
                user.avatar
                  ? toImageUrl(user.avatar)
                  : "/assets/person-circle.svg"
              }
              // src={"/assets/person-circle.svg"}
              alt=""
            />
            {isSelf && (
              <button className="btn btn-secondary mt-5" onClick={logout}>
                Log out
              </button>
            )}
          </div>
          <div className="ps-5 col-sm-9">
            <h1>{user.name}</h1>

            <h5 className="mt-4">Biography:</h5>
            <p>{user.biography}</p>

            <h5 className="mt-4">Register date:</h5>
            <p>{moment(user.createdAt).format("DD-MM-YYYY")}</p>

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
