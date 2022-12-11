import React, { useState, useRef, useContext } from "react";
import { useEffectOnce } from "usehooks-ts";
import { Container, Row, Form, Col } from "react-bootstrap";

import { InstitutionContext } from "../../environment/InstitutionProvider";

import {
  getSelfInstitutionInfo,
  updateInstitution_api,
  updateAvatar,
} from "../../api/Api";
import Institution from "../../models/Institution";
import { useNavigate } from "react-router-dom";

function EditInstitution() {
  const [alertMsg, setAlertMsg] = useState("");

  const navigate = useNavigate();

  let { institution, setInstitution } = useContext(InstitutionContext);

  let [new_name, setNew_name] = useState("");
  let [information, setInformation] = useState("");
  let [webURL, setWebURL] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [repeatedNewPassword, setRepeatedNewPassword] = useState("");

  let [img, setImg] = useState(
    institution.avatar ? institution.avatar : "/assets/person-circle.svg"
  );
  let [imgFile, setImgFile] = useState(null);

  useEffectOnce(() => {
    getSelfInstitutionInfo()
      .then((result) => {
        let institution = Institution.from(result);
        setInstitution(institution);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const inputRef = useRef(null);
  const handleUpload = () => {
    inputRef.current?.click();
  };

  const handleImgChange = (event) => {
    if (event.target.files.length !== 1) {
      return;
    }
    setImgFile(event.target.files[0]);
    setImg(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let display_url;

    if (imgFile) {
      updateAvatar({
        imgFile: imgFile,
      })
        .then((response) => {
          display_url = response.display_url;

          updateInstitution_api({
            new_name: new_name,
            web_URL: webURL,
            avatar: display_url,
            actual_password: password,
            password: newPassword,
            repeatPassword: repeatedNewPassword,
            phoneNumber: phone,
            information: information,
          })
            .then((response) => {
              console.log(response);
              navigate("/institution");
            })
            .catch((error) => {
              console.log(error);
              setAlertMsg(error.error);
              return;
            });
        })
        .catch((error) => {
          console.log(error);
          setAlertMsg(error.error);
          return;
        });
    } else {
      updateInstitution_api({
        new_name: new_name,
        web_URL: webURL,
        avatar: "",
        actual_password: password,
        password: newPassword,
        repeatPassword: repeatedNewPassword,
        phoneNumber: phone,
        information: information,
      })
        .then((response) => {
          console.log(response);
          navigate("/institution");
        })
        .catch((error) => {
          console.log(error);
          setAlertMsg(error.error);
          return;
        });
    }

    console.log("img", img);
  };

  return (
    <div className="editProfile">
      <Container className="mb-5 pb-5">
        {alertMsg !== "" && (
          <div className="alert alert-danger">{alertMsg}</div>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <div className="col-sm-4 text-center">
              <input
                ref={inputRef}
                className="d-none"
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleImgChange}
              />
              <img
                className="img img-responsive clickable w-100 border border-primary "
                onClick={handleUpload}
                src={img}
                alt=""
              />
              <p className="mt-3 text-center">Institution avatar</p>
            </div>
            <div className="col-sm-4">
              <h2>{institution.name}</h2>
              <Form.Group className="mb-3 text-start " controlId="name">
                <Form.Control
                  type="name"
                  placeholder="New name"
                  onInput={(e) => setNew_name(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="information">
                <textarea
                  className="form-control"
                  rows="4"
                  id="information"
                  placeholder="New information"
                  onInput={(e) => setInformation(e.target.value)}
                ></textarea>
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="web">
                <Form.Control
                  type="web"
                  placeholder="New web URL"
                  onInput={(e) => setWebURL(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="phone">
                <Form.Control
                  type="phone"
                  placeholder="New phone number"
                  onInput={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-sm-4">
              <h2>Password</h2>
              <Form.Group className="mb-3 text-start " controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Actual password"
                  onInput={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="newPassword">
                <Form.Control
                  type="password"
                  placeholder="New password"
                  onInput={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3 text-start "
                controlId="repeatedNewPassword"
              >
                <Form.Control
                  type="password"
                  placeholder="Repeat new password"
                  onInput={(e) => setRepeatedNewPassword(e.target.value)}
                />
              </Form.Group>
            </div>

            <Row className="mt-3">
              <Col className="text-center">
                <button type="submit" className="btn btn-primary">
                  Update instituion
                </button>
              </Col>
            </Row>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default EditInstitution;
