<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- HEADER -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div
              class="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg"
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            </div>
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
            >
              Authors
            </h1>
          </div>
          <p class="text-slate-500 text-sm ml-13">
            Manage your team of writers, editors, and contributors.
          </p>
        </div>

        <button
          @click="openModal()"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Invite Author
        </button>
      </div>

      <!-- STATS SUMMARY -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-slate-500 text-xs font-medium uppercase tracking-wider"
              >
                Total Authors
              </p>
              <p class="text-2xl font-bold text-slate-800 mt-1">
                {{ authors.length }}
              </p>
            </div>
            <div
              class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-slate-500 text-xs font-medium uppercase tracking-wider"
              >
                Total Posts
              </p>
              <p class="text-2xl font-bold text-slate-800 mt-1">
                {{ totalPosts }}
              </p>
            </div>
            <div
              class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-slate-500 text-xs font-medium uppercase tracking-wider"
              >
                Active Editors
              </p>
              <p class="text-2xl font-bold text-slate-800 mt-1">
                {{ activeEditors }}
              </p>
            </div>
            <div
              class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-slate-500 text-xs font-medium uppercase tracking-wider"
              >
                Contributors
              </p>
              <p class="text-2xl font-bold text-slate-800 mt-1">
                {{ contributors }}
              </p>
            </div>
            <div
              class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- TABS: Cards & Table View -->
      <div class="mb-6">
        <div class="border-b border-slate-200">
          <nav class="flex gap-6">
            <button
              @click="activeTab = 'cards'"
              class="pb-3 text-sm font-medium transition-colors relative"
              :class="
                activeTab === 'cards'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-700'
              "
            >
              <div class="flex items-center gap-2">
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  ></path>
                </svg>
                Grid View
              </div>
            </button>
            <button
              @click="activeTab = 'table'"
              class="pb-3 text-sm font-medium transition-colors relative"
              :class="
                activeTab === 'table'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-700'
              "
            >
              <div class="flex items-center gap-2">
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
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
                Table View
              </div>
            </button>
          </nav>
        </div>
      </div>

      <!-- CARDS VIEW -->
      <div
        v-if="activeTab === 'cards'"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8"
      >
        <div
          v-for="author in authors"
          :key="author.id"
          class="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div
            class="relative h-24 bg-gradient-to-r from-indigo-500 to-purple-600"
          >
            <div class="absolute -bottom-10 left-1/2 -translate-x-1/2">
              <div
                class="w-20 h-20 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden"
              >
                <img
                  v-if="author.thumbnail"
                  :src="getImageUrl(author.thumbnail)"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-2xl font-bold"
                  :class="author.color"
                >
                  {{ author.initials }}
                </div>
              </div>
            </div>
          </div>

          <div class="pt-12 pb-5 px-4 text-center">
            <h3 class="font-bold text-slate-800 text-lg">{{ author.name }}</h3>
            <span
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium mt-2"
              :class="roleBadgeClass(author.role)"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="roleDotClass(author.role)"
              ></span>
              {{ author.role }}
            </span>
            <div class="text-sm text-slate-500 mt-2 truncate">
              {{ author.email }}
            </div>
            <div
              class="flex items-center justify-center gap-3 mt-3 text-sm text-slate-500"
            >
              <div class="flex items-center gap-1">
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
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <span>{{ author.posts }} posts</span>
              </div>
              <div class="flex items-center gap-1">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>{{ author.joined }}</span>
              </div>
            </div>
            <div
              class="flex justify-center gap-2 mt-4 pt-3 border-t border-slate-100"
            >
              <button @click="openModal(author)" class="text-blue-500">
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button class="text-gray-500">
                <i class="bi bi-envelope-fill"></i>
              </button>
              <button @click="removeAuthor(author.id)" class="text-red-500">
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- TABLE VIEW -->
      <div
        v-if="activeTab === 'table'"
        class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Author
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Posts
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  Joined
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
                v-for="author in authors"
                :key="author.id"
                class="hover:bg-slate-50 transition-colors group"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-full overflow-hidden shadow-sm">
                      <img
                        v-if="author.thumbnail"
                        :src="getImageUrl(author.thumbnail)"
                        class="w-full h-full object-cover"
                      />
                      <div
                        v-else
                        class="w-full h-full flex items-center justify-center text-white text-sm font-medium"
                        :class="author.color"
                      >
                        {{ author.initials }}
                      </div>
                    </div>
                    <span class="font-semibold text-slate-800">{{
                      author.name
                    }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                    :class="roleBadgeClass(author.role)"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full"
                      :class="roleDotClass(author.role)"
                    ></span>
                    {{ author.role }}
                  </span>
                </td>
                <td class="px-6 py-4 text-slate-600">{{ author.email }}</td>
                <td class="px-6 py-4">
                  <span class="font-semibold text-slate-700">{{
                    author.posts
                  }}</span>
                </td>
                <td class="px-6 py-4 text-slate-500 text-sm">
                  {{ author.joined }}
                </td>
                <td class="p-3 flex gap-2">
                  <button @click="openModal(author)" class="text-blue-500">
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button @click="removeAuthor(author.id)" class="text-red-500">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="authors.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-slate-400">
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                  <p class="text-sm">No authors found</p>
                  <p class="text-xs mt-1">
                    Click "Invite Author" to get started
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      @click.self="closeModal"
    >
      <div
        class="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-slideUp"
      >
        <!-- Header -->
        <div
          class="relative bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-5"
        >
          <div class="flex items-center justify-between">
            <div>
              <div class="text-lg font-bold text-white">
                {{ isEdit ? "Edit Author" : "Invite New Author" }}
              </div>
              <div class="text-sm text-indigo-100 mt-0.5">
                {{
                  isEdit
                    ? "Update author information"
                    : "Add a new member to your team"
                }}
              </div>
            </div>
            <button
              @click="closeModal"
              class="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
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
          </div>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1"
              >Full Name *</label
            >
            <input
              v-model="form.name"
              placeholder="e.g., John Doe"
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1"
              >Email Address *</label
            >
            <input
              v-model="form.email"
              placeholder="john@example.com"
              type="email"
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1"
              >Role</label
            >
            <select
              v-model="form.role"
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option>Admin</option>
              <option>Editor</option>
              <option>Author</option>
              <option>Contributor</option>
            </select>
          </div>

          <div v-if="isEdit">
            <label class="block text-sm font-medium text-slate-700 mb-1"
              >Biography</label
            >
            <textarea
              v-model="form.biography"
              placeholder="Write a short biography..."
              rows="3"
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
            ></textarea>
          </div>

          <div v-if="isEdit">
            <label class="block text-sm font-medium text-slate-700 mb-1"
              >Profile Picture</label
            >
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                <img
                  v-if="form.thumbnailUrl"
                  :src="getImageUrl(form.thumbnailUrl)"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-slate-400"
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </div>
              <input
                type="file"
                @change="handleFile"
                accept="image/*"
                class="flex-1 text-sm text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 transition-colors"
              />
            </div>
          </div>

          <label
            class="flex items-center gap-2 text-sm text-slate-600 cursor-pointer"
          >
            <input
              type="checkbox"
              v-model="form.sendInvite"
              class="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span>Send invitation email to this author</span>
          </label>
        </div>

        <!-- Footer -->
        <div
          class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3"
        >
          <button
            @click="closeModal"
            class="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
          > 
            Cancel
          </button>
          <button
            @click="saveAuthor"
            class="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-sm"
          >
            {{ isEdit ? "Update Author" : "Invite Author" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import AuthorAPI from "../../../services/author";

const authors = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const form = ref({});
const activeTab = ref("cards");

// Computed stats
const totalPosts = computed(() => {
  return authors.value.reduce((sum, author) => sum + (author.posts || 0), 0);
});

const activeEditors = computed(() => {
  return authors.value.filter((a) => a.role === "Editor" || a.role === "Admin")
    .length;
});

const contributors = computed(() => {
  return authors.value.filter((a) => a.role === "Contributor").length;
});

// Image URL helper
const getImageUrl = (file) => {
  if (!file) return null;

  if (file.startsWith("http")) return file;

  return `http://localhost:5001/uploads/${file}`;
};

const capitalizeRole = (role) => {
  if (!role) return "Author";
  return role.charAt(0).toUpperCase() + role.slice(1);
};

const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};

/* LOAD DATA */
const fetchAuthors = async () => {
  try {
    const res = await AuthorAPI.getAll();

    const data = Array.isArray(res) ? res : res.data;

    authors.value = data.map((a) => ({
      id: a.id,
      name: a.name,
      email: a.email,
      role: capitalizeRole(a.role),
      biography: a.biography || "",
      thumbnail: a.thumbnail || null,
      posts: Number(a.posts) || 0,
      joined: formatDate(a.created_at),
      initials: getInitials(a.name),
      color: getRandomColor(),
    }));
  } catch (err) {
    console.error("ERROR:", err);
  }
};

// Helper for random avatar colors
const getRandomColor = () => {
  const colors = [
    "bg-gradient-to-br from-indigo-500 to-indigo-600",
    "bg-gradient-to-br from-purple-500 to-purple-600",
    "bg-gradient-to-br from-emerald-500 to-emerald-600",
    "bg-gradient-to-br from-amber-500 to-amber-600",
    "bg-gradient-to-br from-rose-500 to-rose-600",
    "bg-gradient-to-br from-cyan-500 to-cyan-600",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

onMounted(fetchAuthors);

/* MODAL */
const openModal = (author = null) => {
  showModal.value = true;

  if (author) {
    isEdit.value = true;

    form.value = {
      id: author.id,
      name: author.name,
      email: author.email,
      role: author.role,
      biography: author.biography || "", 
      thumbnail: null,
      thumbnailUrl: author.thumbnail || null,
    };
  } else {
    isEdit.value = false;

    form.value = {
      name: "",
      email: "",
      role: "",
      biography: "",
      thumbnail: null,
      thumbnailUrl: null,
    };
  }
};

const closeModal = () => {
  showModal.value = false;
  form.value = {};
};

/* FILE HANDLER */
const handleFile = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.thumbnail = file;
    form.value.thumbnailUrl = URL.createObjectURL(file); 
  }
};

/* SAVE AUTHOR */
// const saveAuthor = async () => {
//   if (!form.value.name || !form.value.email) {
//     return alert("Name & Email are required");
//   }

//   try {
//     if (isEdit.value) {
//       const formData = new FormData();

//       // ✅ IMPORTANT
//       formData.append("biography", form.value.biography);

//       if (form.value.thumbnail) {
//         formData.append("thumbnail", form.value.thumbnail);
//       }

//       await AuthorAPI.update(form.value.id, formData);
//     } else {
//       await AuthorAPI.create({
//         name: form.value.name,
//         email: form.value.email,
//         role: form.value.role,
//       });
//     }

//     await fetchAuthors();
//     closeModal();
//   } catch (err) {
//     console.error(err);
//     alert("Error saving author");
//   }
// };

const saveAuthor = async () => {
  if (!form.value.name || !form.value.email) {
    return alert("Name & Email are required");
  }

  try {
    if (isEdit.value) {
      const formData = new FormData();

      formData.append("biography", form.value.biography || "");

      if (form.value.thumbnail) {
        formData.append("thumbnail", form.value.thumbnail);
      }

      await AuthorAPI.update(form.value.id, formData);
    } else {
      await AuthorAPI.create({
        name: form.value.name,
        email: form.value.email,
        role: form.value.role,
      });
    }

    await fetchAuthors();
    closeModal();
  } catch (err) {
    console.error(err);
    alert("Error saving author");
  }
};

/* DELETE AUTHOR */
const removeAuthor = async (id) => {
  if (confirm("Are you sure you want to delete this author?")) {
    try {
      await AuthorAPI.remove(id);
      await fetchAuthors();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting author. Please try again.");
    }
  }
};

/* ROLE STYLES */
const roleBadgeClass = (role) => {
  const classes = {
    Admin: "bg-orange-50 text-orange-700 border border-orange-200",
    Editor: "bg-blue-50 text-blue-700 border border-blue-200",
    Author: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Contributor: "bg-purple-50 text-purple-700 border border-purple-200",
  };
  return classes[role] || classes.Author;
};

const roleDotClass = (role) => {
  const dots = {
    Admin: "bg-orange-500",
    Editor: "bg-blue-500",
    Author: "bg-emerald-500",
    Contributor: "bg-purple-500",
  };
  return dots[role] || dots.Author;
};

</script>

<style scoped>
.ml-13 {
  margin-left: 3.25rem;
}

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
</style>