<template>
  <main class="bg-background-light dark:bg-background-dark min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <RouterLink to="/" class="hover:text-primary">ទំព័រដើម</RouterLink>
        <span>›</span>
        <span class="text-primary font-semibold">អន្តរជាតិ</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- LEFT -->
        <section class="lg:col-span-8 space-y-12">
          <!-- HERO -->
          <section>
            <div
              class="relative overflow-hidden rounded-xl aspect-[16/9] bg-slate-900 group cursor-pointer"
              @click="navigateToNews(hero.id)"
            >
              <div
                class="absolute inset-0 bg-cover bg-center opacity-80 transition-transform duration-700 group-hover:scale-105"
                :style="{ backgroundImage: `url(${hero.image})` }"
              ></div>

              <div
                class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
              ></div>

              <div class="absolute bottom-0 p-8 text-white">
                <span class="bg-primary text-xs font-bold px-3 py-1 rounded">
                  {{ hero.badge }}
                </span>

                <h3 class="text-2xl md:text-4xl font-black mt-4 leading-tight">
                  {{ hero.title }}
                </h3>

                <div
                  class="flex flex-wrap items-center justify-between gap-4 mt-4"
                >
                  <div class="flex gap-6 text-sm text-slate-300">
                    <span>🕒 {{ hero.time }}</span>
                    <span>✍️ {{ hero.author }}</span>
                  </div>

                  <div class="flex gap-4 text-sm text-slate-300">
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
              </div>
            </div>
          </section>

          <!-- ASIA -->
          <section>
            <div class="flex items-center justify-between border-b pb-2 mb-6">
              <h4 class="text-xl font-black text-primary uppercase">អាស៊ី</h4>
              <RouterLink
                to="/international/asia"
                class="text-xs font-bold hover:text-primary"
              >
                មើលទាំងអស់ →
              </RouterLink>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div
                v-for="item in asia"
                :key="item.id"
                class="group cursor-pointer"
                @click="navigateToNews(item.id)"
              >
                <div
                  class="aspect-video rounded-lg bg-cover bg-center mb-3 transition-transform group-hover:scale-105"
                  :style="{ backgroundImage: `url(${item.image})` }"
                ></div>

                <h5
                  class="text-lg font-bold group-hover:text-primary transition"
                >
                  {{ item.title }}
                </h5>

                <p class="text-sm text-slate-500 mt-2 line-clamp-2">
                  {{ item.desc }}
                </p>

                <div
                  class="flex items-center justify-between mt-3 text-xs text-slate-400"
                >
                  <span class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
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
                    {{ formatViews(item.views) }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
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
                    {{ getCommentCount(item.id) }}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </section>

        <!-- SIDEBAR -->
        <aside class="lg:col-span-4 space-y-8">
          <!-- Exchange -->
          <div
            class="bg-white dark:bg-slate-900 border rounded-xl p-6 shadow-sm"
          >
            <h5 class="text-sm font-black uppercase mb-4 text-primary">
              អត្រាប្តូរប្រាក់
            </h5>

            <div
              v-for="rate in rates"
              :key="rate.id"
              class="flex justify-between border-b py-3 text-sm"
            >
              <span>{{ rate.pair }}</span>
              <div class="text-right">
                <div class="font-bold">{{ rate.value }}</div>
                <div
                  :class="rate.change > 0 ? 'text-green-500' : 'text-red-500'"
                >
                  {{ rate.change > 0 ? "+" : "" }}{{ rate.change }}%
                </div>
              </div>
            </div>
          </div>

          <!-- Trending -->
          <div class="bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
            <h5 class="text-sm font-black uppercase mb-6 text-primary">
              កំពុងពេញនិយម
            </h5>

            <div
              v-for="(item, index) in trending"
              :key="item.id"
              class="flex gap-4 mb-6 cursor-pointer group"
              @click="navigateToNews(item.id)"
            >
              <span
                class="text-2xl font-black text-slate-300 group-hover:text-primary transition"
              >
                {{ String(index + 1).padStart(2, "0") }}
              </span>

              <div>
                <h6
                  class="text-sm font-bold group-hover:text-primary transition"
                >
                  {{ item.title }}
                </h6>
                <p class="text-xs text-slate-400 mt-1">
                  {{ item.count }} អត្ថបទថ្ងៃនេះ
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- ECONOMY -->
      <section class="mt-16">
        <div
          class="flex items-center justify-between border-l-4 border-primary pl-4 mb-6"
        >
          <h3 class="text-2xl font-bold uppercase">សេដ្ឋកិច្ច</h3>
          <RouterLink
            to="/international/economy"
            class="text-blue-500 hover:text-blue-700 cursor-pointer"
          >
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
  id: 401,
  image: "https://images.unsplash.com/photo-1526481280690-7b4d7f9c6b0d",
  badge: "កិច្ចប្រជុំកំពូល",
  title: "អង្គការសហប្រជាជាតិប្រជុំបន្ទាន់អំពីបញ្ហាការប្រែប្រួលអាកាសធាតុ",
  time: "១២ នាទីមុន",
  author: "ដេវីដ អាណុត",
  views: "32,456",
};

