class User {
  id = "";
  username = "";
  bio = "";
  createdAt = Date();
  messagesNum = 0;
  avatar = "";
  role = "user";

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
      username: "Test user",
      bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      createdAt: new Date(),
      messagesNum: 500,
      avatar: "https://i.imgur.com/qJ4UV1i.png",
      role: "user",
    });
  }
}

export default User;
