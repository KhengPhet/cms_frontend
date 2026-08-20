<template>
  <header
    class="topbar flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm sticky top-0 z-40 transition-all duration-300"
  >
    <!-- LEFT SECTION -->
    <div class="flex items-center gap-4">
      <!-- Mobile Menu Toggle Button -->
      <button
        class="lg:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        @click="$emit('toggleSidebar')"
      >
        <i class="bi bi-list text-xl"></i>
      </button>

      <!-- Enhanced Search Bar -->
      <div class="hidden md:flex items-center relative">
        <div class="relative">
          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <i class="bi bi-search text-base"></i>
          </div>
          <input
            v-model="search"
            @input="handleSearch"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
            type="text"
            placeholder="Search anything... (Ctrl + K)"
            class="pl-10 pr-4 py-2.5 w-80 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 text-sm"
          />
          <div
            class="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex gap-1"
          >
            <kbd
              class="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs text-slate-500 font-mono"
              >⌘</kbd
            >
            <kbd
              class="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs text-slate-500 font-mono"
              >K</kbd
            >
          </div>
        </div>

        <!-- Search Results Dropdown -->
        <transition name="dropdown">
          <div
            v-if="searchResults.length > 0 && search"
            class="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
          >
            <div class="p-2">
              <div
                class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider"
              >
                Recent searches
              </div>
              <div
                v-for="result in searchResults"
                :key="result.id"
                class="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center"
                >
                  <i :class="result.icon" class="text-indigo-500 text-sm"></i>
                </div>
                <div class="flex-1">
                  <div class="text-sm font-medium text-slate-700">
                    {{ result.title }}
                  </div>
                  <div class="text-xs text-slate-400">{{ result.type }}</div>
                </div>
                <i class="bi bi-arrow-right text-slate-300 text-sm"></i>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Breadcrumb / Page Title (optional) -->
      <div class="hidden lg:block h-6 w-px bg-slate-200"></div>
      <div class="hidden lg:block">
        <h2 class="text-sm font-semibold text-slate-600">Dashboard</h2>
      </div>
    </div>

    <!-- RIGHT SECTION -->
    <div class="flex items-center gap-3">
      <!-- Visit CMS Site -->
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        class="hidden sm:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
      >
        <i class="bi bi-globe text-base"></i>
        <span>Visit CMS</span>
        <i class="bi bi-box-arrow-up-right text-xs opacity-70"></i>
      </a>

      <!-- Theme Toggle - Enhanced with animations -->
      <div class="relative">
        <div class="flex bg-slate-100 rounded-xl p-1 gap-1 shadow-inner">
          <button
            @click="setTheme('light')"
            :class="themeBtn('light')"
            class="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
          >
            <i class="bi bi-sun-fill text-base"></i>
            <span
              v-if="theme === 'light'"
              class="absolute inset-0 rounded-lg bg-white shadow-sm -z-0 animate-scale"
            ></span>
          </button>
          <button
            @click="setTheme('dark')"
            :class="themeBtn('dark')"
            class="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
          >
            <i class="bi bi-moon-stars-fill text-base"></i>
            <span
              v-if="theme === 'dark'"
              class="absolute inset-0 rounded-lg bg-white shadow-sm -z-0 animate-scale"
            ></span>
          </button>
          <button
            @click="setTheme('system')"
            :class="themeBtn('system')"
            class="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
          >
            <i class="bi bi-display text-base"></i>
            <span
              v-if="theme === 'system'"
              class="absolute inset-0 rounded-lg bg-white shadow-sm -z-0 animate-scale"
            ></span>
          </button>
        </div>
      </div>

      <!-- Language Dropdown - Enhanced -->
      <div class="relative" ref="langDropdownContainer">
        <button
          @click="toggleLangDropdown"
          class="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 rounded-xl px-3 py-2 text-sm transition-all duration-200 group"
        >
          <div class="relative">
            <img
              :src="currentLang.flag"
              class="w-5 h-5 object-cover rounded-full shadow-sm"
              :alt="currentLang.label"
            />
            <div
              class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"
            ></div>
          </div>
          <span class="font-medium text-slate-700">{{
            currentLang.short
          }}</span>
          <i
            class="bi bi-chevron-down text-xs text-slate-400 transition-transform duration-200"
            :class="{ 'rotate-180': langOpen }"
          ></i>
        </button>

        <!-- Dropdown Menu -->
        <transition name="dropdown">
          <div
            v-if="langOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
          >
            <div class="p-1">
              <div
                class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100"
              >
                Select Language
              </div>
              <button
                v-for="item in langs"
                :key="item.value"
                @click="selectLang(item)"
                class="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-slate-50 transition-colors group"
              >
                <div class="flex items-center gap-3">
                  <img
                    :src="item.flag"
                    class="w-5 h-5 object-cover rounded-full shadow-sm"
                  />
                  <span class="text-slate-700 group-hover:text-indigo-600">{{
                    item.label
                  }}</span>
                </div>
                <i
                  v-if="lang === item.value"
                  class="bi bi-check-circle-fill text-indigo-500 text-xs"
                ></i>
                <i
                  v-else
                  class="bi bi-check text-slate-300 opacity-0 group-hover:opacity-100"
                ></i>
              </button>
            </div>
          </div>
        </transition>
      </div>

      <!-- Notifications - Enhanced -->
      <div class="relative" ref="notifDropdownContainer">
        <button
          class="relative w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 group"
          @click="toggleNotifications"
        >
          <i
            class="bi bi-bell-fill text-slate-600 text-lg group-hover:text-indigo-600 transition-colors"
          ></i>
          <span
            v-if="unreadCount > 0"
            class="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold px-1 animate-pulse"
          >
            {{ unreadCount > 9 ? "9+" : unreadCount }}
          </span>
        </button>

        <!-- Notifications Dropdown -->
        <transition name="dropdown">
          <div
            v-if="notifOpen"
            class="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
          >
            <div
              class="flex items-center justify-between p-4 border-b border-slate-100"
            >
              <div>
                <h3 class="font-semibold text-slate-800">Notifications</h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  You have {{ unreadCount }} unread messages
                </p>
              </div>
              <button
                @click="markAllAsRead"
                class="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Mark all read
              </button>
            </div>

            <div class="max-h-96 overflow-y-auto custom-scroll">
              <div
                v-for="notif in notifications"
                :key="notif.id"
                class="flex gap-3 p-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0"
                :class="{ 'bg-indigo-50/30': !notif.read }"
                @click="markAsRead(notif.id)"
              >
                <div
                  class="w-10 h-10 rounded-xl bg-gradient-to-br"
                  :class="getNotifGradient(notif.type)"
                >
                  <div class="w-full h-full flex items-center justify-center">
                    <i
                      :class="getNotifIcon(notif.type)"
                      class="text-white text-sm"
                    ></i>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-slate-700">
                    {{ notif.title }}
                  </p>
                  <p class="text-xs text-slate-500 mt-0.5">
                    {{ notif.message }}
                  </p>
                  <p class="text-xs text-slate-400 mt-1">{{ notif.time }}</p>
                </div>
                <div
                  v-if="!notif.read"
                  class="w-2 h-2 bg-indigo-500 rounded-full mt-1"
                ></div>
              </div>
            </div>

            <div class="p-3 border-t border-slate-100 text-center">
              <button
                class="text-xs text-slate-500 hover:text-indigo-600 font-medium"
              >
                View all notifications
              </button>
            </div>
          </div>
        </transition>
      </div>

      <!-- User Profile - Enhanced -->
      <div class="relative" ref="userDropdownContainer">
        <button
          @click="toggleUserMenu"
          class="flex items-center gap-3 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 transition-all duration-200 group"
        >
          <div class="relative">
            <div
              class="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center"
            >
              <img
                v-if="user.thumbnail"
                :src="getImageUrl(user.thumbnail)"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
              <span
                v-else
                class="flex items-center justify-center w-full h-full text-white font-bold text-sm"
              >
                {{ user.name?.charAt(0).toUpperCase() || "U" }}
              </span>
            </div>
            <div
              class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"
            ></div>
          </div>
          <div class="hidden sm:block text-left">
            <div class="text-sm font-semibold text-slate-700">
              {{ user.name || "Loading..." }}
            </div>
            <div class="text-xs text-slate-400 capitalize">
              {{ user.role || "User" }}
            </div>
          </div>
          <i
            class="bi bi-chevron-down text-xs text-slate-400 transition-transform duration-200"
            :class="{ 'rotate-180': userMenuOpen }"
          ></i>
        </button>

        <!-- User Menu Dropdown -->
        <transition name="dropdown">
          <div
            v-if="userMenuOpen"
            class="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
          >
            <div
              class="p-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-slate-50"
            >
              <div class="flex items-center gap-3">
                <!-- Avatar -->
                <div
                  class="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center"
                >
                  <img
                    v-if="user.thumbnail"
                    :src="getImageUrl(user.thumbnail)"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                  <span v-else class="text-white font-bold text-lg">
                    {{ user.name ? user.name.charAt(0).toUpperCase() : "U" }}
                  </span>
                </div>

                <!-- Info -->
                <div>
                  <div class="font-semibold text-slate-800">
                    {{ user.name || "User" }}
                  </div>
                  <div class="text-xs text-slate-500">
                    {{ user.email || "No email" }}
                  </div>
                  <div class="text-xs text-indigo-600 mt-0.5 capitalize">
                    {{ user.role || "User" }}
                  </div>
                </div>
              </div>
            </div>

            <div class="p-2">
              <button
                @click="goProfile"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700"
              >
                <i class="bi bi-person-circle text-lg text-slate-400"></i>
                <span class="text-sm">Your Profile</span>
              </button>
              <button
                @click="navigateTo('/settings')"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700"
              >
                <i class="bi bi-gear text-lg text-slate-400"></i>
                <span class="text-sm">Account Settings</span>
              </button>
              <button
                @click="navigateTo('/analytics')"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700"
              >
                <i class="bi bi-graph-up text-lg text-slate-400"></i>
                <span class="text-sm">Analytics</span>
              </button>
              <div class="border-t border-slate-100 my-1"></div>
              <button
                @click="handleLogout"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-red-600"
              >
                <i class="bi bi-box-arrow-right text-lg"></i>
                <span class="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import userAPI from "../../services/user";
