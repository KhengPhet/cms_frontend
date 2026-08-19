<template>
  <RouterLink
    v-if="id"
    :to="{ name: 'news-detail', params: { id: id } }"
    @click.prevent="goToDetail"
    class="block group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
  >
    <!-- Image -->
    <div class="aspect-video overflow-hidden bg-gray-100">
      <img
        :src="image || 'https://via.placeholder.com/300x200'"
        :alt="title"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
    </div>

    <!-- Content -->
    <div class="p-5">
      <span
        v-if="category"
        class="bg-red-500 text-white text-xs px-2 py-1 rounded inline-block"
      >
        {{ category }}
      </span>

      <h3
        class="text-lg font-bold mt-2 line-clamp-2 hover:text-red-500 transition-colors"
      >
        {{ title }}
      </h3>

      <!-- Info Row with Time, Views, and Comments -->
      <div class="mt-3 space-y-1">
        <p class="text-xs text-gray-400">{{ formattedTime }}</p>
        <div
          class="flex justify-between items-center gap-3 text-xs text-gray-400"
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
            {{ formattedViews }}
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
            {{ commentCount }} {{ commentCount === 1 ? "comment" : "comments" }}
          </span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed , onMounted } from "vue";
import PostAPI from "../../services/post";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "Uncategorized",
  },
  time: {
    type: String,
    default: "",
  },
  views: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
});

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

const goToDetail = async () => {
  try {
    await PostAPI.increaseView(props.id);
    router.push({ name: "news-detail", params: { id: props.id } });
  } catch (error) {
     console.log(error);
  }
}

// Format views number
const formattedViews = computed(() => {
  if (!props.views) return "0 views";

  let numViews = props.views;
  if (typeof props.views === "string") {
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
    numViews = props.views.replace(/[០-៩]/g, (match) => khmerDigits[match]);
    numViews = parseInt(numViews.replace(/,/g, ""));
  }

  if (isNaN(numViews)) return "0 views";

  if (numViews >= 1000000) {
    return (numViews / 1000000).toFixed(1) + "M views";
  } else if (numViews >= 1000) {
    return (numViews / 1000).toFixed(1) + "K views";
  }
  return numViews + " views";
});

// Format time display
const formattedTime = computed(() => {
  if (!props.time) return "";

  try {
    const date = new Date(props.time);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  } catch (error) {
    return props.time;
  }
});

// Handle image loading error
const handleImageError = (event) => {
  event.target.src = "https://via.placeholder.com/300x200";
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>