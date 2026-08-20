<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {{ lang === 'km' ? 'បណ្ណាល័យមេឌៀ' : 'Media Library' }}
        </h1>
        <p class="text-gray-500 mt-1">
          {{ lang === 'km' ? 'គ្រប់គ្រងរូបភាព វីដេអូ និងឯកសារ' : 'Manage images, videos and files.' }}
        </p>
      </div>
      <button 
        @click="openUploadDialog"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
      >
        <i class="bi bi-cloud-upload text-lg"></i>
        {{ lang === 'km' ? 'បញ្ចូលឯកសារ' : 'Upload Files' }}
      </button>
    </div>

    <!-- Upload Zone -->
    <div 
      @click="openUploadDialog"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
      :class="[
        'border-2 border-dashed rounded-2xl p-10 text-center mb-8 cursor-pointer transition-all duration-200',
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
      ]"
    >
      <i class="bi bi-cloud-upload text-4xl text-gray-400 block mb-3"></i>
      <div class="text-sm font-medium text-gray-700 mb-1">
        {{ lang === 'km' ? 'អូស & ទម្លាក់ឯកសារ' : 'Drag & drop files here' }}
      </div>
      <div class="text-xs text-gray-500">
        {{ lang === 'km' ? 'ឬចុចដើម្បីរុករក' : 'or click to browse' }}
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
        <div class="flex items-center gap-3">
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center"
            :style="{ background: stat.bg }"
          >
            <i :class="stat.icon" class="text-xl" :style="{ color: stat.color }"></i>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ stat.count }}</div>
            <div class="text-xs text-gray-500">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <div class="flex-1 relative">
        <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        <input 
          v-model="searchQuery"
          type="text"
          :placeholder="lang === 'km' ? 'ស្វែងរកឯកសារ…' : 'Search files…'"
          class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />
      </div>
      
      <select 
        v-model="selectedType"
        class="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
      >
        <option value="all">{{ lang === 'km' ? 'ប្រភេទទាំងអស់' : 'All Types' }}</option>
        <option value="image">{{ lang === 'km' ? 'រូបភាព' : 'Images' }}</option>
        <option value="video">{{ lang === 'km' ? 'វីដេអូ' : 'Videos' }}</option>
        <option value="document">{{ lang === 'km' ? 'ឯកសារ' : 'Documents' }}</option>
        <option value="archive">{{ lang === 'km' ? 'ផ្ទុក' : 'Archives' }}</option>
      </select>
      
      <select 
        v-model="sortBy"
        class="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
      >
        <option value="newest">{{ lang === 'km' ? 'ថ្មីបំផុត' : 'Newest' }}</option>
        <option value="oldest">{{ lang === 'km' ? 'ចាស់បំផុត' : 'Oldest' }}</option>
        <option value="largest">{{ lang === 'km' ? 'ធំបំផុត' : 'Largest' }}</option>
        <option value="name">{{ lang === 'km' ? 'ឈ្មោះ A-Z' : 'Name A-Z' }}</option>
      </select>
      
      <div class="flex gap-2">
        <button 
          @click="viewMode = 'grid'"
          :class="[
            'px-4 py-2.5 rounded-xl border transition-all',
            viewMode === 'grid' ? 'border-blue-500 text-blue-500 bg-blue-50' : 'border-gray-300 text-gray-500 hover:bg-gray-50'
          ]"
          :title="lang === 'km' ? 'មើលជាក្រឡា' : 'Grid view'"
        >
          <i class="bi bi-grid-fill"></i>
        </button>
        <button 
          @click="viewMode = 'list'"
          :class="[
            'px-4 py-2.5 rounded-xl border transition-all',
            viewMode === 'list' ? 'border-blue-500 text-blue-500 bg-blue-50' : 'border-gray-300 text-gray-500 hover:bg-gray-50'
          ]"
          :title="lang === 'km' ? 'មើលជាបញ្ជី' : 'List view'"
        >
          <i class="bi bi-list-ul"></i>
        </button>
      </div>
    </div>

    <!-- Media Grid View -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div 
        v-for="file in filteredAndSortedFiles" 
        :key="file.id"
        class="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <!-- Thumbnail -->
        <div 
          class="h-48 flex items-center justify-center relative overflow-hidden"
          :style="{ background: file.type === 'image' ? `linear-gradient(135deg, ${file.color}22, ${file.color}44)` : '#f9fafb' }"
        >
          <i :class="file.icon" class="text-5xl" :style="{ color: file.color }"></i>
          
          <!-- Overlay Actions -->
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
            <button 
              @click="viewFile(file)"
              class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition flex items-center justify-center text-white"
              :title="lang === 'km' ? 'មើល' : 'View'"
            >
              <i class="bi bi-eye-fill text-lg"></i>
            </button>
            <button 
              @click="downloadFile(file)"
              class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition flex items-center justify-center text-white"
              :title="lang === 'km' ? 'ទាញយក' : 'Download'"
            >
              <i class="bi bi-download text-lg"></i>
            </button>
            <button 
              @click="deleteFile(file)"
              class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-red-500/80 transition flex items-center justify-center text-white"
              :title="lang === 'km' ? 'លុប' : 'Delete'"
            >
              <i class="bi bi-trash-fill text-lg"></i>
            </button>
          </div>
        </div>
        
        <!-- Info -->
        <div class="p-4">
          <div class="font-medium text-gray-900 text-sm truncate mb-1">{{ file.name }}</div>
          <div class="text-xs text-gray-500 flex items-center gap-2">
            <span>{{ file.size }}</span>
            <span>·</span>
            <span>{{ file.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Media List View -->
    <div v-else class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ lang === 'km' ? 'ឯកសារ' : 'File' }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ lang === 'km' ? 'ប្រភេទ' : 'Type' }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ lang === 'km' ? 'ទំហំ' : 'Size' }}</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ lang === 'km' ? 'កាលបរិច្ឆេទ' : 'Date' }}</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{{ lang === 'km' ? 'សកម្មភាព' : 'Actions' }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="file in filteredAndSortedFiles" :key="file.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center" :style="{ background: `${file.color}22` }">
                    <i :class="file.icon" :style="{ color: file.color }"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-900">{{ file.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm text-gray-600">{{ getFileTypeLabel(file.type) }}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ file.size }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ file.date }}</td>
              <td class="px-6 py-4 text-right">
                <div class="flex gap-2 justify-end">
                  <button @click="viewFile(file)" class="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition">
                    <i class="bi bi-eye-fill"></i>
                  </button>
                  <button @click="downloadFile(file)" class="p-1.5 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 transition">
                    <i class="bi bi-download"></i>
                  </button>
                  <button @click="deleteFile(file)" class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredAndSortedFiles.length === 0" class="text-center py-12">
      <i class="bi bi-folder2-open text-6xl text-gray-300 mb-4 block"></i>
      <p class="text-gray-500">{{ lang === 'km' ? 'រកមិនឃើញឯកសារ' : 'No files found' }}</p>
    </div>

    <!-- Upload Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="uploadModal.show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="closeUploadModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full">
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">
              {{ lang === 'km' ? 'បញ្ចូលឯកសារ' : 'Upload Files' }}
            </h3>
            
            <div 
              @dragover.prevent="isUploadDragging = true"
              @dragleave="isUploadDragging = false"
              @drop.prevent="handleUploadDrop"
              :class="[
                'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all mb-4',
                isUploadDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              ]"
              @click="triggerFileInput"
            >
              <i class="bi bi-cloud-upload text-3xl text-gray-400 mb-2 block"></i>
              <p class="text-sm text-gray-600">{{ lang === 'km' ? 'ចុច ឬអូសឯកសារមកទីនេះ' : 'Click or drag files here' }}</p>
              <input type="file" ref="fileInput" multiple class="hidden" @change="handleFileSelect">
            </div>
            
            <div v-if="uploadModal.files.length > 0" class="space-y-2 mb-4 max-h-64 overflow-y-auto">
              <div v-for="(file, index) in uploadModal.files" :key="index" class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-2 flex-1">
                  <i class="bi bi-file-earmark text-gray-500"></i>
                  <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                </div>
                <span class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</span>
                <button @click="removeUploadFile(index)" class="ml-2 text-red-500 hover:text-red-700">
                  <i class="bi bi-x-lg text-xs"></i>
                </button>
              </div>
            </div>
            
            <div class="flex gap-3">
              <button @click="closeUploadModal" class="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition">
                {{ lang === 'km' ? 'បោះបង់' : 'Cancel' }}
              </button>
              <button @click="uploadFiles" :disabled="uploadModal.files.length === 0" class="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition shadow-sm">
                {{ lang === 'km' ? 'ផ្ទុកឡើង' : 'Upload' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

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

    <!-- Preview Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="previewModal.show" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" @click.self="closePreviewModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-900">{{ previewModal.file?.name }}</h3>
              <button @click="closePreviewModal" class="text-gray-400 hover:text-gray-600">
                <i class="bi bi-x-lg text-xl"></i>
              </button>
            </div>
            <div class="flex items-center justify-center min-h-[300px] bg-gray-100 rounded-xl">
              <i :class="previewModal.file?.icon" class="text-8xl" :style="{ color: previewModal.file?.color }"></i>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">{{ lang === 'km' ? 'ទំហំ' : 'Size' }}:</span>
                <span class="ml-2 text-gray-900">{{ previewModal.file?.size }}</span>
              </div>
              <div>
                <span class="text-gray-500">{{ lang === 'km' ? 'ប្រភេទ' : 'Type' }}:</span>
                <span class="ml-2 text-gray-900">{{ getFileTypeLabel(previewModal.file?.type) }}</span>
              </div>
              <div>
                <span class="text-gray-500">{{ lang === 'km' ? 'កាលបរិច្ឆេទ' : 'Date' }}:</span>
                <span class="ml-2 text-gray-900">{{ previewModal.file?.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'MediaLibrary',
  data() {
    return {
      lang: 'en',
      viewMode: 'grid',
      searchQuery: '',
      selectedType: 'all',
      sortBy: 'newest',
      isDragging: false,
      isUploadDragging: false,
      mediaFiles: [
        {
          id: 1,
          name: 'mountain-landscape.jpg',
          type: 'image',
          size: '2.4 MB',
          date: '2024-01-15',
          icon: 'bi bi-image-fill',
          color: '#4f8eff'
        },
        {
          id: 2,
          name: 'product-tour.mp4',
          type: 'video',
          size: '15.2 MB',
          date: '2024-01-14',
          icon: 'bi bi-camera-video-fill',
          color: '#ff5e7d'
        },
        {
          id: 3,
          name: 'annual-report.pdf',
          type: 'document',
          size: '1.8 MB',
          date: '2024-01-13',
          icon: 'bi bi-file-earmark-pdf-fill',
          color: '#f5b731'
        },
        {
          id: 4,
          name: 'project-assets.zip',
          type: 'archive',
          size: '8.3 MB',
          date: '2024-01-12',
          icon: 'bi bi-file-zip-fill',
          color: '#36e8b5'
        },
        {
          id: 5,
          name: 'presentation-slides.pptx',
          type: 'document',
          size: '3.2 MB',
          date: '2024-01-11',
          icon: 'bi bi-file-earmark-ppt-fill',
          color: '#ff9f4a'
        },
        {
          id: 6,
          name: 'background-pattern.png',
          type: 'image',
          size: '456 KB',
          date: '2024-01-10',
          icon: 'bi bi-image-fill',
          color: '#8b5cf6'
        }
      ],
      stats: [
        { icon: 'bi bi-image', bg: 'rgba(79,142,255,0.12)', color: '#4f8eff', count: 8, label: 'Images' },
        { icon: 'bi bi-camera-video-fill', bg: 'rgba(255,94,125,0.12)', color: '#ff5e7d', count: 1, label: 'Videos' },
        { icon: 'bi bi-file-earmark-fill', bg: 'rgba(245,183,49,0.12)', color: '#f5b731', count: 2, label: 'Documents' },
        { icon: 'bi bi-file-zip-fill', bg: 'rgba(54,232,181,0.12)', color: '#36e8b5', count: 2, label: 'Archives' }
      ],
      toast: {
        show: false,
        message: '',
        type: 'info',
        timeout: null
      },
      uploadModal: {
        show: false,
        files: []
      },
      previewModal: {
        show: false,
        file: null
      }
    }
  },
  computed: {
    filteredAndSortedFiles() {
      let filtered = this.mediaFiles.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesType = this.selectedType === 'all' || file.type === this.selectedType
        return matchesSearch && matchesType
      })
      
      switch(this.sortBy) {
        case 'newest':
          return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
        case 'oldest':
          return filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
        case 'largest':
          return filtered.sort((a, b) => parseFloat(b.size) - parseFloat(a.size))
        case 'name':
          return filtered.sort((a, b) => a.name.localeCompare(b.name))
        default:
          return filtered
      }
    }
  },
  methods: {
    getFileTypeLabel(type) {
      const labels = {
        image: this.lang === 'km' ? 'រូបភាព' : 'Image',
        video: this.lang === 'km' ? 'វីដេអូ' : 'Video',
        document: this.lang === 'km' ? 'ឯកសារ' : 'Document',
        archive: this.lang === 'km' ? 'ផ្ទុក' : 'Archive'
      }
      return labels[type] || type
    },
    
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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
    
    openUploadDialog() {
      this.uploadModal.show = true
      this.uploadModal.files = []
    },
    
    closeUploadModal() {
      this.uploadModal.show = false
      this.uploadModal.files = []
      this.isUploadDragging = false
    },
    
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    
    handleFileSelect(event) {
      const files = Array.from(event.target.files)
      this.uploadModal.files.push(...files)
    },
    
    handleUploadDrop(event) {
      this.isUploadDragging = false
      const files = Array.from(event.dataTransfer.files)
      this.uploadModal.files.push(...files)
    },
    
    handleDrop(event) {
      this.isDragging = false
      const files = Array.from(event.dataTransfer.files)
      this.uploadModal.files = files
      this.uploadModal.show = true
    },
    
    removeUploadFile(index) {
      this.uploadModal.files.splice(index, 1)
    },
    
    uploadFiles() {
      this.uploadModal.files.forEach(file => {
        const extension = file.name.split('.').pop().toLowerCase()
        let type = 'document'
        let icon = 'bi bi-file-earmark-fill'
        let color = '#f5b731'
        
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
          type = 'image'
          icon = 'bi bi-image-fill'
          color = '#4f8eff'
        } else if (['mp4', 'webm', 'mov'].includes(extension)) {
          type = 'video'
          icon = 'bi bi-camera-video-fill'
          color = '#ff5e7d'
        } else if (['zip', 'rar', '7z'].includes(extension)) {
          type = 'archive'
          icon = 'bi bi-file-zip-fill'
          color = '#36e8b5'
        }
        
        const newFile = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: type,
          size: this.formatFileSize(file.size),
          date: new Date().toISOString().split('T')[0],
          icon: icon,
          color: color
        }
        
        this.mediaFiles.unshift(newFile)
        
        // Update stats
        const statIndex = this.stats.findIndex(s => s.label.toLowerCase() === type + 's')
        if (statIndex !== -1) {
          this.stats[statIndex].count++
        }
      })
      
      this.showToast(this.lang === 'km' ? `បានផ្ទុក ${this.uploadModal.files.length} ឯកសារ` : `${this.uploadModal.files.length} file(s) uploaded`, 'success')
      this.closeUploadModal()
    },
    
    viewFile(file) {
      this.previewModal.file = file
      this.previewModal.show = true
    },
    
    closePreviewModal() {
      this.previewModal.show = false
      this.previewModal.file = null
    },
    
    downloadFile(file) {
      this.showToast(this.lang === 'km' ? `កំពុងទាញយក ${file.name}` : `Downloading ${file.name}...`, 'info')
    },
    
    deleteFile(file) {
      if (confirm(this.lang === 'km' ? 'តើអ្នកចង់លុបឯកសារនេះមែនទេ?' : 'Are you sure you want to delete this file?')) {
        const index = this.mediaFiles.findIndex(f => f.id === file.id)
        if (index !== -1) {
          this.mediaFiles.splice(index, 1)
          
          // Update stats
          const statIndex = this.stats.findIndex(s => s.label.toLowerCase() === file.type + 's')
          if (statIndex !== -1) {
            this.stats[statIndex].count--
          }
          
          this.showToast(this.lang === 'km' ? 'ឯកសារត្រូវបានលុប' : 'File deleted', 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
