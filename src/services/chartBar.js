import { ref } from "vue";
import API from "./api";

const posts = ref([]);
const bar = ref([]);

const loadPosts = async () => {
  const result = await API.get("/posts");
  posts.value = result.data.posts;
  ConvertToChartData(posts.value);
};
