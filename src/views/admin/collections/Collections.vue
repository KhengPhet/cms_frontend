<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {{ lang === 'km' ? 'បណ្ដុំ' : 'Collections' }}
        </h1>
        <p class="text-gray-500 mt-1">
          {{ lang === 'km' ? 'ចងក្រងអត្ថបទជាបណ្ដុំ' : 'Group content into curated collections.' }}
        </p>
      </div>
      <button 
        @click="createCollection"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
      >
        <i class="bi bi-plus-lg text-lg"></i>
        {{ lang === 'km' ? 'បណ្ដុំថ្មី' : 'New Collection' }}
      </button>
    </div>

    <!-- Collections Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Collection Cards -->
      <div
        v-for="collection in collections"
        :key="collection.id"
        class="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        <div class="p-5">
          <!-- Icon -->
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
            :style="{ background: collection.iconBg || 'rgba(79,142,255,0.1)' }"
          >
            <i :class="collection.icon || 'bi bi-collection-fill'" class="text-2xl" :style="{ color: collection.iconColor || '#4f8eff' }"></i>
          </div>
          
          <!-- Content -->
          <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {{ collection.name }}
          </h3>
          <p class="text-sm text-gray-500 mb-4 line-clamp-2">
            {{ collection.desc }}
          </p>
          
          <!-- Footer -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div class="flex items-center gap-3">
              <span class="text-xs text-gray-500 flex items-center gap-1">
                <i class="bi bi-file-text text-xs"></i>
                {{ collection.items }} items
              </span>
              <span 
                :class="[
                  'text-xs px-2 py-1 rounded-full font-medium',
                  collection.status === 'active' ? 'bg-green-100 text-green-700' :
                  collection.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-600'
                ]"
              >
                {{ getStatusText(collection.status) }}
              </span>
            </div>
            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                @click="editCollection(collection)"
                class="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                title="Edit"
              >
                <i class="bi bi-pencil-fill text-sm"></i>
              </button>
              <button 
                @click="deleteCollection(collection)"
                class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Delete"
              >
                <i class="bi bi-trash-fill text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add New Collection Card -->
      <div
        @click="createCollection"
        class="border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer group min-h-[280px] flex flex-col items-center justify-center"
      >
        <div class="w-14 h-14 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors flex items-center justify-center mb-3">
          <i class="bi bi-plus-lg text-2xl text-gray-400 group-hover:text-blue-500 transition-colors"></i>
        </div>
        <p class="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
          {{ lang === 'km' ? 'បន្ថែមបណ្ដុំ' : 'Add New Collection' }}
        </p>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform translate-x-full opacity-0"
    >
      <div v-if="toast.show" class="fixed bottom-6 right-6 z-50">
        <div 
          :class="[
            'flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border backdrop-blur-sm',
            toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          ]"
        >
          <i :class="[
            'text-xl',
            toast.type === 'success' ? 'bi bi-check-circle-fill' :
            toast.type === 'error' ? 'bi bi-exclamation-triangle-fill' :
            'bi bi-info-circle-fill'
          ]"></i>
          <span class="text-sm font-medium">{{ toast.message }}</span>
        </div>
      </div>
    </Transition>

    <!-- Modal for Create/Edit -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modal.show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="closeModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">
              {{ modal.isEdit ? (lang === 'km' ? 'កែប្រែបណ្ដុំ' : 'Edit Collection') : (lang === 'km' ? 'បណ្ដុំថ្មី' : 'New Collection') }}
            </h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ lang === 'km' ? 'ឈ្មោះបណ្ដុំ' : 'Collection Name' }}
                </label>
                <input 
                  v-model="modal.form.name"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  :placeholder="lang === 'km' ? 'បញ្ចូលឈ្មោះបណ្ដុំ...' : 'Enter collection name...'"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ lang === 'km' ? 'ការពិពណ៌នា' : 'Description' }}
                </label>
                <textarea 
                  v-model="modal.form.desc"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  :placeholder="lang === 'km' ? 'បញ្ចូលការពិពណ៌នា...' : 'Enter description...'"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ lang === 'km' ? 'ស្ថានភាព' : 'Status' }}
                </label>
                <select 
                  v-model="modal.form.status"
                  class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option value="active">{{ lang === 'km' ? 'សកម្ម' : 'Active' }}</option>
                  <option value="draft">{{ lang === 'km' ? 'សេចក្តីព្រាង' : 'Draft' }}</option>
                  <option value="archived">{{ lang === 'km' ? 'ប័ណ្ណសារ' : 'Archived' }}</option>
                </select>
              </div>
            </div>
            
            <div class="flex gap-3 mt-6">
              <button 
                @click="closeModal"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
              >
                {{ lang === 'km' ? 'បោះបង់' : 'Cancel' }}
              </button>
              <button 
                @click="saveCollection"
                class="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition shadow-sm"
              >
                {{ modal.isEdit ? (lang === 'km' ? 'រក្សាទុក' : 'Save') : (lang === 'km' ? 'បង្កើត' : 'Create') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'CollectionsView',
  data() {
    return {
      lang: 'en', // 'en' or 'km'
      collections: [
        {
          id: 1,
          name: 'Design Systems',
          desc: 'Collection of design system resources and articles for modern web development',
          items: 12,
          status: 'active',
          icon: 'bi bi-brush-fill',
          iconBg: 'rgba(79, 142, 255, 0.1)',
          iconColor: '#4f8eff'
        },
        {
          id: 2,
          name: 'Vue.js Tips',
          desc: 'Useful Vue.js patterns, best practices, and performance optimization techniques',
          items: 8,
          status: 'draft',
          icon: 'bi bi-vuejs',
          iconBg: 'rgba(66, 184, 131, 0.1)',
          iconColor: '#42b883'
        },
        {
          id: 3,
          name: 'UX Research',
          desc: 'User experience case studies, research methods, and design insights',
          items: 5,
          status: 'archived',
          icon: 'bi bi-people-fill',
          iconBg: 'rgba(156, 39, 176, 0.1)',
          iconColor: '#9c27b0'
        },
        {
          id: 4,
          name: 'Frontend Resources',
          desc: 'Curated list of frontend development tools, libraries, and learning materials',
          items: 24,
          status: 'active',
          icon: 'bi bi-code-square',
          iconBg: 'rgba(255, 107, 107, 0.1)',
          iconColor: '#ff6b6b'
        }
      ],
      toast: {
        show: false,
        message: '',
        type: 'info',
        timeout: null
      },
      modal: {
        show: false,
        isEdit: false,
        form: {
          id: null,
          name: '',
          desc: '',
          status: 'active'
        }
      }
    }
  },
  methods: {
    getStatusText(status) {
      const statusMap = {
        active: this.lang === 'km' ? 'សកម្ម' : 'Active',
        draft: this.lang === 'km' ? 'សេចក្តីព្រាង' : 'Draft',
        archived: this.lang === 'km' ? 'ប័ណ្ណសារ' : 'Archived'
      }
      return statusMap[status] || status
    },
    
    showToast(message, type = 'info') {
      if (this.toast.timeout) clearTimeout(this.toast.timeout)
      
      this.toast = {
        show: true,
        message,
        type,
        timeout: setTimeout(() => {
          this.toast.show = false
        }, 3000)
      }
    },
    
    createCollection() {
      this.modal = {
        show: true,
        isEdit: false,
        form: {
          id: null,
          name: '',
          desc: '',
          status: 'active'
        }
      }
    },
    
    editCollection(collection) {
      this.modal = {
        show: true,
        isEdit: true,
        form: {
          id: collection.id,
          name: collection.name,
          desc: collection.desc,
          status: collection.status
        }
      }
    },
    
    saveCollection() {
      if (!this.modal.form.name.trim()) {
        this.showToast(this.lang === 'km' ? 'សូមបញ្ចូលឈ្មោះបណ្ដុំ' : 'Please enter collection name', 'error')
        return
      }
      
      if (this.modal.isEdit) {
        // Edit existing collection
        const index = this.collections.findIndex(c => c.id === this.modal.form.id)
        if (index !== -1) {
          this.collections[index] = {
            ...this.collections[index],
            name: this.modal.form.name,
            desc: this.modal.form.desc,
            status: this.modal.form.status
          }
          this.showToast(this.lang === 'km' ? 'បណ្ដុំត្រូវបានកែប្រែ' : 'Collection updated successfully', 'success')
        }
      } else {
        // Create new collection
        const newCollection = {
          id: Date.now(),
          name: this.modal.form.name,
          desc: this.modal.form.desc || 'No description',
          items: 0,
          status: this.modal.form.status,
          icon: 'bi bi-collection-fill',
          iconBg: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.1)`,
          iconColor: `rgb(${Math.floor(Math.random() * 200) + 55}, ${Math.floor(Math.random() * 200) + 55}, ${Math.floor(Math.random() * 200) + 55})`
        }
        this.collections.unshift(newCollection)
        this.showToast(this.lang === 'km' ? 'បណ្ដុំត្រូវបានបង្កើត' : 'Collection created successfully', 'success')
      }
      
      this.closeModal()
    },
    
    deleteCollection(collection) {
      if (confirm(this.lang === 'km' ? 'តើអ្នកចង់លុបបណ្ដុំនេះមែនទេ?' : 'Are you sure you want to delete this collection?')) {
        const index = this.collections.findIndex(c => c.id === collection.id)
        if (index !== -1) {
          this.collections.splice(index, 1)
          this.showToast(this.lang === 'km' ? 'បណ្ដុំត្រូវបានលុប' : 'Collection deleted', 'error')
        }
      }
    },
    
    closeModal() {
      this.modal.show = false
    }
  }
}
</script>

<style scoped>
/* Custom animations and utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>