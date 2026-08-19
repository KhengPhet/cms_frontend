<template>
  <main class="max-w-7xl mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="text-gray-500">Loading...</div>
    </div>

    <!-- News Not Found -->
    <div v-else-if="!news" class="text-center py-12">
      <p class="text-red-500 mb-4">News article not found</p>
      <router-link to="/" class="text-blue-600 hover:underline">
        Back to home
      </router-link>
    </div>

    <!-- News Content -->
    <div v-else>
      <!-- Title -->
      <h1 class="text-3xl font-bold mb-4">
        {{ news.title }}
      </h1>

      <!-- Image -->
      <img 
        :src="news.image" 
        :alt="news.title"
        class="w-full rounded-lg mb-4 object-cover max-h-[500px]"
      />

      <!-- Meta Info -->
      <div class="text-gray-500 mb-6 flex items-center gap-4">
        <span>{{ news.time }}</span>
        <span>•</span>
        <span>{{ formatNumber(news.views) }} views</span>
        <span v-if="news.author">•</span>
        <span v-if="news.author">{{ news.author }}</span>
      </div>

      <!-- Content -->
      <div class="prose max-w-none mb-8">
        <p class="text-lg leading-relaxed">
          {{ news.description || news.content || 'ព័ត៌មានលម្អិតកំពុងរៀបចំ...' }}
        </p>
      </div>

      <!-- Comment Button -->
      <div class="mb-8">
        <button 
          @click="toggleCommentSection" 
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          <CommentIcon />
          Comments ({{ comments.length }})
        </button>
      </div>

      <!-- Comment Section -->
      <div v-if="showComments" class="border-t pt-6">
        <h3 class="text-xl font-bold mb-4">Comments</h3>
        
        <!-- Comment List -->
        <div v-if="comments.length > 0" class="space-y-4 mb-6">
          <CommentItem 
            v-for="comment in comments" 
            :key="comment.id" 
            :comment="comment"
          />
        </div>
        
        <div v-else class="text-gray-500 text-center py-8">
          No comments yet. Be the first to comment!
        </div>

        <!-- Add Comment Form -->
        <CommentForm 
          @submit="submitComment"
          :is-submitting="isSubmitting"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import CommentForm from "../CommentForm.vue"
import CommentItem from "../CommentItem.vue"
import CommentIcon from "../CommentIcon.vue"

// Router
const route = useRoute()
const newsId = route.params.id

// State
const news = ref(null)
const loading = ref(true)
const showComments = ref(false)
const comments = ref([])
const isSubmitting = ref(false)

// Load news data
const loadNews = () => {
  loading.value = true
  // Simulate async loading (remove if data is already available)
  setTimeout(() => {
    news.value = findNewsById(newsId)
    loading.value = false
  }, 100)
}

// Comment functions
const getStorageKey = () => `${COMMENTS_STORAGE_PREFIX}_${newsId}`

const loadComments = () => {
  try {
    const savedComments = localStorage.getItem(getStorageKey())
    if (savedComments) {
      comments.value = JSON.parse(savedComments)
    }
  } catch (error) {
    console.error('Failed to load comments:', error)
  }
}

const saveComments = () => {
  try {
    localStorage.setItem(getStorageKey(), JSON.stringify(comments.value))
  } catch (error) {
    console.error('Failed to save comments:', error)
  }
}

const toggleCommentSection = () => {
  showComments.value = !showComments.value
  if (showComments.value && comments.value.length === 0) {
    loadComments()
  }
}

const submitComment = async (commentData) => {
  if (!commentData.name.trim() || !commentData.text.trim()) {
    return
  }

  isSubmitting.value = true

  try {
    const newComment = {
      id: Date.now(),
      name: commentData.name.trim(),
      text: commentData.text.trim(),
      createdAt: new Date().toISOString()
    }
    
    comments.value.unshift(newComment)
    saveComments()
  } catch (error) {
    console.error('Failed to submit comment:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadNews()
})
</script>