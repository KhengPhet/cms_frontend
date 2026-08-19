<template>
  <header class="w-full bg-gradient-to-r from-gray-950 to-gray-900 text-white shadow-lg sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto h-16 md:h-20 flex items-center justify-between px-4 sm:px-6">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 md:gap-3 group">
        <div class="relative">
          <img
            src="/etec.png"
            alt="ETEC Logo"
            class="w-[45px] h-[45px] md:w-[60px] md:h-[60px] object-contain transition-transform group-hover:scale-105 duration-300"
          />
          <!-- <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div> -->
        </div>
        <div class="flex flex-col">
          <span class="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent tracking-wide">
            ETEC NEWS
          </span>
          <span class="text-[10px] md:text-xs text-gray-400 hidden sm:block">ព័ត៌មានថ្មីៗ ទាន់ហេតុការណ៍</span>
        </div>
      </RouterLink>

      <!-- Desktop Menu -->
      <ul class="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold">
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          class="relative group"
        >
          <!-- Main Link -->
          <RouterLink
            :to="item.path"
            class="px-3 xl:px-4 py-2 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 transition duration-300 flex items-center gap-1"
            :class="{ 'text-blue-400 bg-blue-600/10': isActiveRoute(item.path) }"
          >
            {{ item.name }}
            <svg
              v-if="item.submenu.length"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </RouterLink>

          <!-- Dropdown -->
          <transition name="dropdown">
            <div
              v-if="item.submenu.length"
              class="absolute left-0 top-full mt-2 w-56 bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
            >
              <div class="py-2">
                <RouterLink
                  v-for="(sub, i) in item.submenu"
                  :key="i"
                  :to="sub.path"
                  class="block px-5 py-3 hover:bg-blue-600/20 hover:text-blue-400 transition text-sm"
                  :class="{ 'text-blue-400 bg-blue-600/10': isActiveRoute(sub.path) }"
                >
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    {{ sub.name }}
                  </div>
                </RouterLink>
              </div>
            </div>
          </transition>
        </li>
      </ul>

      <!-- Right Section -->
      <div class="flex items-center gap-3">
        <!-- Search -->
        <div class="relative hidden md:block">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ស្វែងរកព័ត៌មាន..."
            class="w-48 lg:w-64 h-9 pl-4 pr-10 rounded-full bg-gray-800/50 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            @keyup.enter="handleSearch"
          />
          <button
            @click="handleSearch"
            class="absolute right-3 top-2 text-gray-400 hover:text-blue-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="!isOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div
        v-if="isOpen"
        class="lg:hidden bg-gray-900/95 backdrop-blur-sm border-t border-gray-800"
      >
        <div class="max-w-7xl mx-auto px-4 py-4 space-y-3 font-medium">
          <!-- Search in Mobile -->
          <div class="relative mb-4 md:hidden">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ស្វែងរកព័ត៌មាន..."
              class="w-full h-10 pl-4 pr-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              @keyup.enter="handleSearch"
            />
            <button
              @click="handleSearch"
              class="absolute right-3 top-2.5 text-gray-400 hover:text-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
              </svg>
            </button>
          </div>

          <div v-for="(item, index) in menuItems" :key="index">
            <!-- Main Link (No Submenu) -->
            <RouterLink
              v-if="!item.submenu.length"
              :to="item.path"
              class="block py-3 border-b border-gray-800 hover:text-blue-400 transition"
              @click="isOpen = false"
            >
              {{ item.name }}
            </RouterLink>

            <!-- Has Submenu -->
            <div
              v-else
              @click="toggleSubmenu(index)"
              class="flex justify-between items-center cursor-pointer py-3 border-b border-gray-800 hover:text-blue-400 transition"
            >
              {{ item.name }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 transition-transform duration-300"
                :class="{ 'rotate-180': openSubmenu === index }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <!-- Submenu -->
            <transition name="submenu">
              <div
                v-if="openSubmenu === index"
                class="pl-6 mt-2 space-y-2 text-sm text-gray-400 pb-2"
              >
                <RouterLink
                  v-for="(sub, i) in item.submenu"
                  :key="i"
                  :to="sub.path"
                  class="block py-2 hover:text-blue-400 transition"
                  @click="isOpen = false"
                >
                  {{ sub.name }}
                </RouterLink>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isOpen = ref(false);
const openSubmenu = ref(null);
const searchQuery = ref("");
const isDarkMode = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const toggleSubmenu = (index) => {
  openSubmenu.value = openSubmenu.value === index ? null : index;
};

const isActiveRoute = (path) => {
  if (path === "/") {
    return route.path === path;
  }
  return route.path.startsWith(path);
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/search", query: { q: searchQuery.value } });
    if (isOpen.value) {
      isOpen.value = false;
    }
  }
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

// Load dark mode preference
onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  }
});

const menuItems = [
  { name: "ទំព័រដើម", path: "/", submenu: [] },
  {
    name: "កីឡា",
    path: "/sports",
    submenu: [
      { name: "កីឡាជាតិ", path: "/sports/local" },
      { name: "កីឡាអន្តរជាតិ", path: "/sports/international" },
    ],
  },
  {
    name: "សង្គម",
    path: "/social",
    submenu: [
      { name: "សង្គមជាតិ", path: "/social/local" },
      { name: "សង្គមអន្តរជាតិ", path: "/social/international" },
    ],
  },
  {
    name: "កម្សាន្ត",
    path: "/entertainment",
    submenu: [
      { name: "កម្សាន្តជាតិ", path: "/entertainment/local" },
      { name: "កម្សាន្តអន្តរជាតិ", path: "/entertainment/international" },
    ],
  },
  { name: "ទំនាក់ទំនង", path: "/contact", submenu: [] }
];
</script>

<style scoped>
/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Mobile Menu Animation */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Submenu Animation */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.2s ease;
}
.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

header {
  font-family: "Battambang", sans-serif;
}
</style>