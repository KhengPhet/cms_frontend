<template>
  <main
    class="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100"
  >
    <div class="max-w-[1280px] mx-auto px-4 lg:px-10 py-6">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <RouterLink to="/" class="hover:text-primary font-medium">
          ទំព័រដើម
        </RouterLink>
        <span>›</span>
        <span class="text-primary font-semibold">កម្សាន្តជាតិ</span>
      </nav>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- LEFT CONTENT -->
        <div class="lg:col-span-8 space-y-12">
          <!-- HERO -->
          <section
            class="relative group overflow-hidden rounded-xl shadow-xl cursor-pointer"
            @click="navigateToNews(hero.id)"
          >
            <div
              class="aspect-[16/9] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              :style="{ backgroundImage: `url(${hero.image})` }"
            ></div>

            <!-- Gradient Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            ></div>

            <!-- Content -->
            <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <div class="flex items-center gap-2 mb-4">
                <span
                  class="bg-accent-red text-white text-xs font-bold px-3 py-1 rounded"
                >
                  ព័ត៌មានក្តៅ
                </span>
                <span class="text-white/80 text-xs"> ព័ត៌មានភាពយន្ត </span>
              </div>

              <h2 class="text-white text-3xl md:text-4xl font-bold mb-4">
                {{ hero.title }}
              </h2>

              <p class="text-white/90 text-sm md:text-base max-w-2xl mb-6">
                {{ hero.description }}
              </p>

              <div class="flex flex-wrap items-center justify-between gap-4">
                <button
                  class="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-semibold w-fit"
                  @click.stop="navigateToNews(hero.id)"
                >
                  អានព័ត៌មានលម្អិត
                </button>

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
          </section>

          <!-- MUSIC -->
          <!-- <section>
            <div class="border-b-2 border-slate-200 mb-6">
              <h3 class="text-xl font-bold text-primary pb-2">តន្ត្រី</h3>
            </div>

            <div class="space-y-4">
              <div
                v-for="music in musicList"
                :key="music.id"
                class="flex gap-4 group cursor-pointer"
                @click="navigateToNews(music.id)"
              >
                <img
                  :src="music.image"
                  class="size-20 rounded-lg object-cover"
                />
                <div class="flex-1">
                  <h5
                    class="font-semibold text-sm group-hover:text-primary transition"
                  >
                    {{ music.title }}
                  </h5>
                  <p class="text-slate-400 text-xs mt-1">
                    {{ music.tag }}
                  </p>
                  <div class="flex gap-3 mt-2 text-xs text-slate-400">
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
                      {{ formatViews(music.views) }}
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
                      {{ getCommentCount(music.id) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section> -->
        </div>

        <!-- RIGHT SIDEBAR -->
        <aside class="lg:col-span-4 space-y-8">
          <section class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
              <span class="material-symbols-outlined text-accent-red">
                trending_up
              </span>
              កំពុងពេញនិយម
            </h3>

            <div class="space-y-6">
              <div
                v-for="(trend, i) in trending"
                :key="trend.id"
                class="flex gap-4 items-start group cursor-pointer"
                @click="navigateToNews(trend.id)"
              >
                <span
                  class="text-3xl font-black text-slate-200 group-hover:text-primary transition"
                >
                  {{ String(i + 1).padStart(2, "0") }}
                </span>
                <div class="flex-1">
                  <h4
                    class="font-semibold text-sm leading-snug group-hover:text-primary transition"
                  >
                    {{ trend.title }}
                  </h4>
                  <div class="flex gap-3 mt-1 text-xs text-slate-400">
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
                      {{ formatViews(trend.views) }}
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
                      {{ getCommentCount(trend.id) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <!-- CINEMA -->
      <section class="mt-12">
        <div
          class="flex items-center justify-between border-l-4 border-primary pl-4 mb-6"
        >
          <h3 class="text-2xl font-bold uppercase">កម្សាន្ត</h3>
          <RouterLink
            to="/entertainment/cinema"
            class="text-blue-500 hover:text-blue-700 cursor-pointer"
          >
            មើលទាំងអស់
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <NewsCard
            v-for="item in entertainmentNews"
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
import { ref, onMounted, computed, watch } from "vue";
import PostAPI from "../../services/post";
import { getImageUrl } from "../../services/imageUrl";

const router = useRouter();
const route = useRoute();
const entertainmentNews = ref([]);
const type = computed(() => route.params.type || "all");

/* HERO with ID and views */
const hero = {
  id: 601,
  image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66",
  title: "វិស័យភាពយន្តខ្មែរ កំពុងរីកចម្រើនខ្លាំង",
  description: "ស្វែងរកព័ត៌មានថ្មីៗអំពីភាពយន្ត ការចេញផ្សាយថ្មី និងបទសម្ភាសន៍។",
  views: "28,456",
};

/* MOVIES with IDs and views */
// const movies = [
//   {
//     id: 602,
//     image: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
//     title: "ភាពយន្តបែបសកម្មភាពថ្មី កំពុងចាក់បញ្ចាំង",
//     time: "២ ម៉ោងមុន",
//     views: "3,456"
//   },
//   {
//     id: 603,
//     image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae",
//     title: "ការថតក្រោយឆាក និងបទសម្ភាសន៍អ្នកដឹកនាំ",
//     time: "៣ ម៉ោងមុន",
//     views: "2,345"
//   },
//   {
//     id: 604,
//     image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
//     title: "ប្រកាសបេក្ខភាពពានរង្វាន់ភាពយន្តជាតិ",
//     time: "៤ ម៉ោងមុន",
//     views: "4,567"
//   },
//   {
//     id: 605,
//     image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
//     title: "ភាពយន្តខ្មែរថ្មីៗនឹងចាក់បញ្ចាំងឆ្នាំនេះ",
//     time: "៥ ម៉ោងមុន",
//     views: "1,876"
//   }
// ];

/* MUSIC with IDs and views */
const musicList = [
  {
    id: 606,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    title: "បទចម្រៀងខ្មែរល្បី ១០ ប្រចាំសប្ដាហ៍",
    tag: "កំពុងពេញនិយម",
    views: "12,345",
  },
  {
    id: 607,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    title: "MV ថ្មីចេញហើយ! បទរដូវក្តៅ",
    tag: "វីដេអូចម្រៀង",
    views: "8,765",
  },
  {
    id: 608,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
    title: "កម្មវិធីប្រគំតន្ត្រីថ្មីនៅភ្នំពេញ",
    tag: "ព្រឹត្តិការណ៍",
    views: "5,432",
  },
  {
    id: 609,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
    title: "តារាចម្រៀងខ្មែរចេញអាល់ប៊ុមថ្មី",
    tag: "អាល់ប៊ុម",
    views: "6,789",
  },
];

/* TRENDING with IDs and views */
const trending = [
  {
    id: 610,
    title: "ភាពយន្តថ្មីរបស់ រ៉េត សេរី លើស $1M",
    views: "15,234",
  },
  {
    id: 611,
    title: "ប្រកាសថ្ងៃប្រារព្ធ ពិធីតន្ត្រីភ្នំពេញ",
    views: "12,345",
  },
  {
    id: 612,
    title: "មើលខាងក្នុង ពិធីរាត្រីម៉ូដជាតិ",
    views: "8,765",
  },
  {
    id: 613,
    title: "ឆាកល្បីៗពីកម្មវិធីទូរទស្សន៍",
    views: "6,543",
  },
  {
    id: 614,
    title: "តារាសម្តែងថ្មីទទួលបានពានរង្វាន់",
    views: "4,321",
  },
];

const fetchEntertainmentNews = async () => {
  try {
    const result = await PostAPI.getAll();
    const posts = result.posts || result.data || [];
    entertainmentNews.value = posts
      .filter((p) => {
        // only entertainment
        if (p.category_id != 3) return false;

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

// Navigation function
const navigateToNews = (id) => {
  if (id) {
    router.push({ name: "news-detail", params: { id } });
  }
};

onMounted(() => {
  fetchEntertainmentNews();
});
watch(type, fetchEntertainmentNews);
</script>

<style scoped>
main {
  font-family: "Battambang", sans-serif;
}
</style>