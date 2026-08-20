import { ref } from "vue";
import API from "./api";

const posts = ref([]);
const bar = ref([]);

const ConvertToChartData = (data) => {
  const categoryCount = {};
  data.forEach((post) => {
    const cat = post.category || "Uncategorized";
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });
  bar.value = Object.entries(categoryCount).map(([name, count]) => ({
    name,
    count,
  }));
};

const loadPosts = async () => {
  const result = await API.get("/posts");
  posts.value = result.data.posts;
  ConvertToChartData(posts.value);
};

export { posts, bar, loadPosts };
