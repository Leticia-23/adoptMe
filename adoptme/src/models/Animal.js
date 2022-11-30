class Animal {
  id = 0;
  animal_name = "";
  specie = "";
  breed = "";
  sex = "";
  bornDate = "";
  size = "";
  color = "";
  photo = "";
  danger = false;
  sterile = false;
  description = "";
  adopted = false;
  adoptionDate = "";
  institution = "";
  user = "";
  createdAt = Date();

  static from(json) {
    return Object.assign(new Animal(), json);
  }

  static preview() {
    return Animal.from({
      id: "6522143728785728324",
      animal_name: "Terry",
      specie: "CANINA",
      breed: "AMERICAN STAFFORDSHIRE TERRIER",
      sex: "Macho",
      bornDate: "2010-09-06T22:00:00.000Z",
      size: "Grande (26-44 kg)",
      color: "Blanco y Atigrado",
      photo: "//www.zaragoza.es/cont/paginas/IMSP/mascotas/terry2.jpg",
      danger: true,
      sterile: true,
      description:
        "es necesaria licencia y seguro.   ES muy  bueno y jugueton con la gente, muy activo. Pero no se lleva bien con otros perros y perras.  Ideal para una casa sin perros Está esterilizado SE MERECE UN HOGAR!! Terry actualmente no se encuentra en el centro por lo que si quieres adoptarlo debes contactar con nosotros en el 976836554.",
      adopted: false,
      adoptionDate: "2014-09-06T22:00:00.000Z",
      institution: "12328283728283728642",
      user: "12319283719283712937",
      createdAt: new Date(),
    });
  }
}

export default Animal;
