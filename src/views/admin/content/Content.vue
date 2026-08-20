<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <!-- Header Section -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <div class="flex items-center gap-2 mb-1">
            <div
              class="w-9 h-9 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-md"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                ></path>
              </svg>
            </div>
            <h1
              class="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
            >
              All Content
            </h1>
          </div>
          <p class="text-slate-500 text-sm ml-11">
            Manage all your posts, pages, and documents in one place
          </p>
        </div>

        <button
          @click="newPost"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          New Post
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="group bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center"
              :style="{ background: stat.bg, color: stat.color }"
            >
              <i :class="`bi ${stat.icon} text-xl`"></i>
            </div>
            <div>
              <div class="text-2xl font-bold text-slate-800">
                {{ stat.value }}
              </div>
              <div class="text-xs font-medium text-slate-500">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Toolbar -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6"
      >
        <div class="flex flex-col lg:flex-row gap-3">
          <!-- Search -->
          <div class="flex-1 relative">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search by title or author..."
              class="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
              @input="debouncedFilter"
            />
          </div>

          <!-- Status Filter -->
          <select
            v-model="filters.status"
            class="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all cursor-pointer"
            @change="filterContent"
          >
            <option value="">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>

          <!-- Category Filter -->
          <select
            v-model="filters.category"
            class="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all cursor-pointer"
            @change="filterContent"
          >
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Bulk Action Bar -->
      <div
        v-if="selectedIds.length > 0"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300"
      >
        <div
          class="bg-slate-900 text-white rounded-2xl shadow-2xl px-5 py-3 flex items-center gap-4"
        >
          <span class="text-sm font-medium"
            >{{ selectedIds.length }} selected</span
          >
          <div class="h-4 w-px bg-slate-700"></div>
          <button
            @click="bulkAction('Published')"
            class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            Publish
          </button>
          <button
            @click="bulkAction('Draft')"
            class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
            Draft
          </button>
          <button
            @click="bulkDeleteAction"
            class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
            Delete
          </button>
          <button
            @click="clearSelection"
            class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            Clear
          </button>
        </div>
      </div>

      <!-- Content Table -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-100 bg-slate-50/50">
                <th class="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    :checked="isAllSelected"
                    @change="toggleSelectAll"
                    class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </th>
                <th
                  class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4"
                >
                  Thumbnail
                </th>
                <th
                  class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4"
                >
                  Title
                </th>
                <th
                  class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4"
                >
                  Status
                </th>
                <th
                  class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4"
                >
                  Category
                </th>
                <th
                  class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4"
                >
                  Author
                </th>
                <th
                  class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4"
                >
                  Date
                </th>
                <th
                  class="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="post in paginatedPosts"
                :key="post.id"
                class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                :class="{ 'bg-indigo-50/30': selectedIds.includes(post.id) }"
              >
                <td class="px-4 py-3">
                  <input
                    type="checkbox"
                    :checked="selectedIds.includes(post.id)"
                    @change="toggleSelect(post.id)"
                    class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </td>
                <td class="px-4 py-3">
                  <div
                    class="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center"
                  >
                    <img
                      v-if="post.thumbnail"
                      :src="getThumbnailUrl(post.thumbnail)"
                      :alt="post.title"
                      class="w-full h-full object-cover"
                      @error="handleThumbnailError"
                    />
                    <div
                      v-else
                      class="w-full h-full flex items-center justify-center"
                    >
                      <svg
                        class="w-6 h-6 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3">
                  <div>
                    <div class="font-medium text-slate-800 line-clamp-1">
                      {{ post.title }}
                    </div>
                    <div class="text-xs text-slate-400 font-mono mt-0.5">
                      /{{ post.slug }}
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3">
                  <span
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                    :class="getStatusClass(post.status)"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full"
                      :class="getStatusDotClass(post.status)"
                    ></span>
                    {{ post.status }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <span
                    class="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium"
                  >
                    {{ post.category || "Uncategorized" }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <img
                      v-if="post.author_thumbnail"
                      :src="getImageUrl(post.author_thumbnail)"
                      class="w-7 h-7 rounded-lg object-cover"
                      @error="handleImageError"
                    />
                    <div
                      v-else
                      class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      :style="{ background: getAuthorGradient(post.author) }"
                    >
                      {{ getAuthorInitials(post.author) }}
                    </div>
                    <span class="text-sm text-slate-600">
                      {{ post.author || "Unknown" }}
                    </span>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">
                  {{ formatDate(post.created_at) }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-1">
                    <button
                      @click="editPost(post.id)"
                      class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      @click="viewPost(post.id)"
                      class="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                      title="View"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      @click="confirmDelete(post.id)"
                      class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredPosts.length === 0 && !loading"
          class="text-center py-16"
        >
          <div
            class="w-20 h-20 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center"
          >
            <svg
              class="w-10 h-10 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 6h16M4 12h16M4 18h7"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-slate-700 mb-1">
            No content found
          </h3>
          <p class="text-sm text-slate-500">
            Try adjusting your search or filters
          </p>
          <button
            @click="resetFilters"
            class="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Reset filters
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-16">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"
          ></div>
          <p class="mt-2 text-slate-500">Loading posts...</p>
        </div>

        <!-- Pagination -->
        <div
          v-if="filteredPosts.length > 0 && !loading"
          class="border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div class="text-sm text-slate-500">
            Showing {{ (currentPage - 1) * pageSize + 1 }}–{{
              Math.min(currentPage * pageSize, filteredPosts.length)
            }}
            of {{ filteredPosts.length }} results
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <div class="flex items-center gap-1">
              <button
                v-for="page in displayedPages"
                :key="page"
                @click="currentPage = page"
                class="min-w-[32px] h-8 px-2 rounded-lg text-sm font-medium transition-all"
                :class="
                  page === currentPage
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                "
              >
                {{ page }}
              </button>
            </div>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import PostAPI from "../../../services/post";
import categoryAPI from "../../../services/category";
import { SERVER_BASE } from "../../../services/imageUrl";

// State
const posts = ref([]);
const categories = ref([]);
const loading = ref(false);
const error = ref(null);

// Router
const router = useRouter();

// Filters
const filters = ref({
  search: "",
  status: "",
  category: "",
});

const selectedIds = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);

// Stats with proper styling
const stats = computed(() => {
  return [
    {
      label: "Total",
      value: posts.value.length,
      bg: "linear-gradient(135deg, #6366f1, #a855f7)",
      color: "#ffffff",
      icon: "bi-file-text",
    },
    {
      label: "Published",
      value: posts.value.filter((p) => p.status === "Published").length,
      bg: "linear-gradient(135deg, #10b981, #14b8a6)",
      color: "#ffffff",
      icon: "bi-check-circle",
    },
    {
      label: "Drafts",
      value: posts.value.filter((p) => p.status === "Draft").length,
      bg: "linear-gradient(135deg, #f59e0b, #f97316)",
      color: "#ffffff",
      icon: "bi-pencil",
    },
    {
      label: "Categories",
      value: categories.value.length,
      bg: "linear-gradient(135deg, #3b82f6, #06b6d4)",
      color: "#ffffff",
      icon: "bi-folder",
    },
  ];
});

// Image helper
const getImageUrl = (file) => {
  if (!file) return null;
  if (file.startsWith("http")) return file;
  if (file.startsWith("/uploads")) return `${SERVER_BASE}${file}`;
  return `${SERVER_BASE}/uploads/posts/${file}`;
};

// Thumbnail helper
const getThumbnailUrl = (thumbnail) => {
  if (!thumbnail) return null;
  if (thumbnail.startsWith("http")) return thumbnail;
  if (thumbnail.startsWith("/uploads"))
    return `${SERVER_BASE}${thumbnail}`;
  return `${SERVER_BASE}/uploads/posts/${thumbnail}`;
};

const handleImageError = (event) => {
  event.target.style.display = "none";
};

const handleThumbnailError = (event) => {
  event.target.style.display = "none";
  // Show placeholder icon
  const parent = event.target.parentElement;
  if (parent) {
    parent.innerHTML = `
      <div class="w-full h-full flex items-center justify-center">
        <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
    `;
  }
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Fetch posts from API
const fetchPosts = async () => {
  loading.value = true;
  try {
    const response = await PostAPI.getAll();
    console.log("API RESPONSE:", response);

    // Handle different response structures
    let postsData = [];
    if (response.data && response.data.success) {
      postsData = response.data.posts;
    } else if (response.posts) {
      postsData = response.posts;
    } else if (Array.isArray(response)) {
      postsData = response;
    } else if (response.data && Array.isArray(response.data)) {
      postsData = response.data;
    } else {
      postsData = [];
    }

    posts.value = postsData.map((p) => ({
      id: p.id,
      title: p.title || "Untitled",
      slug: p.slug || "",
      status: p.status || "Draft",
      category: p.category || "Uncategorized",
      category_id: p.category_id,
      author: p.author || p.author_name || "Unknown",
      author_thumbnail: p.author_thumbnail,
      thumbnail: p.thumbnail || p.featured_image || p.image, // Support multiple field names
      created_at: p.created_at,
      type: "Post",
      views: 0,
    }));

    console.log("Processed posts with thumbnails:", posts.value);
  } catch (err) {
    console.error("Error fetching posts:", err);
    error.value = err.message;
    posts.value = [];
  } finally {
    loading.value = false;
  }
};

// Fetch categories
const fetchCategories = async () => {
  try {
    const response = await categoryAPI.getAll();
    console.log("CATEGORIES RESPONSE:", response);

    // Handle different response structures
    if (response.data && response.data.success) {
      categories.value = response.data.categories || [];
    } else if (Array.isArray(response)) {
      categories.value = response;
    } else if (response.data && Array.isArray(response.data)) {
      categories.value = response.data;
    } else {
      categories.value = [];
    }
  } catch (err) {
    console.error("Error fetching categories:", err);
    categories.value = [];
  }
};

// Delete post
const deletePost = async (id) => {
  try {
    const response = await PostAPI.delete(id);
    if (response.success || (response.data && response.data.success)) {
      await fetchPosts(); // Refresh the list
      alert("Post deleted successfully");
    } else {
      throw new Error(response.error || "Delete failed");
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("Error deleting post: " + (err.response?.data?.error || err.message));
  }
};

// Bulk update
const bulkUpdate = async (ids, status) => {
  try {
    for (const id of ids) {
      await PostAPI.update(id, { status });
    }
    await fetchPosts();
    alert(`${ids.length} posts updated to ${status}`);
    clearSelection();
  } catch (err) {
    console.error("Bulk update error:", err);
    alert("Error updating posts");
  }
};

// Bulk delete
const bulkDelete = async (ids) => {
  try {
    for (const id of ids) {
      await PostAPI.delete(id);
    }
    await fetchPosts();
    clearSelection();
    alert(`${ids.length} posts deleted successfully`);
  } catch (err) {
    console.error("Bulk delete error:", err);
    alert("Error deleting posts");
  }
};

// Status styling
const getStatusClass = (status) => {
  switch (status) {
    case "Published":
      return "bg-emerald-50 text-emerald-700";
    case "Draft":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const getStatusDotClass = (status) => {
  switch (status) {
    case "Published":
      return "bg-emerald-500";
    case "Draft":
      return "bg-amber-500";
    default:
      return "bg-slate-400";
  }
};

const getAuthorGradient = (author) => {
  const gradients = [
    "linear-gradient(135deg, #6366f1, #a855f7)",
    "linear-gradient(135deg, #ec489a, #f97316)",
    "linear-gradient(135deg, #10b981, #14b8a6)",
    "linear-gradient(135deg, #3b82f6, #06b6d4)",
  ];
  const index = (author?.length || 0) % gradients.length;
  return gradients[index];
};

const getAuthorInitials = (author) => {
  if (!author || author === "Unknown") return "??";
  return author.slice(0, 2).toUpperCase();
};

// Computed
const filteredPosts = computed(() => {
  let result = [...posts.value];

  if (filters.value.search) {
    const s = filters.value.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title?.toLowerCase().includes(s) ||
        p.author?.toLowerCase().includes(s)
    );
  }

  if (filters.value.status) {
    result = result.filter((p) => p.status === filters.value.status);
  }

  if (filters.value.category) {
    result = result.filter(
      (p) => Number(p.category_id) === Number(filters.value.category)
    );
  }

  return result;
});

const totalPages = computed(() =>
  Math.ceil(filteredPosts.value.length / pageSize.value)
);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredPosts.value.slice(start, start + pageSize.value);
});

const isAllSelected = computed(() => {
  return (
    filteredPosts.value.length > 0 &&
    selectedIds.value.length === filteredPosts.value.length
  );
});

const displayedPages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// Methods
const toggleSelect = (id) => {
  const index = selectedIds.value.indexOf(id);
  if (index === -1) {
    selectedIds.value.push(id);
  } else {
    selectedIds.value.splice(index, 1);
  }
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedIds.value = [];
  } else {
    selectedIds.value = filteredPosts.value.map((p) => p.id);
  }
};

const clearSelection = () => {
  selectedIds.value = [];
};

const bulkAction = (status) => {
  if (selectedIds.value.length === 0) {
    alert("No posts selected");
    return;
  }
  bulkUpdate(selectedIds.value, status);
};

const bulkDeleteAction = () => {
  if (selectedIds.value.length === 0) {
    alert("No posts selected");
    return;
  }
  if (
    confirm(
      `Delete ${selectedIds.value.length} posts? This action cannot be undone.`
    )
  ) {
    bulkDelete(selectedIds.value);
  }
};

const confirmDelete = (id) => {
  if (confirm("Delete this post? This action cannot be undone.")) {
    deletePost(id);
  }
};

const newPost = () => {
  router.push("/admin/newpost");
};

const editPost = (id) => {
  router.push(`/admin/editpost/${id}`);
};

const viewPost = (id) => {
  router.push(`/admin/post/${id}`);
};

const filterContent = () => {
  currentPage.value = 1;
};

const debouncedFilter = () => {
  currentPage.value = 1;
};

const resetFilters = () => {
  filters.value = {
    search: "",
    status: "",
    category: "",
  };
  currentPage.value = 1;
};

// Lifecycle
onMounted(() => {
  fetchPosts();
  fetchCategories();
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translate(-50%, 100%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.animate-in {
  animation: slideInFromBottom 0.3s ease-out;
}
</style>