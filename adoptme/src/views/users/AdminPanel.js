import React, { useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { Col, Container, Form, Row, Button } from "react-bootstrap";

import InstitutionMiniCard from "../institutions/components/InstitutionMiniCard";
import UserMiniCard from "./components/UserMiniCard";

import {
  getInstitutions_api,
  getUsers_api,
  registerInstitution_api,
} from "../../api/Api";

import { ListInstitution } from "../../models";

// Source: https://stackoverflow.com/a/58519810
function splitInGroups(arr, n) {
  return arr.reduce(
    (r, e, i) => (i % n ? r[r.length - 1].push(e) : r.push([e])) && r,
    []
  );
}

function AdminPanel() {
  const [successMsg, setSuccessMsg] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const [institutions, setInstitutions] = useState([]);
  const [users, setUsers] = useState([]);

  useEffectOnce(() => {
    getInstitutions_api()
      .then((result) => {
        let institution_list = result.institutions.map((institution) =>
          ListInstitution.from(institution)
        );
        setInstitutions(institution_list);
      })
      .catch((error) => {
        console.error(error);
      });

    getUsers_api()
      .then((result) => {
        let user_list = result.users.map((user) => ListInstitution.from(user));
        setUsers(user_list);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const register_institution = async (e) => {
    e.preventDefault();

    registerInstitution_api({
      name: state.name,
      email: state.email,
      password: state.password,
      repeatPassword: state.repeatPassword,
    })
      .then((response) => {
        console.log(response);
        setSuccessMsg(response);
        setAlertMsg("");
      })
      .catch((error) => {
        console.log(error);
        setAlertMsg(error.error);
        setSuccessMsg("");
        return;
      });
  };

  let table = splitInGroups(institutions, 3);
  let table_user = splitInGroups(users, 3);

  return (
    <div className="adminPanel">
      <Container className="mb-5 pb-5">
        <h1 className="text-start" style={{ color: "#ff7043" }}>
          Register institution
        </h1>

        {alertMsg !== "" && (
          <div className="alert alert-danger">{alertMsg}</div>
        )}
        {successMsg !== "" && (
          <div className="alert alert-success">{successMsg}</div>
        )}

        <Form>
          <Row className="col-12">
            <Col className="col-lg-9 col-md-9 col-sm-11 ">
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3 text-start "
                    controlId="name"
                    onChange={handleChange}
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3 text-start "
                    controlId="password"
                    onChange={handleChange}
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter temporal password"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3 text-start "
                    controlId="email"
                    onChange={handleChange}
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3 text-start "
                    controlId="repeatPassword"
                    onChange={handleChange}
                  >
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col className="col-lg-3 col-md-3 col-sm-1 align-self-center">
              <Button
                variant="primary"
                type="submit"
                onClick={register_institution}
              >
                Register institution
              </Button>
            </Col>
          </Row>
        </Form>

        <h1 className="text-start mt-4" style={{ color: "#ff7043" }}>
          Institutions
        </h1>
        <Container>
          <div className="border list-cards-box">
            {table.map((row, i) => (
              <div className="row mt-2" key={i}>
                {row.map((institution, j) => (
                  <div className="col-md-4" key={j}>
                    <InstitutionMiniCard institution={institution} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Container>

        <h1 className="text-start mt-4" style={{ color: "#ff7043" }}>
          Users
        </h1>
        <Container>
          <div className="border list-cards-box">
            {table_user.map((row, i) => (
              <div className="row mt-2" key={i}>
                {row.map((user, j) => (
                  <div className="col-md-4" key={j}>
                    <UserMiniCard user={user} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default AdminPanel;
