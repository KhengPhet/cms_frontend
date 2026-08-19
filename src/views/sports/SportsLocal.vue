<template>
  <main class="bg-background-light dark:bg-background-dark min-h-screen py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <RouterLink to="/" class="hover:text-primary font-medium">
          Home
        </RouterLink>
        <span>›</span>
        <span class="text-primary font-semibold">Sport</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <!-- LEFT -->
        <section class="lg:col-span-8 space-y-14">
          <!-- HERO -->
          <div
            class="relative rounded-2xl overflow-hidden group shadow-xl cursor-pointer"
            @click="navigateToNews(hero.id)"
          >
            <div
              class="aspect-[16/9] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              :style="{
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,.8), transparent), url(${hero.image})`,
              }"
            ></div>

            <div class="absolute bottom-0 p-8 text-white">
              <span
                class="bg-green-600 px-4 py-1 text-xs font-bold rounded-full uppercase tracking-wider"
              >
                {{ hero.badge }}
              </span>

              <h1 class="text-3xl sm:text-4xl font-bold mt-4 max-w-3xl">
                {{ hero.title }}
              </h1>

              <p class="text-white/80 mt-3 max-w-2xl line-clamp-2">
                {{ hero.description }}
              </p>

              <div
                class="flex flex-wrap items-center justify-between gap-4 mt-4"
              >
                <div class="flex gap-6 text-xs text-white/70">
                  <span>🕒 {{ hero.time }}</span>
                  <span>✍️ {{ hero.author }}</span>
                </div>

                <div class="flex gap-4 text-xs text-white/70">
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
                    {{ formatViews(hero.views) }}
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
                    {{ getCommentCount(hero.id) }} comments
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- SPORT SECTIONS -->
          <SportSection
            title="⚽ បាល់ទាត់"
            :items="football"
            @navigate="navigateToNews"
          />
          <SportSection
            title="🥊 គុនខ្មែរ & បូកាតូ"
            :items="martialArts"
            @navigate="navigateToNews"
          />
          <SportSection
            title="🏀 កីឡាផ្សេងៗ"
            :items="otherSports"
            @navigate="navigateToNews"
          />
        </section>

        <!-- SIDEBAR -->
        <aside class="lg:col-span-4 space-y-8">
          <!-- MATCHES -->
          <div
            class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden"
          >
            <div
              class="bg-primary text-white px-6 py-3 text-sm font-bold uppercase"
            >
              កាលវិភាគប្រកួត
            </div>

            <div class="divide-y divide-slate-200 dark:divide-slate-800">
              <div v-for="match in matches" :key="match.id" class="p-4 text-sm">
                <p class="font-semibold">{{ match.teams }}</p>
                <span class="text-slate-400 text-xs">{{ match.date }}</span>
              </div>
            </div>
          </div>

          <!-- ATHLETES -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm">
            <h3 class="font-bold mb-4 text-primary">កីឡាករល្បីៗ</h3>
            <ul class="space-y-3 text-sm">
              <li v-for="athlete in athletes" :key="athlete">
                • {{ athlete }}
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <!-- TRENDING SECTION (NOW INSIDE CONTAINER) -->
      <section class="mt-16">
        <div
          class="flex items-center justify-between border-l-4 border-primary pl-4 mb-6"
        >
          <h3 class="text-2xl font-bold uppercase">ព័ត៌មានកីឡាចុងក្រោយ</h3>
          <RouterLink
            to="/sport"
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
const sportNews = ref([]);

const type = computed(() => route.params.type || "all");

/* SECTION COMPONENT */
const SportSection = {
  props: ["title", "items"],
  emits: ["navigate"],
  template: `
    <section>
      <h2 class="text-2xl font-bold text-primary mb-6">
        {{ title }}
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        <article
          v-for="item in items"
          :key="item.id"
          class="bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group cursor-pointer"
          @click="$emit('navigate', item.id)"
        >
          <div class="overflow-hidden">
            <div
              class="aspect-video bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              :style="{ backgroundImage: 'url(' + item.image + ')' }"
            ></div>
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm line-clamp-2 group-hover:text-primary">
              {{ item.title }}
            </h3>
            <p class="text-xs text-slate-500 mt-2 line-clamp-2">
              {{ item.description }}
            </p>
            <div class="flex items-center justify-between mt-3 text-xs text-slate-400">
              <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {{ formatViewsFromProps(item.views) }}
              </span>
              <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {{ getCommentCountFromProps(item.id) }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  `,
  methods: {
    formatViewsFromProps(views) {
      return formatViews(views);
    },
    getCommentCountFromProps(id) {
      return getCommentCount(id);
    },
  },
};

/* DATA WITH IDs AND VIEWS */
const hero = {
  id: 201,
  image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  badge: "SEA GAMES",
  title: "កម្ពុជារៀបចំ SEA Games ២០២៣ ដោយជោគជ័យ",
  description: "ការប្រកួតបានទាក់ទាញកីឡាករពីអាស៊ាន។",
  time: "១ ម៉ោងមុន",
  author: "ក្រុមការងារកីឡា",
  views: "25,678",
};

const football = [
  {
    id: 202,
    title: "លីគកម្ពុជា បញ្ចប់ដោយជ័យជំនះ",
    description: "ភ្នំពេញក្រោនយកឈ្នះក្រុមស្វាយរៀង ២-១។",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    views: "8,456",
  },
  {
    id: 203,
    title: "ក្រុមជម្រើសជាតិខ្មែរត្រៀមប្រកួតជើងឯកអាស៊ាន",
    description: "កីឡាករកំពុងហ្វឹកហាត់យ៉ាងសកម្ម។",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
    views: "12,345",
  },
];

const martialArts = [
  {
    id: 204,
    title: "ការប្រកួតគុនខ្មែរអន្តរជាតិ",
    description: "កីឡាករខ្មែរបានឈ្នះខ្សែក្រវាត់ពិភពលោក។",
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e",
    views: "15,234",
  },
  {
    id: 205,
    title: "បូកាតូខ្មែរ ទទួលបានការទទួលស្គាល់ជាអន្តរជាតិ",
    description: "ក្បាច់គុនបុរាណខ្មែរកំពុងពេញនិយម។",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865",
    views: "9,876",
  },
];

const otherSports = [
  {
    id: 206,
    title: "លីគបាល់បោះជាតិឆ្នាំ២០២៦",
    description: "ក្រុមថ្មីៗចូលរួមប្រកួតប្រជែង។",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf",
    views: "5,432",
  },
  {
    id: 207,
    title: "ការប្រកួតប្រណាំងកង់ជុំវិញប្រាសាទអង្គរ",
    description: "កីឡាករពី១០ប្រទេសចូលរួម។",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
    views: "3,210",
  },
];

const matches = [
  { id: 1, teams: "ភ្នំពេញក្រោន vs ស្វាយរៀង", date: "២៨ តុលា ២០២៦" },
  { id: 2, teams: "គុនខ្មែរ vs ថៃ", date: "៣០ តុលា ២០២៦" },
];

const athletes = ["ស៊ន សៀវម៉ី", "អេ ភូថង", "ចាន់ វឌ្ឍនាកា", "វ៉ា សុថារិទ្ធ"];

/* TRENDING DATA WITH IDs */
// const trending = [
//   {
//     id: 208,
//     image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
//     title: "ក្រុមជម្រើសជាតិប្រកួតជាមួយថៃ",
//     category: "បាល់ទាត់",
//     time: "២ ម៉ោងមុន",
//     views: "1,234",
//   },
//   {
//     id: 209,
//     image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e",
//     title: "គុនខ្មែរ ព្រឹត្តិការណ៍ធំប្រចាំឆ្នាំ",
//     category: "គុនខ្មែរ",
//     time: "៣ ម៉ោងមុន",
//     views: "980",
//   },
//   {
//     id: 210,
//     image: "https://images.unsplash.com/photo-1519861531473-9200262188bf",
//     title: "កីឡាករបាល់បោះខ្មែរទទួលបានអាហារូបករណ៍",
//     category: "បាល់បោះ",
//     time: "៥ ម៉ោងមុន",
//     views: "2,345",
//   },
//   {
//     id: 211,
//     image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
//     title: "ការប្រកួតកង់អន្តរជាតិនៅសៀមរាប",
//     category: "កីឡាកង់",
//     time: "១ ថ្ងៃមុន",
//     views: "567",
//   }
// ]

// Function to get comment count from localStorage

const fetchSportNews = async () => {
  try {
    const res = await PostAPI.getAll();
    const posts = res.posts || res.data || [];

    sportNews.value = posts
      .filter((p) => {
        if (p.category_id !== 1) return false;

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

// Make functions available to SportSection component
if (typeof window !== "undefined") {
  window.formatViews = formatViews;
  window.getCommentCount = getCommentCount;
}

onMounted(() => {
  fetchSportNews();
});
watch(type, fetchSportNews);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>