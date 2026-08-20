<template>
  <main class="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100">
    <div class="max-w-[1280px] mx-auto px-4 lg:px-10 py-6">

      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <RouterLink to="/" class="hover:text-primary font-medium">
          ទំព័រដើម
        </RouterLink>
        <span>›</span>
        <span class="text-primary font-semibold">កម្សាន្តអន្តរជាតិ</span>
      </nav>

      <section class="mt-12">
        <div class="flex items-center justify-between border-l-4 border-primary pl-4 mb-6">
          <h3 class="text-2xl font-bold uppercase">កម្សាន្តអន្តរជាតិ</h3>
        </div>
        <!-- News Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <NewsCard
             v-for="item in International"
            :key="item.id"
            :id="item.id"
            :image="item.image"
            :title="item.title"
            :category="item.category"
            :time="item.time"
            :views="item.views"
            :commentCount="item.commentCount"
          />
        </div>
      </section>

    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import NewsCard from '../../components/common/NewsCard.vue';
import PostAPI from "../../services/post";
import { getImageUrl } from "../../services/imageUrl";

const route = useRoute();
const International = ref([]);

const type = computed(() => route.params.type || "all");

const fetchInternationalNews = async () => {
  try {
    const res = await PostAPI.getAll();
    const posts = res.posts || res.data || [];

    International.value = posts
      .filter((p) => {
        if (p.category_id !== 3) return false;

         if (!p.type) return false;

        const type = p.type.toLowerCase().trim();

        const validTypes = ["national", "international"];
        if (!validTypes.includes(type)) return false;

        if (route.params.type === "local") {
          return type === "national";
        }

        if (route.params.type != "international") {
          return type === "international";
        }

        // DEFAULT = SHOW ALL SPORT
        // return true;
        return type === "international";
      })
      .map((p) => ({
        id: p.id,
        image: p.thumbnail?.startsWith("http")
          ? p.thumbnail
          : getImageUrl(p.thumbnail),
        title: p.title,
        category: p.category,
        time: p.created_at,
        views: p.views,
        commentCount: Number(p.comment_count) || 0,
      }));
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchInternationalNews();
});

watch(type, fetchInternationalNews);
</script>

<style scoped>
main {
  font-family: "Battambang", sans-serif;
}
</style>