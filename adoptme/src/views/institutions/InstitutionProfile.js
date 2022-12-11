import React, { useState, useContext } from "react";
import { useEffectOnce } from "usehooks-ts";
import { Container, Row, Col } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import moment from "moment";

import {
  InstitutionContext,
  TokenContext,
  UserContext,
} from "../../environment";

import {
  logout_api,
  banInstitutionAccount,
  getSelfInstitutionInfo,
  getInstitutionInfo,
} from "../../api/Api";
import Institution from "../../models/Institution";

function InstitutionProfile() {
  let [isSelf, setIsSelf] = useState(false);
  let [institution, setInstitution] = useState(null);

  // with the rename (institution: currentInstitution) we have to use it with the new name (currentInstitution)
  let {
    institution: currentInstitution,
    setInstitution: setContextInstitution,
  } = useContext(InstitutionContext);
  let { setToken } = useContext(TokenContext);
  let { user: currentUser, setUser: setContextUser } = useContext(UserContext);

  let { institutionId } = useParams();

  useEffectOnce(() => {
    let id = institutionId;
    let is_self = false;

    // No institution profile if not logged in
    if (!institutionId && !currentInstitution) {
      return;
    }

    // If no id or id is the same as the current institution one
    if (
      !institutionId ||
      (currentInstitution && currentInstitution.id === institutionId)
    ) {
      setIsSelf(true);
      is_self = true;
      id = currentInstitution.id;
    }

    if (is_self) {
      getSelfInstitutionInfo()
        .then((result) => {
          let institution = Institution.from(result);
          setInstitution(institution);
          setContextInstitution(institution);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      getInstitutionInfo(id)
        .then((result) => {
          let institution = Institution.from(result);
          setInstitution(institution);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  const navigate = useNavigate();

  const logout = async (e) => {
    logout_api({})
      .then((response) => {
        console.log(response);
        setToken(null);
        setContextInstitution(null);
        setContextUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  const delete_institution = async (e) => {
    banInstitutionAccount(institutionId)
      .then((response) => {
        console.log(response);
        navigate("/adminPanel");
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  if (!institution) {
    return <></>;
  }

  return (
    <div className="institution">
      <Container className="mb-5 pb-5">
        <Row>
          <div className="col-sm-3 text-center">
            <img
              className="mb-3 img img-responsive w-100"
              src={
                institution.avatar
                  ? institution.avatar
                  : "/assets/person-circle.svg"
              }
              alt=""
            />
          </div>
          <div className="ps-5 col-sm-9">
            <h1 style={{ color: "#ff7043" }}>{institution.name}</h1>

            <h5 className="mt-4">Information:</h5>
            <p>{institution.information}</p>
          </div>
        </Row>
        <Row>
          <div className="col-sm-6">
            <h5 className="mt-4">Email:</h5>
            <p>{institution.email}</p>

            <h5 className="mt-4">Website:</h5>
            <p>{institution.web_URL}</p>
          </div>
          <div className="col-sm-6">
            <h5 className="mt-4">Phone number:</h5>
            <p>{institution.phoneNumber}</p>

            <h5 className="mt-4">Register date:</h5>
            <p>{moment(institution.createdAt).format("DD-MM-YYYY")}</p>
          </div>
        </Row>
        <Row>
          <Col className="text-center">
            {isSelf && (
              <button className="btn btn-secondary mt-5" onClick={logout}>
                Log out
              </button>
            )}
            {!isSelf && currentUser && currentUser.isAdmin && (
              <button
                className="btn btn-danger mt-5 text-center"
                onClick={delete_institution}
              >
                Delete institution account
              </button>
            )}
          </Col>
          <Col className="text-center">
            {isSelf && (
              <Link to="/editInstitution" className="btn btn-primary mt-5">
                Edit institution profile
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default InstitutionProfile;
