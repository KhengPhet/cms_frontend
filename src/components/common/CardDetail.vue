<template>
  <main class="max-w-[90%] mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"
      ></div>
      <p class="mt-2 text-gray-500">Loading...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- News Content -->
    <div v-else-if="news" class="flex flex-col lg:flex-row gap-8">
      <!-- Left Column: News Detail and Comments -->
      <div class="lg:w-2/3">
        <!-- Title -->
        <h1 class="text-3xl font-bold mb-4">
          {{ news.title }}
        </h1>

        <!-- Meta Info -->
        <div class="flex items-center gap-4 mb-4 text-gray-500">
          <span>{{ formatDate(news.created_at) }}</span>
          <span>{{ news.views || 0 }} views</span>
          <span v-if="news.author">By: {{ news.author }}</span>
        </div>

        <!-- Image -->
        <img
          :src="news.image"
          class="w-full rounded-lg mb-6"
          :alt="news.title"
        />

        <!-- Content -->
        <div
          class="prose max-w-none mb-8"
          v-html="news.content || news.body"
        ></div>

        <!-- Tags -->
        <div v-if="news.tags && news.tags.length" class="mb-8">
          <h3 class="font-semibold mb-2">Tags:</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in news.tags"
              :key="tag"
              class="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Comment Button -->
        <div class="mb-8">
          <button
            @click="toggleCommentSection"
            class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
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
            Comments ({{ totalCommentsCount }})
          </button>
        </div>

        <!-- Comment Section -->
        <div v-if="showComments" class="border-t pt-6">
          <h3 class="text-xl font-bold mb-4">Comments</h3>

          <!-- Comment List -->
          <div v-if="comments.length > 0" class="space-y-4 mb-6">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="bg-gray-50 rounded-lg p-4"
            >
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                  <img
                    v-if="comment.avatar"
                    :src="getImageUrl(comment.avatar)"
                    class="w-10 h-10 rounded-full object-cover"
                  />

                  <div
                    v-else
                    class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
                  >
                    {{ (comment.author || "U").charAt(0) }}
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-semibold">{{
                      comment.author || "User"
                    }}</span>
                    <span class="text-xs text-gray-500">{{
                      formatDate(comment.created_at)
                    }}</span>
                  </div>
                  <p class="text-gray-700">{{ comment.comment }}</p>

                  <!-- Reply Button -->
                  <button
                    @click="startReply(comment)"
                    class="text-sm text-blue-600 hover:text-blue-800 mt-2 flex items-center gap-1"
                  >
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
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                      />
                    </svg>
                    Reply
                  </button>

                  <!-- Replies Section -->
                  <div
                    v-if="comment.replies && comment.replies.length"
                    class="mt-4 ml-6 pl-4 border-l-2 border-gray-200 space-y-3"
                  >
                    <div
                      v-for="reply in comment.replies"
                      :key="reply.id"
                      class="bg-gray-100 rounded-lg p-3"
                    >
                      <div class="flex items-start gap-2">
                        <div class="flex-shrink-0">
                          <img
                            v-if="reply.avatar"
                            :src="getImageUrl(reply.avatar)"
                            class="w-8 h-8 rounded-full object-cover"
                          />

                          <div
                            v-else
                            class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white"
                          >
                            {{ (reply.author || "U").charAt(0) }}
                          </div>
                        </div>
                        <div class="flex-1">
                          <div class="flex items-center gap-2 mb-1">
                            <span class="font-semibold text-sm">{{
                              reply.author || "User"
                            }}</span>
                            <span class="text-xs text-gray-500">{{
                              formatDate(reply.created_at)
                            }}</span>
                          </div>
                          <p class="text-gray-700 text-sm">
                            {{ reply.comment }}
                          </p>

                          <!-- Reply Button for nested replies -->
                          <button
                            @click="startReply(comment)"
                            class="text-sm text-blue-600 hover:text-blue-800 mt-2 flex items-center gap-1"
                          >
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
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                              />
                            </svg>
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Reply Form -->
                  <div v-if="replyingTo === comment.id" class="mt-3 ml-6">
                    <form @submit.prevent="submitReply(comment.id)">
                      <div class="mb-2">
                        <textarea
                          v-model="replyForm.text"
                          :placeholder="`Reply to ${
                            comment.author || 'User'
                          }...`"
                          required
                          rows="2"
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        ></textarea>
                      </div>
                      <div class="flex justify-end gap-2">
                        <button
                          type="button"
                          @click="cancelReply"
                          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-4 rounded-lg transition duration-200 text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          :disabled="submittingReply"
                          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          {{ submittingReply ? "Posting..." : "Post Reply" }}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-gray-500 text-center py-8">
            No comments yet. Be the first to comment!
          </div>

          <!-- Add Comment Form -->
          <div class="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 class="font-semibold mb-3">Add a comment</h4>

            <!-- Check if user is logged in -->
            <div v-if="isLoggedIn">
              <form @submit.prevent="submitComment">
                <div class="mb-3">
                  <textarea
                    v-model="commentForm.text"
                    placeholder="Write your comment..."
                    required
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div class="flex justify-end">
                  <button
                    type="submit"
                    :disabled="submitting"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ submitting ? "Posting..." : "Post Comment" }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Not logged in message with login link -->
            <div v-else class="text-center py-4">
              <p class="text-gray-600 mb-3">Please log in to post a comment.</p>
              <button
                @click="redirectToLogin"
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Related Articles -->
      <div class="lg:w-1/3">
        <div v-if="relatedNews.length > 0" class="sticky top-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4 pb-2 border-b">អត្ថបទទាក់ទង</h2>
            <div class="space-y-4">
              <div
                v-for="related in relatedNews"
                :key="related.id"
                class="flex gap-3 cursor-pointer group hover:bg-gray-50 rounded-lg transition-all duration-200 p-2"
                @click="navigateToNews(related.id)"
              >
                <img
                  :src="related.image"
                  :alt="related.title"
                  class="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <h3
                    class="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2"
                  >
                    {{ related.title }}
                  </h3>
                  <div
                    class="flex items-center gap-2 text-xs text-gray-500 mt-1"
                  >
                    <span>{{ formatDate(related.created_at) }}</span>
                    <span>•</span>
                    <span>{{ related.views || 0 }} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import CommentAPI from "../../services/comment";
import PostAPI from "../../services/post";

const route = useRoute();
const router = useRouter();

// State variables
const news = ref(null);
const loading = ref(true);
const error = ref(null);
const showComments = ref(true);
const comments = ref([]);
const submitting = ref(false);
const submittingReply = ref(false);
const replyingTo = ref(null);
const relatedNews = ref([]);
const commentForm = ref({
  text: "",
});
const replyForm = ref({
  text: "",
});

// Helper function to get image URL
const getImageUrl = (file) => {
  if (!file) return null;
  if (file.startsWith("http")) return file;
  if (file.startsWith("/")) {
    return `http://localhost:5001${file}`;
  }
  return `http://localhost:5001/uploads/posts/${file}`;
};


