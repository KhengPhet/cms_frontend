import API from "./api";

const CategoryAPI = {
    // Get all categories
    async getAll() {
        try {
            const res = await API.get("/categories");
            return res.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    },

    // Get category by ID
    async getById(id) {
        try {
            const res = await API.get(`/categories/${id}`);
            return res.data;
        } catch (error) {
            console.error("Error fetching category:", error);
            throw error;
        }
    },

    // Get posts by category ID
    async getPostsByCategoryId(categoryId) {
        try {
            const res = await API.get("/posts");

            const posts = res.data.posts || res.data;

            return posts.filter(p => p.category_id == categoryId);
        } catch (error) {
            console.error("Error filtering posts:", error);
            throw error;
        }
    },

    // Get posts by category name
    async getPostsByCategoryName(categoryName) {
        try {
            const res = await API.get("/posts");

            const posts = res.data.posts || res.data;

            return posts.filter(p => p.category === categoryName);
        } catch (error) {
            console.error("Error filtering posts:", error);
            throw error;
        }
    }
};

export default CategoryAPI;