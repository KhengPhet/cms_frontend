<template>
  <footer class="bg-gradient-to-b from-gray-900 to-black text-white pt-12 pb-8 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Top Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 border-b border-white/10 pb-8">

        <!-- Logo Section -->
        <div class="text-center sm:text-left">
          <div class="flex items-center justify-center sm:justify-start gap-3 mb-4">
            <div class="relative">
              <img 
                src="/etec.png" 
                alt="ETEC Logo" 
                class="w-[80px] h-[80px] object-cover rounded-xl bg-white/5 p-2 transition-transform hover:scale-105 duration-300" 
              />
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 class="text-2xl font-black bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                ETEC NEWS
              </h2>
              <p class="text-[10px] text-gray-400">Est. 2024</p>
            </div>
          </div>
          <p class="text-gray-300 text-sm leading-relaxed">
            ព័ត៌មានពិត រហ័សទាន់ចិត្ត និងទុកចិត្តបានសម្រាប់ប្រជាជនកម្ពុជា។
          </p>
          <div class="flex gap-3 mt-4 justify-center sm:justify-start">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.link"
              target="_blank"
              class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110"
            >
              <img :src="social.icon" :alt="social.name" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Categories -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-1 h-6 bg-red-500 rounded-full"></div>
            <h4 class="font-bold text-lg text-red-500 uppercase tracking-wide">ប្រភេទ</h4>
          </div>
          <ul class="space-y-3 text-sm">
            <li v-for="cat in categories" :key="cat.name">
              <RouterLink 
                :to="cat.link" 
                class="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-2 group"
              >
                <span class="w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                {{ cat.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-1 h-6 bg-red-500 rounded-full"></div>
            <h4 class="font-bold text-lg text-red-500 uppercase tracking-wide">ជំនួយ</h4>
          </div>
          <ul class="space-y-3 text-sm">
            <li v-for="item in supports" :key="item">
              <RouterLink 
                :to="getSupportLink(item)" 
                class="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-2 group"
              >
                <span class="w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                {{ item }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-1 h-6 bg-red-500 rounded-full"></div>
            <h4 class="font-bold text-lg text-red-500 uppercase tracking-wide">ព្រឹត្តិបត្រ</h4>
          </div>
          <p class="text-gray-300 text-sm mb-4 leading-relaxed">
            ចុះឈ្មោះដើម្បីទទួលបានព័ត៌មានថ្មីៗបំផុត
          </p>
          <form @submit.prevent="subscribe" class="relative">
            <input
              v-model="email"
              type="email"
              placeholder="អ៊ីមែលរបស់អ្នក"
              class="w-full bg-white/10 border border-white/20 rounded-lg text-sm px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder:text-gray-400 text-white outline-none transition"
              required
            />
            <button
              type="submit"
              :disabled="isSubscribing"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 text-white p-1.5 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg 
                v-if="!isSubscribing"
                xmlns="http://www.w3.org/2000/svg" 
                class="w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <svg 
                v-else
                class="animate-spin w-4 h-4" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </form>
          <p v-if="subscribeMessage" class="text-xs mt-2" :class="subscribeSuccess ? 'text-green-400' : 'text-red-400'">
            {{ subscribeMessage }}
          </p>
        </div>

      </div>

      <!-- Bottom Section -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-center text-gray-400 text-xs">
        <div>
          © {{ new Date().getFullYear() }} ETEC NEWS. All Rights Reserved.
        </div>
        
        <div class="flex gap-6">
          <RouterLink to="/privacy" class="hover:text-red-500 transition-colors">
            គោលការណ៍ឯកជន
          </RouterLink>
          <RouterLink to="/terms" class="hover:text-red-500 transition-colors">
            លក្ខខណ្ឌប្រើប្រាស់
          </RouterLink>
          <RouterLink to="/sitemap" class="hover:text-red-500 transition-colors">
            ផែនទីគេហទំព័រ
          </RouterLink>
        </div>
        
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>012 333 444</span>
          <span class="mx-1">|</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>info@etecnews.com</span>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const email = ref("");
const isSubscribing = ref(false);
const subscribeMessage = ref("");
const subscribeSuccess = ref(false);

const categories = [
  { name: "ទំព័រដើម", link: "/" },
  { name: "កីឡា", link: "/sports" },
  { name: "សង្គម", link: "/social" },
  { name: "កម្សាន្ត", link: "/entertainment" },
  { name: "ទំនាក់ទំនង", link: "/contact" },
];

const supports = [
  "អំពីយើង",
  "ទំនាក់ទំនង",
  "គោលការណ៍ឯកជនភាព",
  "ផ្សព្វផ្សាយពាណិជ្ជកម្ម",
];

const socialLinks = [
  { name: "Facebook", icon: "/facebook.png", link: "https://facebook.com" },
  { name: "YouTube", icon: "/youtube.png", link: "https://youtube.com" },
  { name: "Instagram", icon: "/Instagram.png", link: "https://instagram.com" },
  { name: "Telegram", icon: "/Telegram.png", link: "https://t.me" },
  { name: "TikTok", icon: "/TikTok.png", link: "https://tiktok.com" },
];

const getSupportLink = (item) => {
  const links = {
    "អំពីយើង": "/about",
    "ទំនាក់ទំនង": "/contact",
    "គោលការណ៍ឯកជនភាព": "/privacy",
    "ផ្សព្វផ្សាយពាណិជ្ជកម្ម": "/advertise",
  };
  return links[item] || "#";
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return re.test(email);
};

const subscribe = async () => {
  if (!email.value.trim()) {
    subscribeMessage.value = "សូមបញ្ចូលអ៊ីមែលរបស់អ្នក";
    subscribeSuccess.value = false;
    setTimeout(() => {
      subscribeMessage.value = "";
    }, 3000);
    return;
  }
  
  if (!validateEmail(email.value)) {
    subscribeMessage.value = "សូមបញ្ចូលអ៊ីមែលឱ្យបានត្រឹមត្រូវ";
    subscribeSuccess.value = false;
    setTimeout(() => {
      subscribeMessage.value = "";
    }, 3000);
    return;
  }
  
  isSubscribing.value = true;
  
  // Simulate API call
  setTimeout(() => {
    console.log(`Subscribed: ${email.value}`);
    subscribeMessage.value = "បានចុះឈ្មោះជោគជ័យ! សូមអរគុណ";
    subscribeSuccess.value = true;
    email.value = "";
    isSubscribing.value = false;
    
    setTimeout(() => {
      subscribeMessage.value = "";
    }, 3000);
  }, 1000);
};
</script>

<style scoped>
footer {
  font-family: 'Battambang', sans-serif;
}

/* Smooth hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Animation for pulse */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>