import { SERVER_BASE } from "../../services/imageUrl";

/* ================= PROPS & EMITS ================= */
const emit = defineEmits(["toggleSidebar", "search", "theme-change"]);

/* ================= STATE ================= */
const search = ref("");
const searchFocused = ref(false);
const theme = ref("light");
const lang = ref("en");
const langOpen = ref(false);
const notifOpen = ref(false);
const userMenuOpen = ref(false);
const unreadCount = ref(3);
const searchResults = ref([]);

// Refs for dropdown containers
const langDropdownContainer = ref(null);
const notifDropdownContainer = ref(null);
const userDropdownContainer = ref(null);

const router = useRouter();

const getImageUrl = (file) => {
  if (!file) return null;
  if (file.startsWith("http")) return file;

  return `${SERVER_BASE}/uploads/posts/${file}`;
};

// User data
const user = ref({
  name: "",
  email: "",
  role: "",
  thumbnail: null,
});

/* ================= LANGUAGE DATA ================= */
const langs = [
  {
    value: "en",
    label: "English",
    short: "EN",
    flag: "https://flagcdn.com/w40/us.png",
  },
  {
    value: "km",
    label: "ខ្មែរ",
    short: "KH",
    flag: "https://flagcdn.com/w40/kh.png",
  },
];

