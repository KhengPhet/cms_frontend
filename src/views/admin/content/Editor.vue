<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <div class="flex items-center gap-3 mb-1">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </div>
            <h1
              class="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
            >
              {{ isEdit ? "Edit Post" : "Create New Post" }}
            </h1>
          </div>
          <p class="text-slate-500 text-sm ml-12">
            {{
              isEdit
                ? "Update your existing content"
                : "Share your thoughts with the world"
            }}
          </p>
        </div>

        <div class="flex gap-3">
          <button
            @click="save('draft')"
            :disabled="loading"
            class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              ></path>
            </svg>
            Save Draft
          </button>
          <button
            @click="save('publish')"
            :disabled="loading"
            class="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
            Publish
          </button>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- LEFT COLUMN - Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Title Card -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div class="p-5 space-y-4">
              <div>
                <label
                  class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2"
                  >Title</label
                >
                <input
                  v-model="form.title"
                  placeholder="Write an amazing title..."
                  class="w-full text-xl font-bold text-slate-800 placeholder-slate-300 focus:outline-none bg-transparent border-b-2 border-slate-100 focus:border-indigo-400 py-2 transition-colors"
                />
              </div>

              <div>
                <label
                  class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2"
                  >Slug</label
                >
                <div class="flex items-center gap-2">
                  <span class="text-slate-400 text-sm">/blog/</span>
                  <input
                    v-model="form.slug"
                    placeholder="post-url-slug"
                    class="flex-1 text-sm text-slate-600 focus:outline-none bg-transparent border-b border-slate-100 focus:border-indigo-400 py-1 transition-colors"
                  />
                  <button
                    @click="generateSlug"
                    class="p-1 text-slate-400 hover:text-indigo-500 transition-colors"
                    title="Generate from title"
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
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Content Card -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div class="border-b border-slate-100 px-5 py-3 bg-slate-50/50">
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-slate-400"
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
                <span
                  class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >Content</span
                >
              </div>
            </div>
            <div class="p-5">
              <textarea
                v-model="form.body"
                rows="12"
                placeholder="Write your story here... Markdown supported"
                class="w-full outline-none resize-y text-slate-700 placeholder-slate-300 leading-relaxed font-mono text-sm"
              ></textarea>
            </div>
          </div>

          <!-- Excerpt Card -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div class="border-b border-slate-100 px-5 py-3 bg-slate-50/50">
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-slate-400"
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
                <span
                  class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >Excerpt</span
                >
              </div>
            </div>
            <div class="p-5">
              <textarea
                v-model="form.excerpt"
                rows="3"
                placeholder="A short summary that appears in blog listings..."
                class="w-full outline-none resize-none text-slate-600 placeholder-slate-300 text-sm"
                maxlength="200"
              ></textarea>
              <p class="text-xs text-slate-400 mt-2">
                {{ (form.excerpt || "").length }}/200 characters
              </p>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN - Meta & Settings -->
        <div class="space-y-6">
          <!-- Status Card -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div class="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-slate-400"
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
                <span
                  class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >Status</span
                >
              </div>
            </div>
            <div class="p-5">
              <div class="flex gap-3">
                <label
                  class="flex-1 flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all"
                  :class="
                    form.status === 'Draft'
                      ? 'border-amber-400 bg-amber-50'
                      : 'border-slate-200 hover:border-slate-300'
                  "
                >
                  <input
                    type="radio"
                    v-model="form.status"
                    value="Draft"
                    class="w-4 h-4 text-amber-500"
                  />
                  <div>
                    <div class="text-sm font-medium text-slate-700">Draft</div>
                    <div class="text-xs text-slate-400">
                      Not visible to public
                    </div>
                  </div>
                </label>
                <label
                  class="flex-1 flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all"
                  :class="
                    form.status === 'Published'
                      ? 'border-emerald-400 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  "
                >
                  <input
                    type="radio"
                    v-model="form.status"
                    value="Published"
                    class="w-4 h-4 text-emerald-500"
                  />
                  <div>
                    <div class="text-sm font-medium text-slate-700">
                      Published
                    </div>
                    <div class="text-xs text-slate-400">Live on website</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Category Card -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div class="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
                  ></path>
                </svg>
                <span
                  class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >Category</span
                >
              </div>
            </div>
            <div class="p-5">
              <select
                v-model="form.category_id"
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option :value="null">Select a category</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
              <p
                v-if="categories.length === 0"
                class="text-xs text-amber-600 mt-2"
              >
                ⚠️ No categories found. Please create one first.
              </p>
            </div>
          </div>

          <!-- select type -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div class="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
              <span class="text-xs font-semibold text-slate-500 uppercase"
                >Type</span
              >
            </div>
            <div class="p-5">
              <select
                v-model="form.type"
                class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="">Select type</option>
                <option value="international">International</option>
                <option value="national">National</option>
              </select>
            </div>
          </div>

          <!-- Thumbnail Card -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div class="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-slate-400"
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
                <span
                  class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >Thumbnail Image</span
                >
              </div>
            </div>
            <div class="p-5">
              <!-- Current Thumbnail Preview -->
              <div v-if="form.thumbnail || thumbnailPreview" class="mb-4">
                <div class="text-xs font-medium text-slate-700 mb-2">
                  Current Thumbnail
                </div>
                <div class="relative inline-block">
                  <img
                    :src="thumbnailPreview || getThumbnailUrl(form.thumbnail)"
                    class="w-32 h-32 object-cover rounded-lg border-2 border-slate-200"
                    alt="Thumbnail preview"
                  />
                  <button
                    v-if="thumbnailPreview || form.thumbnail"
                    @click="removeThumbnail"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
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
                  </button>
                </div>
              </div>

              <!-- Upload Area -->
              <div
                class="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-indigo-300 transition-colors cursor-pointer"
                @click="triggerFileInput"
                @dragover.prevent
                @drop.prevent="handleDrop"
              >
                <input
                  type="file"
                  ref="fileInput"
                  accept="image/*"
                  @change="handleFileSelect"
                  class="hidden"
                />
                <svg
                  class="w-10 h-10 mx-auto text-slate-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p class="text-sm text-slate-600">
                  Click or drag image to upload thumbnail
                </p>
                <p class="text-xs text-slate-400 mt-1">
                  Max 5MB (JPG, PNG, GIF, WebP)
                </p>
              </div>
            </div>
          </div>

          <!-- Tags Card -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div class="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
                  ></path>
                </svg>
                <span
                  class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >Tags</span
                >
              </div>
            </div>
            <div class="p-5">
              <div class="flex flex-wrap gap-2 mb-3 min-h-[40px]">
                <span
                  v-for="(tag, i) in form.tags"
                  :key="i"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-lg text-xs font-medium border border-indigo-100"
                >
                  #{{ tag }}
                  <button
                    @click="removeTag(i)"
                    class="hover:text-red-500 transition-colors ml-0.5"
                  >
                    <svg
                      class="w-3 h-3"
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
                </span>
                <span
                  v-if="!form.tags || form.tags.length === 0"
                  class="text-xs text-slate-400 italic"
                  >No tags added yet</span
                >
              </div>

              <div class="relative">
                <input
                  v-model="tagInput"
                  @keydown.enter.prevent="addTag"
                  placeholder="Add a tag and press Enter..."
                  class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all pr-10"
                />
                <button
                  @click="addTag"
                  class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-indigo-500 transition-colors"
                  :disabled="!tagInput.trim()"
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
                </button>
              </div>
              <p class="text-xs text-slate-400 mt-2">Press Enter to add tag</p>
            </div>
          </div>

          <!-- Preview Card -->
          <div
            class="bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200 p-5"
          >
            <div class="flex items-center gap-2 mb-3">
              <svg
                class="w-4 h-4 text-slate-400"
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
              <span
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >Preview</span
              >
            </div>
            <div class="space-y-2">
              <div v-if="thumbnailPreview || form.thumbnail" class="mb-2">
                <img
                  :src="thumbnailPreview || getThumbnailUrl(form.thumbnail)"
                  class="w-full h-32 object-cover rounded-lg"
                  alt="Thumbnail preview"
                />
              </div>
              <p class="text-sm font-medium text-slate-700 truncate">
                {{ form.title || "Untitled Post" }}
              </p>
              <p class="text-xs text-slate-400 line-clamp-2">
                {{ form.excerpt || "No excerpt provided" }}
              </p>
              <div class="flex flex-wrap gap-1 mt-2">
                <span
                  v-if="form.category_id"
                  class="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-600"
                >
                  {{ getCategoryName(form.category_id) }}
                </span>
                <span
                  v-if="form.tags && form.tags.length"
                  class="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-600"
                >
                  {{ form.tags.length }} tag{{
                    form.tags.length !== 1 ? "s" : ""
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import PostAPI from "../../../services/post";
import categoryAPI from "../../../services/category";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const isEdit = ref(!!route.params.id);
const categories = ref([]);
const tagInput = ref("");
const fileInput = ref(null);
const thumbnailFile = ref(null);
const thumbnailPreview = ref("");

const form = ref({
  title: "",
  slug: "",
  body: "",
  excerpt: "",
  status: "Draft",
  category_id: null,
  type: "",
  tags: [],
  thumbnail: "",
});

const getThumbnailUrl = (thumbnail) => {
  if (!thumbnail) return "";

  if (thumbnail.startsWith("http")) return thumbnail;

  if (thumbnail.startsWith("/uploads")) {
    return `http://localhost:5001${thumbnail}`;
  }

  return `http://localhost:5001/uploads/posts/${thumbnail}`;
};

const generateSlug = () => {
  if (form.value.title) {
    form.value.slug = form.value.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
};

const addTag = () => {
  const trimmed = tagInput.value.trim().toLowerCase();
  if (!trimmed) return;
  if (!form.value.tags.includes(trimmed)) {
    form.value.tags.push(trimmed);
  }
  tagInput.value = "";
};

const removeTag = (index) => {
  form.value.tags.splice(index, 1);
};

const getCategoryName = (categoryId) => {
  const cat = categories.value.find((c) => c.id === categoryId);
  return cat ? cat.name : categoryId;
};

// Thumbnail handling
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  processFile(file);
  event.target.value = "";
};

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0];
  processFile(file);
};

