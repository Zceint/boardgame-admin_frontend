const storage = {
  saveUser(user) {
    localStorage.setItem("user_token", JSON.stringify(user));
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user_token")) || {};
  },
  removeUser() {
    localStorage.removeItem("user_token");
  },
};

export default storage;
