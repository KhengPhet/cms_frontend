<template>
  <main class="bg-background-light min-h-screen py-10">
    <div class="max-w-7xl mx-auto px-4">
      <!-- HERO -->
      <section
        class="relative rounded-2xl overflow-hidden shadow-xl mb-12 cursor-pointer"
        @click="navigateToNews(hero.id)"
      >
        <img :src="hero.image" class="w-full h-[420px] object-cover" />

        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-10"
        >
          <div>
            <span
              class="bg-red-500 text-white text-xs font-bold px-3 py-1 uppercase rounded"
            >
              សង្គម
            </span>

            <h1
              class="text-white text-4xl md:text-5xl font-black mt-4 max-w-3xl leading-tight"
            >
              {{ hero.title }}
            </h1>

            <p class="text-white/80 mt-4 max-w-2xl">
              {{ hero.description }}
            </p>

            <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div class="flex items-center gap-6">
                <button
                  class="bg-blue-500 px-6 py-3 text-white rounded-lg font-bold hover:bg-primary/90 transition"
                  @click.stop="navigateToNews(hero.id)"
                >
                  អានបន្ថែម →
                </button>

                <span class="text-white/70 text-sm"> 🕒 {{ hero.time }} </span>
              </div>

              <div class="flex gap-4 text-white/70 text-sm">
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

      <!-- CONTENT GRID -->
      <div class="grid lg:grid-cols-12 gap-10">
        <!-- LEFT SIDE -->
        <div class="lg:col-span-8">
          <!-- TITLE -->
          <div class="flex items-center justify-between mb-8 border-b pb-4">
            <h2 class="text-2xl font-bold text-primary">
              📢 ព័ត៌មានសង្គមថ្មីៗ
            </h2>
          </div>

          <!-- NEWS GRID -->
          <div class="grid md:grid-cols-2 gap-8">
            <NewsCard
              v-for="item in socialsNews"
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

          <!-- PAGINATION -->
          <div class="flex justify-center mt-10 gap-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ថយក្រោយ
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-4 py-2 rounded',
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'border bg-white hover:bg-gray-100',
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              បន្ទាប់
            </button>
          </div>
        </div>

        <!-- SIDEBAR -->
        <div class="lg:col-span-4 space-y-8">
          <!-- TRENDING -->
          <div class="bg-white rounded-xl shadow p-6">
            <h3 class="font-bold text-primary mb-5 border-b pb-3">
              📈 ប្រធានបទកំពុងពេញនិយម
            </h3>

            <ul class="space-y-5">
              <li
                v-for="(trend, index) in trending"
                :key="index"
                class="flex gap-4 group cursor-pointer"
                @click="navigateToTrending(trend.id)"
              >
                <span
                  class="text-2xl font-black text-slate-200 group-hover:text-primary transition"
                >
                  0{{ index + 1 }}
                </span>

                <div>
                  <p
                    class="font-bold text-sm group-hover:text-primary transition"
                  >
                    {{ trend.title }}
                  </p>
                  <p class="text-xs text-slate-400">
                    {{ trend.hashtag }}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <!-- CTA -->
          <div
            class="bg-blue-500 text-white rounded-xl p-8 shadow-lg text-center"
          >
            <h3 class="text-xl font-black mb-3">ចូលរួមចំណែក!</h3>
            <p class="text-white/80 text-sm mb-6">
              សកម្មភាពតូចមួយរបស់អ្នក អាចបង្កើតការផ្លាស់ប្តូរដ៏ធំ។
            </p>

            <button
              class="w-full bg-white text-blue-500 py-3 rounded-lg font-bold mb-3 hover:bg-gray-100 transition"
              @click="handleDonate"
            >
              ❤️ បរិច្ចាគឥឡូវនេះ
            </button>

            <button
              class="w-full border border-white py-3 rounded-lg font-bold hover:bg-blue-600 transition"
              @click="handleVolunteer"
            >
              👥 ក្លាយជាអ្នកស្ម័គ្រចិត្ត
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import NewsCard from "../../components/common/NewsCard.vue";
import PostAPI from "../../services/post";
import { getImageUrl } from "../../services/imageUrl";

const router = useRouter();
const socialsNews = ref([]);

// Pagination
const currentPage = ref(1);
const itemsPerPage = 6;

// Hero data with ID and views
const hero = {
  id: 301,
  image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  title: "យុទ្ធនាការកាត់បន្ថយប្លាស្ទិក៖ សហគមន៍រួមគ្នាដើម្បីបរិស្ថានស្អាត",
  description:
    "សហគមន៍ក្នុងខេត្តសៀមរាប កំពុងរួមគ្នាប្រែប្រួលទម្លាប់ប្រើប្រាស់ប្លាស្ទិក។",
  time: "២ ម៉ោងមុន",
  views: "25,678",
};

