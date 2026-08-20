import API from "./api";

export default {
  async getProfile() {
    const res = await API.get("/user/profile");
    return res.data;
  },
};
