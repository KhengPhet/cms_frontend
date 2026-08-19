<template>
  <div class="bg-gray-50 rounded-lg p-4">
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0">
        <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {{ comment.name.charAt(0).toUpperCase() }}
        </div>
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <span class="font-semibold">{{ comment.name }}</span>
          <span class="text-xs text-gray-500">{{ formatTime(comment.createdAt) }}</span>
        </div>
        <p class="text-gray-700">{{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatTime } from "../utils/helpers"

defineProps({
  comment: {
    type: Object,
    required: true
  }
})
</script>