// Check if user is logged in
const isLoggedIn = computed(() => {
  const token = localStorage.getItem("token");
  return !!token;
});

// Get total comments count including replies
const totalCommentsCount = computed(() => {
  let total = comments.value.length;
  comments.value.forEach((comment) => {
    if (comment.replies && comment.replies.length) {
      total += comment.replies.length;
    }
  });
  return total;
});

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "Unknown date";
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  return date.toLocaleDateString();
};

// Load related news
const loadRelatedNews = async (currentPostId) => {
  try {
    const response = await PostAPI.getAll({ limit: 10 });
    const posts = response.posts || response.data || [];
    // Filter out current news
    relatedNews.value = posts
      .filter(post => post.id !== parseInt(currentPostId))
      .slice(0, 20)
      .map(post => ({
        id: post.id,
        title: post.title,
        image: getImageUrl(post.thumbnail),
        created_at: post.created_at,
        views: post.views || 0,
        commentCount: post.comment_count || 0
      }));
  } catch (err) {
    console.error("Error loading related news:", err);
    relatedNews.value = [];
  }
};

// Navigate to news
const navigateToNews = (newsId) => {
  // Push to the new route
  router.push(`/news/${newsId}`);
};

// Load news from API
const loadNews = async (newsId) => {
  loading.value = true;
  error.value = null;

  try {
    const response = await PostAPI.getById(newsId);
    console.log("News response:", response);

    const post = response.post || response.data || response;

    if (post) {
      news.value = {
        id: post.id,
        title: post.title,
        body: post.body,
        excerpt: post.excerpt,
        image: getImageUrl(post.thumbnail),
        created_at: post.created_at,
        views: post.views || 0,
        author: post.author,
        category: post.category,
        tags: post.tags || [],
        status: post.status,
      };
    } else {
      error.value = "News article not found";
    }
  } catch (err) {
    console.error("Error loading news:", err);
    error.value = "Failed to load news article";
  } finally {
    loading.value = false;
  }
};

