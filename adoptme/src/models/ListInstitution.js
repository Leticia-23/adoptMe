class ListInstitution {
  _id = "";
  name = "";
  information = "";
  avatar = "";
  createdAt = "";

  static from(json) {
    return Object.assign(new ListInstitution(), json);
  }

  static preview() {
    return ListInstitution.from({
      id: "12328283728283728642",
      name: "Test institution",
      information:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      avatar: "https://i.imgur.com/qJ4UV1i.png",
      createdAt: new Date(),
    });
  }
}

export default ListInstitution;
