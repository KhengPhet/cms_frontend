import API from "./api";

const CategoryAPI = {
  async getAll() {
    const res = await API.get("/categories");
    return res.data;
  },

  async getById(id) {
    const res = await API.get(`/categories/${id}`);
    return res.data;
  },

  async create(data) {
    const res = await API.post("/categories", data);
    return res.data;
  },

  async update(id, data) {
    const res = await API.put(`/categories/${id}`, data);
    return res.data;
  },

  async remove(id) {
    const res = await API.delete(`/categories/${id}`);
    return res.data;
  },

  async getPostsByCategoryId(categoryId) {
    const res = await API.get("/posts");
    const posts = res.data.posts || res.data;
    return posts.filter((p) => p.category_id == categoryId);
  },

  async getPostsByCategoryName(categoryName) {
    const res = await API.get("/posts");
    const posts = res.data.posts || res.data;
    return posts.filter((p) => p.category === categoryName);
  },
};

export default CategoryAPI;