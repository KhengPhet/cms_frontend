<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- HEADER with gradient accent -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div
              class="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-md"
            >
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
            </div>
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
            >
              Comments
            </h1>
          </div>
          <p class="text-slate-500 text-sm ml-11">
            Review, moderate and manage all user comments in one place.
          </p>
        </div>

        <button
          @click="approveAll"
          :disabled="stats.pending === 0"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <svg
            class="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform"
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
          Approve All Pending
        </button>
      </div>

      <!-- STATS CARDS with modern design -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div
          class="group bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-500 text-sm font-medium mb-1">Approved</p>
              <p class="text-3xl font-bold text-slate-800">
                {{ stats.approved }}
              </p>
            </div>
            <div
              class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors"
            >
              <svg
                class="w-6 h-6 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div
          class="group bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-500 text-sm font-medium mb-1">Pending</p>
              <p class="text-3xl font-bold text-slate-800">
                {{ stats.pending }}
              </p>
            </div>
            <div
              class="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors"
            >
              <svg
                class="w-6 h-6 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div
          class="group bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-500 text-sm font-medium mb-1">Spam</p>
              <p class="text-3xl font-bold text-slate-800">{{ stats.spam }}</p>
            </div>
            <div
              class="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors"
            >
              <svg
                class="w-6 h-6 text-rose-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div
          class="group bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-500 text-sm font-medium mb-1">Total</p>
              <p class="text-3xl font-bold text-slate-800">
                {{ comments.length }}
              </p>
            </div>
            <div
              class="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors"
            >
              <svg
                class="w-6 h-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- SEARCH & FILTER SECTION -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6"
      >
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="relative flex-1">
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
              v-model="search"
              type="text"
              placeholder="Search comments by content or author..."
              class="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div class="sm:w-48">
            <select
              v-model="filter"
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="Approved">✓ Approved</option>
              <option value="Pending">⏳ Pending</option>
              <option value="Spam">⚠️ Spam</option>
            </select>
          </div>
        </div>
      </div>

      <!-- TABLE with modern design -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
      >
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p class="mt-2 text-slate-500">Loading comments...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredComments.length === 0" class="text-center py-12">
          <svg
            class="w-12 h-12 mx-auto mb-3 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            ></path>
          </svg>
          <p class="text-sm text-slate-500">No comments found</p>
          <p class="text-xs text-slate-400 mt-1">Try adjusting your search or filter</p>
        </div>

        <!-- Comments Table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200">
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Author
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Comment
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Post
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Actions
                </th>
               </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="c in filteredComments"
                :key="c.id"
                @click="openModal(c)"
                class="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                      {{ (c.author || "U").charAt(0).toUpperCase() }}
                    </div>
                    <span class="font-medium text-slate-700">{{
                      c.author
                    }}</span>
                  </div>
                 </td>
                <td class="px-6 py-4 text-slate-600 max-w-md">
                  <div class="line-clamp-2">{{ c.comment }}</div>
                 </td>
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600"
                  >
                    {{ c.post_title || c.post || 'N/A' }}
                  </span>
                 </td>
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                    :class="statusStyles(c.status)"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full"
                      :class="statusDot(c.status)"
                    ></span>
                    {{ c.status }}
                  </span>
                 </td>
                <td class="px-6 py-4 text-slate-500 text-sm">
                  {{ formatDate(c.created_at || c.date) }}
                 </td>
                <td class="px-6 py-4" @click.stop>
                  <div class="flex items-center gap-2">
                    <button
                      v-if="c.status !== 'Approved'"
                      @click.stop="updateStatus(c, 'Approved')"
                      class="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-all"
                      title="Approve"
                    >
                      <svg
                        class="w-5 h-5"
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
                    </button>
                    <button
                      v-if="c.status !== 'Spam'"
                      @click.stop="updateStatus(c, 'Spam')"
                      class="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-all"
                      title="Mark as Spam"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      @click.stop="remove(c.id)"
                      class="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-all"
                      title="Delete"
                    >
                      <svg
                        class="w-5 h-5"
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
      </div>
    </div>

    <!-- MODAL with modern design -->
    <div
      v-if="showModal && current"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      @click.self="closeModal"
    >
      <div
        class="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-slideUp"
      >
        <div class="relative p-6">
          <button
            @click="closeModal"
            class="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <svg
              class="w-5 h-5"
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
          </button>

          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
              {{ (current.author || "U").charAt(0).toUpperCase() }}
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-800">
                {{ current.author }}
              </h3>
              <p class="text-xs text-slate-400">on {{ current.post_title || current.post }}</p>
            </div>
          </div>

          <div class="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
            <p class="text-slate-700 leading-relaxed">{{ current.comment }}</p>
          </div>

          <div class="flex flex-wrap gap-2 justify-end">
            <button
              v-if="current.status !== 'Approved'"
              @click="updateStatus(current, 'Approved')"
              class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors"
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
              Approve
            </button>
            <button
              v-if="current.status !== 'Spam'"
              @click="updateStatus(current, 'Spam')"
              class="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors"
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              Mark as Spam
            </button>
            <button
              @click="remove(current.id)"
              class="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 rounded-xl text-sm font-medium hover:bg-rose-100 transition-colors"
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
              @click="closeModal"
              class="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import CommentAPI from "../../../services/comment";

