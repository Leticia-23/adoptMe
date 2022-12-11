import React, { useState } from "react";
import { getAdoptAnimals_api } from "../../../api/Api";
import AnimalCard from "./AnimalCard";

import { useEffectOnce } from "usehooks-ts";
import { ListAnimal } from "../../../models";

function Adopt() {
  const [animals, setAnimals] = useState([]);

  useEffectOnce(() => {
    getAdoptAnimals_api()
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
      {animals.length > 0 ? (
        <div className="mb-2">
          {animals.map((animal, i) => (
            <AnimalCard key={i} animal={animal} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <h4 style={{ color: "#ff7043" }}>No animals registered yet</h4>
        </div>
      )}
    </div>
  );
}

export default Adopt;
