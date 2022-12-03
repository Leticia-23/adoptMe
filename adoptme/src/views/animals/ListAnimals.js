import React from "react";
import { Container } from "react-bootstrap";
import AnimalCard from "./components/AnimalCard";

const animal1 = [
  "animal_name",
  "animal information animal information animal information animal information animal information animal informationvvv v animal informationanimal informationanimal information animal information animal information animal informationanimal information animal information animal informationanimal informationanimal informationvanimal informationanimal information animal informationanimal informationanimal informationanimal information",
  "alt for the picture",
  "23-05-2022",
];
const animal2 = [
  "animal_name",
  "animal information animal information animal information animal information animal information animal informationvvv v animal informationanimal informationanimal information animal information animal information animal informationanimal information animal information animal informationanimal informationanimal informationvanimal informationanimal information animal informationanimal informationanimal informationanimal information",
  "alt for the picture",
  "23-05-2022",
];
const animal3 = [
  "animal_name",
  "animal information animal information animal information animal information animal information animal informationvvv v animal informationanimal informationanimal information animal information animal information animal informationanimal information animal information animal informationanimal informationanimal informationvanimal informationanimal information animal informationanimal informationanimal informationanimal information",
  "alt for the picture",
  "23-05-2022",
];

const animals = [animal1, animal2, animal3];

function ListAnimals() {
  return (
    <div className="listAnimals">
      <Container className="mb-5 pb-5">
        <h1 className="text-center">Animals</h1>
        <Container>
          <div className="mb-2">
            {animals.map((animal, i) => (
              <AnimalCard key={i} animal={animal} />
            ))}
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default ListAnimals;
