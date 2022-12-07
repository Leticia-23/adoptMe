import React, { useState } from "react";
import { getAdoptedAnimals_api } from "../../../api/Api";
import AnimalCard from "./AnimalCard";

import { useEffectOnce } from "usehooks-ts";
import { ListAnimal } from "../../../models";

function Adopted() {
  const [animals, setAnimals] = useState([]);

  useEffectOnce(() => {
    getAdoptedAnimals_api()
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

export default Adopted;