const processFile = (file) => {
  if (!file || !file.type.startsWith("image/")) {
    alert("Please select an image file");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Image exceeds 5MB limit");
    return;
  }

  thumbnailFile.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    thumbnailPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const removeThumbnail = () => {
  thumbnailFile.value = null;
  thumbnailPreview.value = "";
  form.value.thumbnail = "";
};

// Auto generate slug from title
watch(
  () => form.value.title,
  (newTitle) => {
    if (newTitle && !form.value.slug) {
      generateSlug();
    }
  }
);

const fetchCategories = async () => {
  try {
    const response = await categoryAPI.getAll();
    categories.value = Array.isArray(response) ? response : response.data || [];
  } catch (err) {
    console.error("Load categories error:", err);
    alert("Error loading categories. Please refresh the page.");
  }
};

const save = async (mode) => {
  if (mode === "publish") {
    form.value.status = "Published";
  } else {
    form.value.status = "Draft";
  }

  if (mode === "publish") {
    if (!form.value.title?.trim()) {
      alert("Title is required");
      return;
    }
    if (!form.value.category_id) {
      alert("Please select a category");
      return;
    }
  }

  if (!form.value.slug && form.value.title) {
    generateSlug();
  }

  if (form.value.slug && !/^[a-z0-9-]+$/.test(form.value.slug)) {
    alert("Slug can only contain lowercase letters, numbers, and hyphens");
    return;
  }

  if (tagInput.value.trim()) {
    addTag();
  }

  loading.value = true;

  try {
    let response;

    if (thumbnailFile.value) {
      // Use FormData for thumbnail upload
      const formData = new FormData();
      formData.append("title", form.value.title.trim());
      formData.append("slug", form.value.slug);
      formData.append("body", form.value.body || "");
      formData.append("excerpt", form.value.excerpt || "");
      formData.append("status", form.value.status);
      formData.append("category_id", form.value.category_id || "");
      formData.append("type", form.value.type || "");
      formData.append("tags", JSON.stringify(form.value.tags));
      formData.append("thumbnail", thumbnailFile.value);

      if (isEdit.value) {
        response = await PostAPI.updateWithThumbnail(route.params.id, formData);
      } else {
        response = await PostAPI.createWithThumbnail(formData);
      }
    } else {
      // Use regular JSON for posts without thumbnail change
      const postData = {
        title: form.value.title.trim(),
        slug: form.value.slug,
        body: form.value.body || "",
        excerpt: form.value.excerpt || "",
        status: form.value.status,
        category_id: form.value.category_id,
        type: form.value.type,
        tags: form.value.tags,
        thumbnail: form.value.thumbnail,
      };

      if (isEdit.value) {
        response = await PostAPI.update(route.params.id, postData);
      } else {
        response = await PostAPI.create(postData);
      }
    }

    if (response && response.success) {
      alert(
        isEdit.value
          ? "Post updated successfully!"
          : "Post created successfully!"
      );
      router.push("/admin/dashboard");
    } else {
      throw new Error(response?.error || "Operation failed");
    }
  } catch (err) {
    console.error("Save error:", err);
    const errorMessage =
      err.response?.data?.error || err.message || "Error saving post";
    alert(errorMessage);
  } finally {
    loading.value = false;
  }
};

const loadEditData = async () => {
  if (route.params.id) {
    loading.value = true;
    try {
      const response = await PostAPI.getById(route.params.id);
      if (response && response.success && response.post) {
        const post = response.post;
        form.value = {
          title: post.title || "",
          slug: post.slug || "",
          body: post.body || "",
          excerpt: post.excerpt || "",
          status: post.status || "Draft",
          category_id: post.category_id || null,
          type: post.type || "",
          tags: post.tags || [],
          thumbnail: post.thumbnail || "",
        };
      } else {
        throw new Error(response?.message || "Post not found");
      }
    } catch (err) {
      console.error("Error loading post:", err);
      alert(
        "Error loading post data: " + (err.response?.data?.error || err.message)
      );
      router.push("/admin/dashboard");
    } finally {
      loading.value = false;
    }
  }
};

onMounted(() => {
  fetchCategories();
  loadEditData();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>