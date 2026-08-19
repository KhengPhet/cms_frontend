<template>
  <div class="mt-6 bg-gray-50 rounded-lg p-4">
    <h4 class="font-semibold mb-3">Add a comment</h4>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <input 
          v-model="form.name" 
          type="text" 
          placeholder="Your name" 
          required
          maxlength="50"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="mb-3">
        <textarea 
          v-model="form.text" 
          placeholder="Write your comment..." 
          required
          rows="3"
          maxlength="500"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <div class="text-xs text-gray-500 mt-1 text-right">
          {{ form.text.length }}/500
        </div>
      </div>
      <div class="flex justify-end">
        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          {{ isSubmitting ? 'Posting...' : 'Post Comment' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue"

const emit = defineEmits(['submit'])
const props = defineProps({
  isSubmitting: {
    type: Boolean,
    default: false
  }
})

const form = ref({
  name: '',
  text: ''
})

const handleSubmit = () => {
  if (!form.value.name.trim() || !form.value.text.trim()) return
  
  emit('submit', {
    name: form.value.name,
    text: form.value.text
  })
  
  // Reset form
  form.value = {
    name: '',
    text: ''
  }
}
</script>   