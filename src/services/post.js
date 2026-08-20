import API from "./api";

const PostAPI = {
  async getAll() {
    const result = await API.get("/posts");
    return result.data;
  },

  async getById(id) {
    const result = await API.get(`/posts/${id}`);
    return result.data;
  },

  async create(data) {
    const result = await API.post("/posts", data);
    return result.data;
  },

  async createWithThumbnail(formData) {
    const result = await API.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result.data;
  },

  async update(id, data) {
    const result = await API.put(`/posts/${id}`, data);
    return result.data;
  },

  async updateWithThumbnail(id, formData) {
    const result = await API.put(`/posts/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result.data;
  },

  async delete(id) {
    const result = await API.delete(`/posts/${id}`);
    return result.data;
  },

  async getByCategory(categoryName) {
    const response = await API.get("/posts");
    const posts = response.data.posts;
    return {
      ...response.data,
      posts: posts.filter((post) => post.category === categoryName),
    };
  },

  async getByCategoryId(categoryId) {
    const response = await API.get("/posts");
    const posts = response.data.posts;
    return {
      ...response.data,
      posts: posts.filter((post) => post.category_id == categoryId),
    };
  },

  async increaseView(id) {
    try {
      const res = await API.post(`/posts/${id}/view`);
      return res.data;
    } catch (err) {
      console.error("Increase view error:", err);
      return null;
    }
  },
};

export default PostAPI;