import React, { useState, useRef, useContext } from "react";
import { useEffectOnce } from "usehooks-ts";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import AnimalMiniCard from "../animals/components/AnimalMiniCard";

import {
  getInstitutionAnimals,
  registerAnimal_api,
  uploadAvatar,
} from "../../api/Api";
import { ListAnimal } from "../../models";

import { InstitutionContext } from "../../environment";

// Source: https://stackoverflow.com/a/58519810
function splitInGroups(arr, n) {
  return arr.reduce(
    (r, e, i) => (i % n ? r[r.length - 1].push(e) : r.push([e])) && r,
    []
  );
}

function InstitutionPanel() {
  const [successMsg, setSuccessMsg] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [state, setState] = useState({
    animal_name: "",
    specie: "",
    breed: "",
    sex: "",
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const [animals, setAnimals] = useState([]);
  // with the rename (institution: currentInstitution) we have to use it with the new name (currentInstitution)
  let { institution: currentInstitution } = useContext(InstitutionContext);

  useEffectOnce(() => {
    getInstitutionAnimals(currentInstitution.id)
      .then((result) => {
        let animal_list = result.animals.map((animal) =>
          ListAnimal.from(animal)
        );
        setAnimals(animal_list);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  let table = splitInGroups(animals, 3);

  let [img, setImg] = useState("/assets/person-circle.svg");
  let [imgFile, setImgFile] = useState(null);

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

  const register_animal = async (e) => {
    e.preventDefault();

    let display_url;

    if (imgFile) {
      uploadAvatar({
        imgFile: imgFile,
      })
        .then((response) => {
          display_url = response.display_url;

          registerAnimal_api({
            animal_name: state.animal_name,
            specie: state.specie,
            breed: state.breed,
            sex: state.sex,
            description: state.description,
            photo: display_url,
          })
            .then((response) => {
              console.log(response);
              setSuccessMsg(response);
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
      registerAnimal_api({
        animal_name: state.animal_name,
        specie: state.specie,
        breed: state.breed,
        sex: state.sex,
        description: state.description,
        photo: null,
      })
        .then((response) => {
          console.log(response);
          setSuccessMsg(response);
        })
        .catch((error) => {
          console.log(error);
          setAlertMsg(error.error);
          return;
        });
    }
  };

  return (
    <div className="institutionPanel">
      <Container className="mb-5 pb-5">
        <h1 className="text-start" style={{ color: "#ff7043" }}>
          Register animal
        </h1>

        {alertMsg !== "" && (
          <div className="alert alert-danger">{alertMsg}</div>
        )}
        {successMsg !== "" && (
          <div className="alert alert-success">{successMsg}</div>
        )}

        <Form>
          <Row className="col-12">
            <Col className="col-lg-6 col-md-9 col-sm-10 ">
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3 text-start "
                    controlId="animal_name"
                    onChange={handleChange}
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter animal name" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3 text-start "
                    controlId="specie"
                    onChange={handleChange}
                  >
                    <Form.Label>Specie</Form.Label>
                    <Form.Control type="specie" placeholder="Enter specie" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="sex" onChange={handleChange}>
                    <Form.Label>Sex</Form.Label>
                    <Form.Select aria-label="Select sex">
                      <option value=""></option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3 text-start "
                    controlId="breed"
                    onChange={handleChange}
                  >
                    <Form.Label>Breed</Form.Label>
                    <Form.Control type="breed" placeholder="Enter breed" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group
                  className="mb-3 text-start "
                  controlId="description"
                  onChange={handleChange}
                >
                  <Form.Label>Description</Form.Label>
                  <textarea
                    className="form-control"
                    rows="4"
                    id="description"
                  ></textarea>
                </Form.Group>
              </Row>
            </Col>
            <Col className="col-lg-3 col-md-2 col-sm-1 align-self-center text-center ">
              <p className="mt-3 text-center">Animal photo</p>
              <input
                ref={inputRef}
                className="d-none"
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleImgChange}
              />
              <img
                className="img img-responsive clickable w-100 border border-primary"
                onClick={handleUpload}
                src={img}
                alt=""
              />
            </Col>
            <Col className="col-lg-3 col-md-1 col-sm-1 align-self-center ps-5">
              <Button variant="primary" type="submit" onClick={register_animal}>
                Register animal
              </Button>
            </Col>
          </Row>
        </Form>

        <h1 className="text-start mt-4" style={{ color: "#ff7043" }}>
          Animals
        </h1>
        <Container>
          <div className="border list-cards-box">
            {table.map((row, i) => (
              <div className="row mt-2" key={i}>
                {row.map((animal, j) => (
                  <div className="col-md-4" key={j}>
                    <AnimalMiniCard animal={animal} />
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

export default InstitutionPanel;