// Load comments from API with replies
const loadComments = async (postId) => {
  try {
    const res = await CommentAPI.getByPost(postId);
    comments.value = res.data || res;
    console.log("COMMENTS:", comments.value);
  } catch (err) {
    console.error(err);
    comments.value = [];
  }
};

// Function to load all data for a specific post
const loadPostData = async (postId) => {
  if (!postId) return;
  
  loading.value = true;
  try {
    // Increase view count
    await PostAPI.increaseView(postId);
    
    // Load all data in parallel for better performance
    await Promise.all([
      loadNews(postId),
      loadComments(postId),
      loadRelatedNews(postId)
    ]);
    
    // Reset UI state
    showComments.value = true;
    commentForm.value.text = "";
    replyingTo.value = null;
    replyForm.value.text = "";
  } catch (err) {
    console.error("Error loading page:", err);
    error.value = "Failed to load page content";
  } finally {
    loading.value = false;
  }
};

// Toggle comment section
const toggleCommentSection = () => {
  showComments.value = !showComments.value;
};

// Redirect to login page
const redirectToLogin = () => {
  localStorage.setItem("redirectAfterLogin", route.fullPath);
  router.push("/auth/login");
};

// Start reply to a comment
const startReply = (comment) => {
  replyingTo.value = comment.id;
  replyForm.value.text = "";
};

// Cancel reply
const cancelReply = () => {
  replyingTo.value = null;
  replyForm.value.text = "";
};

// Submit reply
const submitReply = async (parentCommentId) => {
  if (!replyForm.value.text.trim()) return;

  submittingReply.value = true;

  try {
    await CommentAPI.create({
      comment: replyForm.value.text,
      post_id: parseInt(route.params.id),
      parent_id: parentCommentId,
    });

    await loadComments(route.params.id);

    replyForm.value.text = "";
    replyingTo.value = null;
  } catch (err) {
    console.error("Error posting reply:", err);
  } finally {
    submittingReply.value = false;
  }
};

// Submit comment
const submitComment = async () => {
  if (!commentForm.value.text.trim()) return;

  submitting.value = true;

  try {
    await CommentAPI.create({
      comment: commentForm.value.text,
      post_id: parseInt(route.params.id),
      parent_id: null,
    });

    await loadComments(route.params.id);
    await loadNews(route.params.id);

    commentForm.value.text = "";
  } catch (err) {
    console.error(err);
  } finally {
    submitting.value = false;
  }
};

// Watch for route parameter changes with immediate option
watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId && newId !== oldId) {
      console.log("Route changed to:", newId);
      await loadPostData(newId);
    }
  },
  { immediate: true } // This ensures it runs immediately on mount
);

// No need for onMounted since watch with immediate:true handles it
</script>
<style scoped>
.prose {
  line-height: 1.8;
}

.prose p {
  margin-bottom: 1em;
}

/* Custom scrollbar for comments section */
.max-h-\[600px\]::-webkit-scrollbar {
  width: 6px;
}

.max-h-\[600px\]::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.max-h-\[600px\]::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.max-h-\[600px\]::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Line clamp for related articles */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Sticky positioning for related articles */
.sticky {
  position: sticky;
  top: 2rem;
}
</style>