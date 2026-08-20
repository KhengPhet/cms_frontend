import API from "./api";

const AuthorAPI = {
  async getAll() {
    const res = await API.get("/authors");
    return res.data;
  },

  async getById(id) {
    const res = await API.get(`/authors/${id}`);
    return res.data;
  },

  async create(data) {
    const res = await API.post("/authors", data);
    return res.data;
  },

  async update(id, data) {
    const res = await API.put(`/authors/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async remove(id) {
    const res = await API.delete(`/authors/${id}`);
    return res.data;
  },
};

export default AuthorAPI;
