import React from "react";
import AnimalCard from "./AnimalCard";

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

function Adopt() {
  return (
    <div className="adopted">
      <div className="mb-2">
        {animals.map((animal, i) => (
          <AnimalCard key={i} animal={animal} />
        ))}
      </div>
    </div>
  );
}

export default Adopt;
