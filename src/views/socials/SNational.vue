<template>
  <main class="bg-background-light dark:bg-background-dark min-h-screen py-8">

    <!-- Breadcrumb -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <RouterLink to="/" class="hover:text-primary font-medium">
          ទំព័រដើម
        </RouterLink>
        <span>›</span>
        <span class="text-primary font-semibold">សង្គមជាតិ</span>
      </nav>

      <!-- GRID LAYOUT -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <!-- LEFT CONTENT -->
        <section class="lg:col-span-8 space-y-12">

          <!-- HERO -->
          <section>
            <div class="relative overflow-hidden rounded-xl group cursor-pointer" @click="navigateToNews(hero.id)">
              <div
                class="aspect-[16/9] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                :style="{
                  backgroundImage: `linear-gradient(0deg, rgba(26,34,127,.9), rgba(0,0,0,0)), url(${hero.image})`
                }"
              ></div>

              <div class="absolute bottom-0 p-8 text-white">
                <span class="bg-red-600 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest">
                  {{ hero.badge }}
                </span>

                <h2 class="mt-4 text-3xl font-bold leading-snug max-w-3xl">
                  {{ hero.title }}
                </h2>

                <p class="mt-3 text-white/80 line-clamp-2 max-w-2xl">
                  {{ hero.description }}
                </p>

                <div class="flex flex-wrap items-center justify-between gap-4 mt-4">
                  <div class="flex gap-4 text-xs text-white/70">
                    <span>🕒 {{ hero.time }}</span>
                    <span>✍️ {{ hero.author }}</span>
                  </div>
                  
                  <div class="flex gap-4 text-xs text-white/70">
                    <span class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {{ formatViews(hero.views) }}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {{ getCommentCount(hero.id) }} comments
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- POLITICS -->
          <section>
            <div class="flex items-center justify-between border-l-4 border-primary pl-4 mb-6">
              <h3 class="text-2xl font-bold uppercase">
                នយោបាយ (Politics)
              </h3>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div
                v-for="item in politics"
                :key="item.id"
                class="flex gap-4 p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer group"
                @click="navigateToNews(item.id)"
              >
                <div
                  class="w-32 h-24 rounded-lg bg-cover bg-center"
                  :style="{ backgroundImage: `url(${item.image})` }"
                ></div>

                <div class="flex flex-col justify-between flex-1">
                  <div>
                    <h4 class="text-sm font-bold line-clamp-2 group-hover:text-primary transition">
                      {{ item.title }}
                    </h4>
                  </div>
                  
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs text-slate-400">
                      {{ item.time }}
                    </span>
                    <div class="flex gap-2 text-xs text-slate-400">
                      <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {{ formatViews(item.views) }}
                      </span>
                      <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {{ getCommentCount(item.id) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </section>

        <!-- SIDEBAR -->
        <aside class="lg:col-span-4 space-y-8">

          <!-- WEATHER -->
          <div class="bg-gradient-to-br from-primary to-indigo-900 rounded-xl p-6 text-white">
            <h3 class="font-bold uppercase text-sm mb-4">
              Phnom Penh Weather
            </h3>
            <div class="flex items-center gap-6">
              <span class="text-5xl">☁️</span>
              <div>
                <div class="text-4xl font-light">31°</div>
                <div class="text-sm opacity-80">Cloudy & Humid</div>
              </div>
            </div>
          </div>

          <!-- LATEST UPDATES -->
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
            <div class="bg-primary text-black px-4 py-3 text-sm font-bold uppercase">
              បច្ចុប្បន្នភាពចុងក្រោយ
            </div>

            <div class="divide-y">
              <div
                v-for="item in updates"
                :key="item.id"
                class="p-4 hover:bg-primary/5 transition cursor-pointer"
                @click="navigateToNews(item.id)"
              >
                <span class="text-primary text-xs font-bold">
                  {{ item.time }}
                </span>
                <p class="text-xs mt-1 font-medium">
                  {{ item.title }}
                </p>
                <div class="flex gap-3 mt-2 text-xs text-slate-400">
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {{ formatViews(item.views) }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {{ getCommentCount(item.id) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </aside>

      </div>

      <!-- ECONOMY -->
      <section class="mt-16">
        <div class="flex items-center justify-between border-l-4 border-primary pl-4 mb-6">
          <h3 class="text-2xl font-bold uppercase">
           សេដ្ឋកិច្ច (Economy)
          </h3>
          <RouterLink to="/national/economy" class="text-blue-500 hover:text-blue-700 cursor-pointer">
            មើលទាំងអស់
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NewsCard
           v-for="item in socialNews"
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
import { RouterLink, useRoute } from "vue-router";
import { useRouter } from "vue-router";
import NewsCard from "../../components/common/NewsCard.vue";
import { computed, onMounted, ref, watch } from "vue";
import PostAPI from "../../services/post";

const router = useRouter();
const route = useRoute();
const socialNews = ref([]);

const type = computed(() => route.params.type || "all");

/* HERO with ID and views */
const hero = {
  id: 501,
  image: "https://images.unsplash.com/photo-1526481280690-7b4d7f9c6b0d",
  badge: "ព័ត៌មានបន្ទាន់",
  title: "សម្តេចតេជោ ហ៊ុន សែន អញ្ជើញចូលរួមកិច្ចប្រជុំកំពូលអាស៊ាន",
  description: "កិច្ចប្រជុំនេះផ្តោតលើសន្តិសុខតំបន់ និងសហប្រតិបត្តិការសេដ្ឋកិច្ច។",
  time: "៣០ នាទីមុន",
  author: "ភ្នាក់ងារព័ត៌មាន",
  views: "45,678"
}

/* POLITICS with IDs and views */
const politics = [
  {
    id: 502,
    title: "រដ្ឋសភាអនុម័តថវិកាជាតិឆ្នាំ ២០២៥",
    time: "២ ម៉ោងមុន",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0",
    views: "3,456"
  },
  {
    id: 503,
    title: "កិច្ចពិភាក្សាទ្វេភាគីកម្ពុជា–វៀតណាម",
    time: "៤ ម៉ោងមុន",
    image: "https://images.unsplash.com/photo-1521791136064-7986c0212926",
    views: "2,345"
  },
  {
    id: 504,
    title: "រដ្ឋមន្ត្រីក្រសួងមហាផ្ទៃជួបពិភាក្សាការងារជាមួយអភិបាលរាជធានី",
    time: "៥ ម៉ោងមុន",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9",
    views: "1,876"
  },
  {
    id: 505,
    title: "គណៈកម្មាធិការសិទ្ធិមនុស្សជួបពិភាក្សាការងារ",
    time: "៦ ម៉ោងមុន",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    views: "1,234"
  }
]

/* ECONOMY with IDs and views */
// //const economy = [
//   {
//     id: 506,
//     title: "តម្លៃមាសបន្តកើនឡើង",
//     image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
//     time: "២ ម៉ោងមុន",
//     views: "2,345"
//   },
//   {
//     id: 507,
//     title: "FDI កើនឡើង ៨%",
//     image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
//     time: "៣ ម៉ោងមុន",
//     views: "1,876"
//   },
//   {
//     id: 508,
//     title: "ធនាគារជាតិចេញគោលនយោបាយថ្មី",
//     image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
//     time: "៤ ម៉ោងមុន",
//     views: "3,456"
//   },
//   {
//     id: 509,
//     title: "អត្រាប្តូរប្រាក់រៀលមានស្ថិរភាព",
//     image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
//     time: "៥ ម៉ោងមុន",
//     views: "987"
//   }
// //]  

/* UPDATES with IDs and views */
const updates = [
  { 
    id: 510, 
    time: "10:45 AM", 
    title: "ក្រសួងសុខាភិបាលអំពាវនាវការពារជំងឺគ្រុនឈាម",
    views: "1,234"
  },
  { 
    id: 511, 
    time: "09:30 AM", 
    title: "បើកការដ្ឋានស្ពានថ្មីនៅភ្នំពេញ",
    views: "2,345"
  },
  { 
    id: 512, 
    time: "08:15 AM", 
    title: "ពិព័រណ៍ម្ហូបអាហារអន្តរជាតិ",
    views: "987"
  },
  { 
    id: 513, 
    time: "07:30 AM", 
    title: "កម្មវិធីសប្បុរសធម៌ជួយកុមារក្រីក្រ",
    views: "1,567"
  }
]

const fetchSocialNews = async () => {
  try {
    const res = await PostAPI.getAll();
    const posts = res.posts || res.data || [];

    socialNews.value = posts
      .filter((p) => {
        if (p.category_id !== 2) return false;

        if (!p.type) return false;

        const type = p.type.toLowerCase().trim();

        const validTypes = ["national", "international"];
        if (!validTypes.includes(type)) return false;
        // if (!["national", "international"].includes(postType)) return false;

        if (route.params.type != "local") {
          return type === "national";
        }

        if (route.params.type === "international") {
          return type === "international";
        }

        // DEFAULT = SHOW ALL SPORT
        return true;
      })
      .map((p) => ({
        id: p.id,
        image: p.thumbnail?.startsWith("http")
          ? p.thumbnail
          : `http://localhost:5001${p.thumbnail}`,
        title: p.title,
        category: p.category,
        time: p.created_at,
        views: p.views,
        commentCount: Number(p.comment_count) || 0
      }));
  } catch (err) {
    console.error(err);
  }
};

// Function to get comment count from localStorage
const getCommentCount = (newsId) => {
  if (typeof window === 'undefined' || !newsId) return 0;
  
  try {
    const savedComments = localStorage.getItem(`comments_${newsId}`);
    if (savedComments) {
      const comments = JSON.parse(savedComments);
      return comments.length;
    }
  } catch (error) {
    console.error('Error loading comments:', error);
  }
  return 0;
};

// Format views function
const formatViews = (views) => {
  if (!views) return '0';
  
  let numViews = views;
  if (typeof views === 'string') {
    const khmerDigits = {
      '០': '0', '១': '1', '២': '2', '៣': '3', '៤': '4',
      '៥': '5', '៦': '6', '៧': '7', '៨': '8', '៩': '9'
    };
    numViews = views.replace(/[០-៩]/g, (match) => khmerDigits[match]);
    numViews = parseInt(numViews.replace(/,/g, ''));
  }
  
  if (isNaN(numViews)) return '0';
  
  if (numViews >= 1000000) {
    return (numViews / 1000000).toFixed(1) + 'M';
  } else if (numViews >= 1000) {
    return (numViews / 1000).toFixed(1) + 'K';
  }
  return numViews.toString();
};

// Navigation function
const navigateToNews = (id) => {
  if (id) {
    router.push({ name: 'news-detail', params: { id } });
  }
};

onMounted(() => {
  fetchSocialNews();
});
watch(type, fetchSocialNews);
</script>

<style scoped>
main {
  font-family: "Battambang", sans-serif;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>