/* ASIA with IDs and views */
const asia = [
  {
    id: 402,
    title: "ទីផ្សារទូក្យូកើនឡើងក្រោយកិច្ចព្រមព្រៀងពាណិជ្ជកម្មថ្មី",
    desc: "ភាគហ៊ុនបច្ចេកវិទ្យាកើនឡើងខ្លាំងនៅតំបន់អាស៊ី។",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
    views: "8,234",
  },
  {
    id: 403,
    title: "ទេសចរណ៍អាស៊ីអាគ្នេយ៍កើនឡើងខ្លាំងក្នុងត្រីមាសទី២",
    desc: "ប្រទេសជាច្រើនទទួលបានភ្ញៀវទេសចរច្រើនជាងមុន។",
    image: "https://images.unsplash.com/photo-1526481280690-7b4d7f9c6b0d",
    views: "5,678",
  },
  {
    id: 404,
    title: "ចិនបើកទីផ្សារថ្មីសម្រាប់ការវិនិយោគបរទេស",
    desc: "រដ្ឋាភិបាលចិនប្រកាសគោលនយោបាយទាក់ទាញវិនិយោគថ្មីៗ។",
    image: "https://images.unsplash.com/photo-1519456264917-42d0aa2e0625",
    views: "12,345",
  },
  {
    id: 405,
    title: "ជប៉ុនបើកដំណើរការបច្ចេកវិទ្យាថ្មីសម្រាប់ដឹកជញ្ជូន",
    desc: "រថភ្លើងល្បឿនលឿនថ្មីនឹងចាប់ដំណើរការនៅឆ្នាំក្រោយ។",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    views: "9,876",
  },
];

/* EXCHANGE */
const rates = [
  { id: 1, pair: "USD / EUR", value: "0.9234", change: 0.12 },
  { id: 2, pair: "GBP / USD", value: "1.2652", change: -0.04 },
  { id: 3, pair: "USD / JPY", value: "151.42", change: 0.45 },
  { id: 4, pair: "USD / KHR", value: "4,050", change: -0.02 },
];

/* TRENDING with IDs */
const trending = [
  { id: 406, title: "#សេដ្ឋកិច្ចពិភពលោក", count: "125k" },
  { id: 407, title: "#បច្ចេកវិទ្យាអវកាស", count: "82k" },
  { id: 408, title: "#កិច្ចប្រជុំG7", count: "45k" },
  { id: 409, title: "#បញ្ហាបរិស្ថាន", count: "39k" },
];

/* ECONOMY with IDs and views */
// const economy = [
//   {
//     id: 410,
//     title: "តម្លៃមាសនៅទីផ្សារពិភពលោកកើនឡើង",
//     image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
//     time: "២ ម៉ោងមុន",
//     views: "2,345"
//   },
//   {
//     id: 411,
//     title: "វិនិយោគបរទេសកើនឡើង ៨%",
//     image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
//     time: "៣ ម៉ោងមុន",
//     views: "1,876"
//   },
//   {
//     id: 412,
//     title: "ធនាគារជាតិចេញគោលនយោបាយថ្មី",
//     image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
//     time: "៥ ម៉ោងមុន",
//     views: "3,456"
//   },
//   {
//     id: 413,
//     title: "អត្រាប្តូរប្រាក់រៀលមានស្ថិរភាព",
//     image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
//     time: "១ ថ្ងៃមុន",
//     views: "987"
//   }
// ]

// Function to get comment count from localStorage

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

        if (route.params.type === "local") {
          return type === "national";
        }

        if (route.params.type != "international") {
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
        commentCount: Number(p.comment_count) || 0,
      }));
  } catch (err) {
    console.error(err);
  }
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
  if (!views) return "0";

  let numViews = views;
  if (typeof views === "string") {
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

  if (isNaN(numViews)) return "0";

  if (numViews >= 1000000) {
    return (numViews / 1000000).toFixed(1) + "M";
  } else if (numViews >= 1000) {
    return (numViews / 1000).toFixed(1) + "K";
  }
  return numViews.toString();
};

// Navigation function
const navigateToNews = (id) => {
  if (id) {
    router.push({ name: "news-detail", params: { id } });
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