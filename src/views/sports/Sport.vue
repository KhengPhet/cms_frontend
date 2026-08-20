<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-slate-500 mb-6">
      <RouterLink to="/" class="hover:text-primary">Home</RouterLink>
      <span>›</span>
      <span class="font-semibold text-slate-900">Sports News</span>
    </nav>

    <!-- Hero + Sidebar -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- HERO -->
      <section
        class="lg:col-span-2 relative rounded-xl overflow-hidden shadow-xl group cursor-pointer"
        @click="navigateToNews(hero.id)"
      >
        <div
          class="h-[350px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          :style="{
            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.85), rgba(0,0,0,.2)), url(${hero.image})`,
          }"
        ></div>

        <div class="absolute bottom-0 p-8">
          <span
            class="bg-accent-red text-white text-xs font-bold px-3 py-1 rounded uppercase"
          >
            {{ hero.category }}
          </span>

          <h2 class="text-white text-3xl font-bold mt-4 font-khmer">
            {{ hero.title }}
          </h2>

          <p class="text-white/80 mt-3 text-sm max-w-xl">
            {{ hero.description }}
          </p>

          <!-- Views and Comments for Hero -->
          <div class="flex items-center gap-4 mt-3 text-white/70 text-sm">
            <span class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {{ formatViews(hero.views) }}
            </span>
            <span class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {{ getCommentCount(hero.id) }} comments
            </span>
          </div>
        </div>
      </section>

      <!-- SIDEBAR -->
      <aside class="space-y-6">
        <!-- Top Scores -->
        <div class="bg-white rounded-xl shadow border border-slate-200">
          <div class="p-4 border-b font-bold text-sm uppercase text-slate-600">
            Top Scores
          </div>

          <div class="p-4 space-y-4">
            <div
              v-for="(match, index) in scores"
              :key="index"
              class="flex justify-between items-center text-sm"
            >
              <span>{{ match.home }}</span>
              <span class="font-bold text-primary">{{ match.score }}</span>
              <span>{{ match.away }}</span>
            </div>
          </div>
        </div>

        <!-- Upcoming -->
        <div class="bg-white rounded-xl shadow border border-slate-200">
          <div class="p-4 border-b font-bold text-sm uppercase text-slate-600">
            Upcoming Matches
          </div>

          <div class="p-4 space-y-4 text-sm">
            <div v-for="(up, index) in upcoming" :key="index">
              <p class="font-semibold">{{ up.title }}</p>
              <p class="text-slate-500 text-xs">{{ up.time }}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- Latest News Grid -->
    <section class="mt-12">
      <div
        class="flex items-center justify-between border-l-4 border-primary pl-4 mb-6"
      >
        <h3 class="text-2xl font-bold font-khmer uppercase">
          ព័ត៌មានកីឡាចុងក្រោយ
        </h3>
        <RouterLink
          to="/sports"
          class="text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          មើលទាំងអស់
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NewsCard
          v-for="item in sportNews"
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
  </main>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import { useRouter } from "vue-router";
import NewsCard from "../../components/common/NewsCard.vue";
import { ref, onMounted , computed, watch } from "vue";
import PostAPI from "../../services/post";
import { getImageUrl } from "../../services/imageUrl";

const router = useRouter();
const route = useRoute();
const sportNews = ref([]);

const type = computed(() => route.params.type || "all");

const hero = {
  id: 10,
  image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2",
  category: "Sport News",
  title: "ក្រុមបាល់ទាត់ជម្រើសជាតិកម្ពុជា ទទួលបានជ័យជំនះជាប្រវត្តិសាស្ត្រ",
  description:
    "National Football Team Secures Historic Win in the international arena.",
  views: "15,234",
};

const scores = [
  { home: "Svay Rieng", score: "2 - 1", away: "Phnom Penh" },
  { home: "Visakha", score: "0 - 0", away: "Boeung Ket" },
];

const upcoming = [
  { title: "Kun Khmer Fight Night", time: "Saturday, 7:00 PM" },
  { title: "CPL: Naga World vs Angkor Tiger", time: "Sunday, 3:30 PM" },
];

// const trending = [
//   {
//     id: 11,
//     image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2",
//     category: "Sport News",
//     title: "ជើងឯកពិភពលោក Kun Khmer ការពារខ្សែក្រវាត់បានសម្រេច",
//     time: "2 Hours Ago",
//     views: "1,240",
//   },
//   {
//     id: 12,
//     image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0",
//     category: "Football",
//     title: "ការសាងសង់កីឡដ្ឋានជាតិថ្មី សម្រេចបាន ៨០%",
//     time: "5 Hours Ago",
//     views: "980",
//   },
//   {
//     id: 13,
//     image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
//     category: "Marathon",
//     title: "ការប្រកួតរត់ម៉ារ៉ាតុងអន្តរជាតិ នឹងប្រព្រឹត្តទៅនៅអង្គរ",
//     time: "3 Hours Ago",
//     views: "2,345",
//   },
//   {
//     id: 14,
//     image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
//     category: "Martial Arts",
//     title: "គុនខ្មែរប្រកួតខ្សែក្រវាត់ពិភពលោក ប្រារព្ធនៅភ្នំពេញ",
//     time: "1 Day Ago",
//     views: "5,678",
//   },
// ];

// Function to get comment count from localStorage

//

const fetchSportNews = async () => {
  try {
    const result = await PostAPI.getAll();
    const posts = result.posts || result.data || [];
    sportNews.value = posts
      .filter((p) => {
        // only sport
        if (p.category_id != 1) return false;

        // filter by route param
        if (type.value === "international") {
          return p.type === "international";
        }

        if (type.value === "local") {
          return p.type === "national";
        }

        return true;
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
        commentCount: p.comment_count || 0,
      }));
  } catch (error) {}
};

const getCommentCount = (newsId) => {
  if (typeof window === "undefined" || !newsId) return 0;

  try {
    const savedComments = localStorage.getItem(`comments_${newsId}`);
    if (savedComments) {
      const comments = JSON.parse(savedComments);
      return comments.length;
    }
  } catch (error) {
    console.error("Error loading comments:", error);
  }
  return 0;
};

// Format views function
const formatViews = (views) => {
  if (!views) return "0 views";

  let numViews = views;
  if (typeof views === "string") {
    // Handle Khmer digits
    const khmerDigits = {
      "០": "0",
      "១": "1",
      "២": "2",
      "៣": "3",
      "៤": "4",
      "៥": "5",
      "៦": "6",
      "៧": "7",
      "៨": "8",
      "៩": "9",
    };
    numViews = views.replace(/[០-៩]/g, (match) => khmerDigits[match]);
    numViews = parseInt(numViews.replace(/,/g, ""));
  }

  if (isNaN(numViews)) return "0 views";

  if (numViews >= 1000000) {
    return (numViews / 1000000).toFixed(1) + "M views";
  } else if (numViews >= 1000) {
    return (numViews / 1000).toFixed(1) + "K views";
  }
  return numViews + " views";
};

// Navigation function
const navigateToNews = (id) => {
  if (id) {
    router.push({ name: "news-detail", params: { id } });
  }
};

onMounted(() => {
  fetchSportNews();
});
watch(type, fetchSportNews);
</script>

<style scoped>
section {
  font-family: "Battambang", sans-serif;
}
</style>