/* ================= NOTIFICATIONS DATA ================= */
const notifications = ref([
  {
    id: 1,
    title: "New comment on your post",
    message: "Sarah commented on 'Getting Started with Vue 3'",
    time: "5 minutes ago",
    type: "comment",
    read: false,
  },
  {
    id: 2,
    title: "System update completed",
    message: "CMS v2.4.0 has been successfully deployed",
    time: "1 hour ago",
    type: "system",
    read: false,
  },
  {
    id: 3,
    title: "New author registered",
    message: "James Carter joined as an Author",
    time: "3 hours ago",
    type: "user",
    read: false,
  },
  {
    id: 4,
    title: "Weekly report ready",
    message: "Your content performance report is available",
    time: "Yesterday",
    type: "report",
    read: true,
  },
]);

/* ================= COMPUTED ================= */
const currentLang = computed(
  () => langs.find((l) => l.value === lang.value) || langs[0]
);

/* ================= METHODS ================= */
const handleSearch = () => {
  if (search.value.trim()) {
    searchResults.value = [
      { id: 1, title: search.value, type: "Content", icon: "bi-file-text" },
      {
        id: 2,
        title: "Search results for " + search.value,
        type: "Authors",
        icon: "bi-people",
      },
    ];
  } else {
    searchResults.value = [];
  }
  emit("search", search.value);
};

