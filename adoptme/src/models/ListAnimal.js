class ListAnimal {
  _id = 0;
  animal_name = "";
  photo = "";
  description = "";
  createdAt = "";

  static from(json) {
    return Object.assign(new ListAnimal(), json);
  }

  static preview() {
    return ListAnimal.from({
      id: "6522143728785728324",
      animal_name: "Terry",
      photo: "//www.zaragoza.es/cont/paginas/IMSP/mascotas/terry2.jpg",
      description:
        "es necesaria licencia y seguro.   ES muy  bueno y jugueton con la gente, muy activo. Pero no se lleva bien con otros perros y perras.  Ideal para una casa sin perros Está esterilizado SE MERECE UN HOGAR!! Terry actualmente no se encuentra en el centro por lo que si quieres adoptarlo debes contactar con nosotros en el 976836554.",
      createdAt: new Date(),
    });
  }
}

export default ListAnimal;
