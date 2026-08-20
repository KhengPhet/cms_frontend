<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">កំពុងផ្ទុកព័ត៌មាន...</p>
      </div>
    </div>

    <div v-else>
      <!-- Trending Section -->
      <section
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        v-if="trending.length > 0"
      >
        <!-- Header -->
        <div class="flex items-center mb-8">
          <div
            class="bg-red-600 text-white px-6 py-2 font-bold text-lg angled-badge pr-12"
          >
            កំពុងពេញនិយម
          </div>
          <div class="flex-grow h-[2px] bg-red-600"></div>
        </div>

        <!-- Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <!-- Big Left Card -->
          <div class="md:col-span-7 h-[500px]" v-if="trending[0]">
            <div
              class="relative h-full rounded-xl overflow-hidden group cursor-pointer"
              @click="navigateToNews(trending[0].id)"
            >
              <img
                :src="trending[0].image"
                :alt="trending[0].title"
                class="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110"
                @error="handleImageError"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              ></div>

              <div class="absolute bottom-6 left-6 right-6 text-white">
                <span class="bg-red-500 px-3 py-1 text-sm rounded">
                  {{ trending[0].category }}
                </span>

                <h2
                  class="text-2xl md:text-3xl font-bold mt-4 leading-tight line-clamp-3"
                >
                  {{ trending[0].title }}
                </h2>

                <div class="flex items-center gap-4 mt-2 text-sm text-gray-300">
                  <span>{{ trending[0].formattedTime }}</span>
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
                    {{ formatViews(trending[0].views) }}
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
                    {{ trending[0].commentCount }}
                    {{
                      trending[0].commentCount === 1 ? "comment" : "comments"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Small Cards -->
          <div class="md:col-span-5 grid grid-rows-2 gap-6 h-[500px]">
            <div
              v-for="(item, index) in trending.slice(1, 3)"
              :key="index"
              class="relative rounded-xl overflow-hidden group cursor-pointer"
              @click="navigateToNews(item.id)"
            >
              <img
                :src="item.image"
                :alt="item.title"
                class="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110"
                @error="handleImageError"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              ></div>

              <div class="absolute bottom-4 left-4 right-4 text-white">
                <span class="bg-red-500 px-2 py-1 text-xs rounded">
                  {{ item.category }}
                </span>

                <h3 class="text-lg font-bold mt-2 leading-snug line-clamp-2">
                  {{ item.title }}
                </h3>

                <div class="flex items-center gap-3 mt-1 text-xs text-gray-300">
                  <span>{{ item.formattedTime }}</span>
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
                    {{ item.commentCount }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Sport News Section -->
      <section class="mb-12" v-if="sportNews.length > 0">
        <div class="flex items-center mb-6">
          <div
            class="bg-red-500 text-white px-6 py-2 font-bold angled-badge pr-12"
          >
            ព័ត៌មានកីឡា
          </div>
          <div class="h-[2px] bg-red-500 flex-grow"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NewsCard
            v-for="item in sportNews"
            :key="item.id"
            :id="item.id"
            :image="item.image"
            :title="item.title"
            :category="item.category"
            :time="item.created_at"
            :views="item.views"
            :commentCount="item.commentCount"
          />
        </div>
      </section>

      <!-- Social News Section -->
      <section class="mb-12" v-if="socialNews.length > 0">
        <div class="flex items-center mb-6">
          <div
            class="bg-red-500 text-white px-6 py-2 font-bold angled-badge pr-12"
          >
            ព័ត៌មានសង្គម
          </div>
          <div class="h-[2px] bg-red-500 flex-grow"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NewsCard
            v-for="item in socialNews"
            :key="item.id"
            :id="item.id"
            :image="item.image"
            :title="item.title"
            :category="item.category"
            :time="item.created_at"
            :views="item.views"
            :commentCount="item.commentCount"
          />
        </div>
      </section>

      <!-- Entertainment News Section -->
      <section class="mb-12" v-if="entertainmentNews.length > 0">
        <div class="flex items-center mb-6">
          <div
            class="bg-red-500 text-white px-6 py-2 font-bold angled-badge pr-12"
          >
            ព័ត៌មានកម្សាន្ត
          </div>
          <div class="h-[2px] bg-red-500 flex-grow"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <NewsCard
            v-for="item in entertainmentNews"
            :key="item.id"
            :id="item.id"
            :image="item.image"
            :title="item.title"
            :category="item.category"
            :time="item.created_at"
            :views="item.views"
            :commentCount="item.commentCount"
          />
        </div>
      </section>

      <!-- Empty State -->
      <div v-if="!loading && allPosts.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">មិនមានព័ត៌មាននៅឡើយទេ</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import NewsCard from "../components/common/NewsCard.vue";
import PostAPI from "../services/post";
import { getImageUrl, SERVER_BASE } from "../services/imageUrl";

const router = useRouter();

// State variables
const allPosts = ref([]);
const trending = ref([]);
const sportNews = ref([]);
const socialNews = ref([]);
const entertainmentNews = ref([]);
const loading = ref(false);

// Format views number
const formatViews = (views) => {
  if (!views) return "0 views";

  let numViews = views;
  if (typeof views === "string") {
    numViews = parseInt(views.replace(/,/g, ""));
  }

  if (isNaN(numViews)) return "0 views";

  if (numViews >= 1000000) {
    return (numViews / 1000000).toFixed(1) + "M views";
  } else if (numViews >= 1000) {
    return (numViews / 1000).toFixed(1) + "K views";
  }
  return numViews + " views";
};

// Format date to readable string
const formatDate = (dateString) => {
  if (!dateString) return "ថ្មីៗនេះ";

  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "ទើបតែប៉ុន្មានវិនាទីមុន";
  if (diff < 3600) return `${Math.floor(diff / 60)} នាទីមុន`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ម៉ោងមុន`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} ថ្ងៃមុន`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)} សប្តាហ៍មុន`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} ខែមុន`;

  return date.toLocaleDateString("km-KH");
};

// Update the fetchAllPosts method in your home page component
const fetchAllPosts = async () => {
  loading.value = true;
  try {
    const response = await PostAPI.getAll();
    console.log("API RESPONSE:", response);

    let posts = [];
    if (response.posts) {
      posts = response.posts;
    } else if (response.data) {
      posts = response.data;
    } else if (Array.isArray(response)) {
      posts = response;
    } else {
      posts = [];
    }

    if (Array.isArray(posts) && posts.length > 0) {
      allPosts.value = posts.map((post) => ({
        id: post.id,
        title: post.title,
        image: getImageUrl(post.thumbnail),
        category: post.category_name || post.category || "ព័ត៌មាន",
        category_id: post.category_id,
        created_at: post.created_at,
        formattedTime: formatDate(post.created_at),
        views: post.views || 0,
        commentCount: parseInt(post.comment_count) || 0, // Make sure this is properly mapped
        slug: post.slug,
        excerpt: post.excerpt,
        status: post.status,
      }));

      // Log to verify comment counts
      console.log(
        "Posts with comment counts:",
        allPosts.value.map((p) => ({
          title: p.title,
          commentCount: p.commentCount,
        }))
      );

      trending.value = [...allPosts.value]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 3);

      sportNews.value = allPosts.value.filter((p) => p.category_id == 1);
      socialNews.value = allPosts.value.filter((p) => p.category_id == 2);
      entertainmentNews.value = allPosts.value.filter(
        (p) => p.category_id == 3
      );
    }
  } catch (err) {
    console.error("ERROR fetching posts:", err);
  } finally {
    loading.value = false;
  }
};

// Handle image loading error
const handleImageError = (event) => {
  event.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
};

// Navigation function
const navigateToNews = (id) => {
  router.push({ name: "news-detail", params: { id } });
};

// Load data on mount
onMounted(() => {
  fetchAllPosts();
  window.addEventListener("storage", (e) => {
    if (e.key && e.key.startsWith("comments_")) {
      fetchAllPosts(); 
    }
  });
});
</script>

<style scoped>
.angled-badge {
  clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

section {
  font-family: "Battambang", sans-serif;
}
</style>