const setTheme = (t) => {
  theme.value = t;

  if (t === "dark") {
    document.documentElement.classList.add("dark");
  } else if (t === "light") {
    document.documentElement.classList.remove("dark");
  } else if (t === "system") {
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (systemDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  localStorage.setItem("theme", t);
  emit("theme-change", t);
};

const themeBtn = (t) => [
  "relative",
  theme.value === t
    ? "bg-white text-indigo-600 shadow-sm"
    : "text-slate-500 hover:text-slate-700",
];

const toggleLangDropdown = () => {
  langOpen.value = !langOpen.value;
  if (notifOpen.value) notifOpen.value = false;
  if (userMenuOpen.value) userMenuOpen.value = false;
};

// translate language and trigger Google Translate
const selectLang = (item) => {
  lang.value = item.value;
  langOpen.value = false;

  // save language
  localStorage.setItem("lang", item.value);

  // apply translate
  applyLanguage(item.value);
};
const toggleNotifications = () => {
  notifOpen.value = !notifOpen.value;
  if (langOpen.value) langOpen.value = false;
  if (userMenuOpen.value) userMenuOpen.value = false;
};

const applyLanguage = (langCode) => {
  const trySet = () => {
    const select = document.querySelector(".goog-te-combo");

    if (!select) return false;

    select.value = langCode;
    select.dispatchEvent(new Event("change"));
    return true;
  };

  // try immediately
  if (trySet()) return;

  // retry if not ready
  let attempts = 0;
  const interval = setInterval(() => {
    if (trySet() || attempts > 10) {
      clearInterval(interval);
    }
    attempts++;
  }, 300);
};

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value;
  if (langOpen.value) langOpen.value = false;
  if (notifOpen.value) notifOpen.value = false;
};

const markAsRead = (id) => {
  const notif = notifications.value.find((n) => n.id === id);
  if (notif && !notif.read) {
    notif.read = true;
    unreadCount.value = notifications.value.filter((n) => !n.read).length;
  }
};

const markAllAsRead = () => {
  notifications.value.forEach((n) => (n.read = true));
  unreadCount.value = 0;
};

const getNotifGradient = (type) => {
  const gradients = {
    comment: "from-blue-500 to-blue-600",
    system: "from-purple-500 to-purple-600",
    user: "from-emerald-500 to-emerald-600",
    report: "from-orange-500 to-orange-600",
  };
  return gradients[type] || "from-indigo-500 to-indigo-600";
};

const getNotifIcon = (type) => {
  const icons = {
    comment: "bi-chat-dots-fill",
    system: "bi-gear-fill",
    user: "bi-person-plus-fill",
    report: "bi-bar-chart-fill",
  };
  return icons[type] || "bi-bell-fill";
};

const navigateTo = (path) => {
  userMenuOpen.value = false;
  router.push(path);
};

const goProfile = () => {
  userMenuOpen.value = false;
  router.push("/admin/profile");
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/auth/login");
};

const handleImageError = (e) => {
  e.target.style.display = "none";
  // Optionally show fallback
  const parent = e.target.parentElement;
  if (parent) {
    const fallback = document.createElement("span");
    fallback.className =
      "flex items-center justify-center w-full h-full text-white font-bold text-sm";
    fallback.textContent = user.value.name?.charAt(0).toUpperCase() || "U";
    parent.appendChild(fallback);
  }
};

/* ================= FETCH USER PROFILE ================= */
const fetchUserProfile = async () => {
  try {
    const profile = await userAPI.getProfile();
    console.log(profile);

    user.value = {
      name: profile.name,
      email: profile.email,
      role: profile.role,
      thumbnail: profile.thumbnail || null,
    };

    localStorage.setItem("user", JSON.stringify(profile));
  } catch (err) {
    console.error("Failed to fetch user profile:", err);
  }
};

/* ================= CLICK OUTSIDE HANDLER ================= */
const handleClickOutside = (e) => {
  // Check for language dropdown
  if (
    langOpen.value &&
    langDropdownContainer.value &&
    !langDropdownContainer.value.contains(e.target)
  ) {
    langOpen.value = false;
  }
  // Check for notifications dropdown
  if (
    notifOpen.value &&
    notifDropdownContainer.value &&
    !notifDropdownContainer.value.contains(e.target)
  ) {
    notifOpen.value = false;
  }
  // Check for user menu dropdown
  if (
    userMenuOpen.value &&
    userDropdownContainer.value &&
    !userDropdownContainer.value.contains(e.target)
  ) {
    userMenuOpen.value = false;
  }
};

/* ================= KEYBOARD SHORTCUTS ================= */
const handleKeyboardShortcuts = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) searchInput.focus();
  }
  if (e.key === "Escape") {
    langOpen.value = false;
    notifOpen.value = false;
    userMenuOpen.value = false;
    searchFocused.value = false;
  }
};

