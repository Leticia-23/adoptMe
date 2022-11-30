class User {
  id = "";
  name = "";
  email = "";
  biography = "";
  avatar = "";
  role = "user";
  createdAt = Date();

  get isAdmin() {
    return this.role === "admin";
  }

  static from(json) {
    json.createdAt = new Date(json.createdAt);
    return Object.assign(new User(), json);
  }

  static preview() {
    return User.from({
      id: "12319283719283712937",
      name: "Test user",
      email: "email@gmail.com",
      biography:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      avatar: "https://i.imgur.com/qJ4UV1i.png",
      role: "user",
      createdAt: new Date(),
    });
  }
}

export default User;
