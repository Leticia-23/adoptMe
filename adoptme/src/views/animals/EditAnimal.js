import React, { useState, useRef } from "react";
import { useEffectOnce } from "usehooks-ts";
import { useParams } from "react-router";
import { Container, Row, Form, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { Animal } from "../../models";

import {
  getPrivateAnimal_api,
  banAnimal,
  updateAnimal_api,
  updateAvatar,
} from "../../api/Api";

function EditAnimal() {
  let [animal, setAnimal] = useState(null);

  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [bornDate, setBornDate] = useState("");
  let [size, setSize] = useState("");
  let [color, setColor] = useState("");
  let [danger, setDanger] = useState("");
  let [sterile, setSterile] = useState("");
  let [adopted, setAdopted] = useState("");
  let [adoptionDate, setAdoptionDate] = useState("");

  let { animalId } = useParams();

  let [img, setImg] = useState("/assets/person-circle.svg");
  let [imgFile, setImgFile] = useState(null);

  const navigate = useNavigate();

  useEffectOnce(() => {
    getPrivateAnimal_api(animalId)
      .then((result) => {
        let anim = Animal.from(result);
        setAnimal(anim);
        setImg(animal.photo ? animal.photo : "/assets/person-circle.svg");
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

    if (imgFile) {
      updateAvatar({
        imgFile: imgFile,
      })
        .then((response) => {
          setImg(response.url);
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }

    updateAnimal_api({
      new_animal_name: name,
      description: description,
      bornDate: bornDate,
      size: size,
      color: color,
      danger: danger,
      sterile: sterile,
      adopted: adopted,
      adoptionDate: adoptionDate,
      photo: img,
      animalId: animalId,
    })
      .then((response) => {
        console.log(response);
        navigate("/animal/" + animalId);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  const delete_animal = async (e) => {
    banAnimal(animalId)
      .then((response) => {
        console.log(response);
        navigate("/institution");
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  if (!animal) {
    return <></>;
  }

  return (
    <div className="editAnimal">
      <Container className="mb-5 pb-5">
        <Form onSubmit={handleSubmit}>
          <Row>
            <div className="col-sm-4 text-center p-5">
              <input
                ref={inputRef}
                className="d-none"
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleImgChange}
              />
              <img
                className="img img-responsive clickable w-100 "
                onClick={handleUpload}
                src={img}
                alt=""
              />
              <p className="mt-3 text-center">Animal photo</p>
              <button className="btn btn-danger mt-5" onClick={delete_animal}>
                Delete animal
              </button>
            </div>

            <div className="col-sm-4">
              <h2>{animal.animal_name}</h2>

              <Form.Group className="mb-3 text-start " controlId="name">
                <Form.Control
                  type="name"
                  placeholder="New animal name"
                  onInput={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="description">
                <textarea
                  className="form-control"
                  rows="4"
                  id="description"
                  placeholder="New description"
                  onInput={(e) => setDescription(e.target.value)}
                ></textarea>
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="size">
                <Form.Control
                  type="size"
                  placeholder="Animal size"
                  onInput={(e) => setSize(e.target.value + " Kg")}
                />
                <Form.Text>Enter weight in Kilograms</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="color">
                <Form.Control
                  type="color-name"
                  placeholder="Animal color"
                  onInput={(e) => setColor(e.target.value)}
                />
                <Form.Text>Enter color name</Form.Text>
              </Form.Group>

              <Form.Label>Animal born date</Form.Label>
              <Form.Group className="mb-3 text-start " controlId="borDate">
                <Form.Control
                  type="date"
                  placeholder="Animal born date"
                  // value="2012-12-12"
                  onInput={(e) => setBornDate(new Date(e.target.value))}
                />
              </Form.Group>
            </div>

            <div className="col-sm-4 pt-4">
              <Form.Group className="mb-3 text-start " controlId="danger">
                <Form.Label>Dangerous animal</Form.Label>
                <Form.Select
                  aria-label="Dangerous animal"
                  onInput={(e) => setDanger(e.target.value)}
                >
                  <option value=""></option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="sterile">
                <Form.Label>Sterile animal</Form.Label>
                <Form.Select
                  aria-label="Sterile animal"
                  onInput={(e) => setSterile(e.target.value)}
                >
                  <option value=""></option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="adopted">
                <Form.Label>Adopted animal</Form.Label>
                <Form.Select
                  aria-label="Adopted animal"
                  onInput={(e) => setAdopted(e.target.value)}
                >
                  <option value=""></option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="adoptionDate">
                <Form.Label>Adoption date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="New adoption date"
                  onInput={(e) => setAdoptionDate(new Date(e.target.value))}
                />
              </Form.Group>
            </div>
            <Col className="text-center mt-2">
              <button type="submit" className="btn btn-primary">
                Update animal
              </button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default EditAnimal;