/* ================= LIFECYCLE ================= */
onMounted(() => {
  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  // Fetch user profile
  fetchUserProfile();

  // Add event listeners
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("keydown", handleKeyboardShortcuts);

  // Update unread count
  unreadCount.value = notifications.value.filter((n) => !n.read).length;

  // language
  const savedLang = localStorage.getItem("lang");
  if (savedLang) {
    lang.value = savedLang;

    setTimeout(() => {
      applyLanguage(savedLang);
    }, 100);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("keydown", handleKeyboardShortcuts);
});

// Watch for system theme changes
if (window.matchMedia) {
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  darkModeMediaQuery.addEventListener("change", (e) => {
    if (theme.value === "system") {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  });
}
</script>

<style scoped>
/* Custom Animations */
@keyframes scale {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale {
  animation: scale 0.2s ease-out;
}

/* Dropdown Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom Scrollbar */
.custom-scroll::-webkit-scrollbar {
  width: 4px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Topbar Styling */
.topbar {
  transition: all 0.3s ease;
}

/* Dark Mode Styles */
:global(.dark) .topbar {
  background: rgba(15, 23, 42, 0.9);
  border-color: rgba(51, 65, 85, 0.8);
}

:global(.dark) input {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(51, 65, 85, 0.8);
  color: #e2e8f0;
}

:global(.dark) input::placeholder {
  color: #64748b;
}

:global(.dark) .bg-slate-100 {
  background: #1e293b;
}

:global(.dark) .bg-slate-50 {
  background: #0f172a;
}

:global(.dark) .text-slate-700 {
  color: #e2e8f0;
}

:global(.dark) .text-slate-600 {
  color: #cbd5e1;
}

:global(.dark) .text-slate-500 {
  color: #94a3b8;
}

:global(.dark) .border-slate-200 {
  border-color: #334155;
}
</style>