const comments = ref([]);
const search = ref("");
const filter = ref("");
const showModal = ref(false);
const current = ref(null);
const loading = ref(false);

// Computed filtered comments
const filteredComments = computed(() => {
  return comments.value.filter((c) => {
    const matchesFilter = !filter.value || c.status === filter.value;
    const matchesSearch =
      !search.value ||
      c.comment?.toLowerCase().includes(search.value.toLowerCase()) ||
      c.author?.toLowerCase().includes(search.value.toLowerCase());
    return matchesFilter && matchesSearch;
  });
});

// Statistics
const stats = computed(() => ({
  approved: comments.value.filter((c) => c.status === "Approved").length,
  pending: comments.value.filter((c) => c.status === "Pending").length,
  spam: comments.value.filter((c) => c.status === "Spam").length,
}));

// Status styling functions
const statusStyles = (status) => {
  const styles = {
    Approved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border border-amber-200",
    Spam: "bg-rose-50 text-rose-700 border border-rose-200",
  };
  return styles[status] || styles.Pending;
};

const statusDot = (status) => {
  const dots = {
    Approved: "bg-emerald-500",
    Pending: "bg-amber-500",
    Spam: "bg-rose-500",
  };
  return dots[status] || dots.Pending;
};

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// LOAD DATA
const loadComments = async () => {
  loading.value = true;
  try {
    const res = await CommentAPI.getAll();
    const data = res.data || res;
    comments.value = data.map((c) => ({
      id: c.id,
      author: c.author,
      avatar: c.avatar,
      comment: c.comment,
      post_title: c.post_title || c.post,
      status: c.status,
      created_at: c.created_at,
    }));
  } catch (err) {
    console.error("Failed to load comments:", err);
    alert('Failed to load comments');
  } finally {
    loading.value = false;
  }
};

onMounted(loadComments);

// Modal handlers
const openModal = (comment) => {
  current.value = comment;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  current.value = null;
};

// Actions
const updateStatus = async (comment, newStatus) => {
  if (!comment) return;

  try {
    await CommentAPI.updateStatus(comment.id, newStatus);
    await loadComments(); // sync with DB
    closeModal();
  } catch (err) {
    console.error("Failed to update status:", err);
    alert('Failed to update comment status');
  }
};

const remove = async (id) => {
  if (!id) return;
  if (!confirm('Are you sure you want to delete this comment? This action cannot be undone.')) return;

  try {
    await CommentAPI.delete(id);
    await loadComments(); // sync
    closeModal();
  } catch (err) {
    console.error("Failed to delete comment:", err);
    alert('Failed to delete comment');
  }
};

const approveAll = async () => {
  const pending = comments.value.filter((c) => c.status === "Pending");
  if (pending.length === 0) return;
  
  if (!confirm(`Approve all ${pending.length} pending comments?`)) return;

  try {
    for (let c of pending) {
      await CommentAPI.updateStatus(c.id, "Approved");
    }
    await loadComments(); // ✅ important
    alert('All pending comments have been approved!');
  } catch (err) {
    console.error("Failed to approve all:", err);
    alert('Failed to approve all comments');
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>