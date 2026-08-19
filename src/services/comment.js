import API from "./api";

const CommentAPI = {
    async getByPost(postId) {
        const response = await API.get(`/comments/post/${postId}`);
        return response.data;
    },

    async create(data) {
        const response = await API.post("/comments", data);
        return response.data;
    },

    async getAll() {
        const response = await API.get("/comments");
        return response.data;
    },

    async updateStatus(id, status) {
        const response = await API.put(`/comments/${id}/status`, { status });
        return response.data;
    },

    async delete(id) {
        const response = await API.delete(`/comments/${id}`);
        return response.data;
    },

    async getStats() {
        const response = await API.get("/comments/stats");
        return response.data;
    },

    async approveAll() {
        const response = await API.post("/comments/approve-all");
        return response.data;
    },
};

export default CommentAPI;