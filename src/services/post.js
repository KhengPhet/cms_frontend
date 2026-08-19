import API from "./api";

const PostAPI = {
  // Get all posts
  async getAll() {
    const result = await API.get("/posts");
    return result.data;
  },

  // Get single post by ID
  async getById(id) {
    const result = await API.get(`/posts/${id}`);
    return result.data;
  },

  // Get posts by category
  async getByCategory(categoryName) {
    const response = await API.get(`/posts`);
    // Filter posts by category name on frontend
    const posts = response.data.posts;
    return {
      ...response.data,
      posts: posts.filter(post => post.category === categoryName)
    };
  },

  // Get posts by category ID
  async getByCategoryId(categoryId) {
    const response = await API.get(`/posts`);
    const posts = response.data.posts;
    return {
      ...response.data,
      posts: posts.filter(post => post.category_id == categoryId)
    };
  },

  // increaseView 
  async increaseView(id) {
   try {
      const res = await API.post(`/posts/${id}/view`);
      return res.data;
    } catch (err) {
      console.error("Increase view error:", err);
      return null;
    }
  }
};

export default PostAPI;