// All news data with IDs
// const allNews = [
//   {
//     id: 302,
//     title: "កម្មវិធីផ្ដល់អាហារូបករណ៍ដល់កុមារនៅតំបន់ដាច់ស្រយាល",
//     description: "អង្គការក្រៅរដ្ឋាភិបាលបានផ្ដល់ជំនួយសិស្សជាង ៥០០ នាក់។",
//     category: "Community",
//     time: "៥ ម៉ោងមុន",
//     image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
//     views: "1,234"
//   },
//   {
//     id: 303,
//     title: "ពិធីបុណ្យភូមិលើកកម្ពស់សាមគ្គីភាព",
//     description: "ប្រជាពលរដ្ឋជួបជុំគ្នាប្រារព្ធពិធីបែបប្រពៃណី។",
//     category: "Event",
//     time: "១ ថ្ងៃមុន",
//     image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
//     views: "2,345"
//   },
//   {
//     id: 304,
//     title: "យុវជនស្ម័គ្រចិត្តចុះសម្អាតឆ្នេរខេត្តព្រះសីហនុ",
//     description: "យុវជនជាង ២០០ នាក់ចូលរួមក្នុងយុទ្ធនាការសម្អាតឆ្នេរ។",
//     category: "Environment",
//     time: "២ ថ្ងៃមុន",
//     image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
//     views: "3,456"
//   },
//   {
//     id: 305,
//     title: "ជំនួយស្បៀងអាហារដល់គ្រួសារខ្វះខាតក្នុងរាជធានីភ្នំពេញ",
//     description: "អង្គការសប្បុរសធម៌បានចែកអំណោយដល់គ្រួសារចំនួន ៥០០ ខ្នង។",
//     category: "Charity",
//     time: "៣ ថ្ងៃមុន",
//     image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
//     views: "4,567"
//   },
//   {
//     id: 306,
//     title: "សិក្ខាសាលាស្តីពីសុខភាពផ្លូវចិត្តសម្រាប់យុវជន",
//     description: "អ្នកជំនាញចែករំលែកចំណេះដឹងអំពីការថែទាំសុខភាពផ្លូវចិត្ត។",
//     category: "Health",
//     time: "៤ ថ្ងៃមុន",
//     image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
//     views: "1,789"
//   },
//   {
//     id: 307,
//     title: "ការតាំងពិព័រណ៍សិល្បៈខ្មែរបុរាណ",
//     description: "សិល្បៈខ្មែរត្រូវបានបង្ហាញដល់ភ្ញៀវទេសចរជាតិអន្តរជាតិ។",
//     category: "Culture",
//     time: "៥ ថ្ងៃមុន",
//     image: "https://images.unsplash.com/photo-1521334884684-d80222895322",
//     views: "2,890"
//   }
// ];

// const fetchSocialsNews = async () => {
//   try {
//     const result = await PostAPI.getAll();
//     const posts = result.posts || result.data || [];
//     socialsNews.value = posts
//       .filter((p) => p.category_id == 2)
//       .map((p) => ({
//         id: p.id,
//         image: p.image,
//         title: p.title,
//         category: p.category,
//         time: p.time,
//         views: p.views,
//         commentCount: getCommentCount(p.id),
//       }));
//   } catch (error) {
//     console.error("Error fetching socials news:", error);
//   }
// };

const fetchSocialsNews = async () => {
  try {
    const result = await PostAPI.getAll();
    const posts = result.posts || result.data || [];
    socialsNews.value = posts
      .filter((p) => p.category_id == 2)
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

// Computed paginated news
const news = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return socialsNews.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(socialsNews.value.length / itemsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Trending topics with IDs
const trending = [
  { id: 308, title: "យុទ្ធនាការដាំដើមឈើ", hashtag: "#EcoCambodia" },
  { id: 309, title: "ជំនួយសង្គ្រោះទឹកជំនន់", hashtag: "#HelpEachOther" },
  { id: 310, title: "អប់រំកុមារក្រីក្រ", hashtag: "#EduForAll" },
  { id: 311, title: "ការកាត់បន្ថយប្លាស្ទិក", hashtag: "#NoPlastic" },
];

// Function to get comment count from localStorage
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

// Navigation functions
const navigateToNews = (id) => {
  if (id) {
    router.push({ name: "news-detail", params: { id } });
  }
};

const navigateToTrending = (id) => {
  if (id) {
    router.push({ name: "news-detail", params: { id } });
  }
};

const handleDonate = () => {
  alert("សូមអរគុណសម្រាប់ការបរិច្ចាគរបស់លោកអ្នក!");
};

const handleVolunteer = () => {
  alert("សូមទំនាក់ទំនងមកយើងខ្ញុំតាមរយៈ info@example.com");
};

onMounted(() => {
  fetchSocialsNews();
});
</script>

<style scoped>
main {
  font-family: "Battambang", sans-serif;
}
</style>