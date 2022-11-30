class Institution {
  id = "";
  name = "";
  email = "";
  web_URL = "";
  phoneNumber = "";
  information = "";
  avatar = "";
  createdAt = Date();

  get isAdmin() {
    return this.role === "admin";
  }

  static from(json) {
    json.createdAt = new Date(json.createdAt);
    return Object.assign(new Institution(), json);
  }

  static preview() {
    return Institution.from({
      id: "12328283728283728642",
      name: "Test institution",
      email: "email@gmail.com",
      web_URL: "https://www.adoptuskids.org/",
      phoneNumber: "658945782",
      information:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      avatar: "https://i.imgur.com/qJ4UV1i.png",
      createdAt: new Date(),
    });
  }
}

export default Institution;
