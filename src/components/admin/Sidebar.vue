<template>
  <aside
    class="sidebar-container fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-2xl transition-all duration-300 z-30"
    :class="isCollapsed ? 'w-20' : 'w-72'"
  >
    <!-- Brand Section - Enhanced with logo animation -->
    <div
      class="flex items-center justify-between px-5 py-6 border-b border-white/10"
    >
      <div class="flex items-center gap-3 overflow-hidden">
        <div class="relative">
          <div
            class="w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20"
          >
            <img src="/etec.png" alt="" class="w-full h-full object-cover">
          </div>
          <!-- <div
            class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"
          ></div> -->
        </div>
        <transition name="fade-slide">
          <div v-if="!isCollapsed" class="flex flex-col">
            <span class="font-bold text-xl tracking-tight">
              ETEC<span class="text-blue-400">NEWS</span>
            </span>
            <span class="text-[10px] text-slate-400 font-medium"
              >Content Management System</span
            >
          </div>
        </transition>
      </div>

      <!-- Collapse Toggle Button -->
      <button
        @click="toggleSidebar"
        class="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-105"
        :class="isCollapsed ? 'rotate-180' : ''"
      >
        <i class="bi bi-chevron-left text-sm"></i>
      </button>
    </div>

    <!-- Navigation Menu - Enhanced with micro-interactions -->
    <nav class="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
      <!-- Workspace Section -->
      <div class="mb-6">
        <transition name="fade-slide">
          <div
            v-if="!isCollapsed"
            class="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-3 px-3"
          >
            Workspace
          </div>
        </transition>

        <div class="space-y-1.5">
          <router-link
            v-for="item in menu1"
            :key="item.name"
            :to="item.route"
            :class="menuClass(item)"
            class="nav-item group"
          >
            <div class="relative">
              <i :class="['bi', item.icon, 'text-lg', menuIconClass(item)]"></i>
              <div
                v-if="isCollapsed && !menuClass(item).includes('bg-blue-500')"
                class="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
              >
                {{ item.label }}
              </div>
            </div>

            <transition name="fade-slide">
              <span v-if="!isCollapsed" class="flex-1 text-sm font-medium">{{
                item.label
              }}</span>
            </transition>

            <span
              v-if="item.badge && !isCollapsed"
              class="badge-pulse ml-auto text-xs font-semibold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30"
            >
              {{ item.badge }}
            </span>
          </router-link>
        </div>
      </div>

      <!-- Publish Section -->
      <div class="mb-6">
        <transition name="fade-slide">
          <div
            v-if="!isCollapsed"
            class="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-3 px-3"
          >
            Publish
          </div>
        </transition>

        <div class="space-y-1.5">
          <router-link
            v-for="item in menu2"
            :key="item.name"
            :to="item.route"
            :class="menuClass(item)"
            class="nav-item group"
          >
            <div class="relative">
              <i :class="['bi', item.icon, 'text-lg', menuIconClass(item)]"></i>
              <div
                v-if="isCollapsed && !menuClass(item).includes('bg-blue-500')"
                class="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
              >
                {{ item.label }}
              </div>
            </div>
            <transition name="fade-slide">
              <span v-if="!isCollapsed" class="flex-1 text-sm font-medium">{{
                item.label
              }}</span>
            </transition>
          </router-link>
        </div>
      </div>

      <!-- System Section -->
      <div>
        <transition name="fade-slide">
          <div
            v-if="!isCollapsed"
            class="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-3 px-3"
          >
            System
          </div>
        </transition>

        <div class="space-y-1.5">
          <router-link
            v-for="item in menu3"
            :key="item.name"
            :to="item.route"
            :class="menuClass(item)"
            class="nav-item group"
          >
            <div class="relative">
              <i :class="['bi', item.icon, 'text-lg', menuIconClass(item)]"></i>
              <div
                v-if="isCollapsed && !menuClass(item).includes('bg-blue-500')"
                class="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
              >
                {{ item.label }}
              </div>
            </div>
            <transition name="fade-slide">
              <span v-if="!isCollapsed" class="flex-1 text-sm font-medium">{{
                item.label
              }}</span>
            </transition>
          </router-link>

          <!-- Visit CMS Site -->
          <a
            :href="CMS_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-item group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 relative overflow-hidden hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300"
          >
            <div class="relative">
              <i class="bi bi-globe text-lg text-emerald-400 group-hover:text-emerald-300"></i>
              <div
                v-if="isCollapsed"
                class="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
              >
                Visit CMS Site
              </div>
            </div>
            <transition name="fade-slide">
              <span v-if="!isCollapsed" class="flex-1 text-sm font-medium">Visit CMS Site</span>
            </transition>
            <transition name="fade-slide">
              <i v-if="!isCollapsed" class="bi bi-box-arrow-up-right text-xs text-emerald-400/60"></i>
            </transition>
          </a>
        </div>
      </div>
    </nav>

  </aside>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle"]);

const route = useRoute();
const router = useRouter();
const isCollapsed = computed(() => props.isCollapsed);
const showProfileMenu = ref(false);
const toastMessage = ref("");
const toastIcon = ref("bi-info-circle");
const CMS_URL = "/";

// Toggle sidebar
const toggleSidebar = () => {
  emit("toggle");
  if (showProfileMenu.value) showProfileMenu.value = false;
};

// Close profile menu when clicking outside (handled by clicking on body)
const toggleProfileMenu = () => {
  if (!isCollapsed.value) {
    showProfileMenu.value = !showProfileMenu.value;
  }
};

// Show toast notification
const showToast = (message, type = "info") => {
  toastIcon.value =
    type === "success"
      ? "bi-check-circle-fill"
      : type === "error"
      ? "bi-exclamation-triangle-fill"
      : "bi-info-circle";
  toastMessage.value = message;
  setTimeout(() => {
    toastMessage.value = "";
  }, 3000);
};

/* ACTIVE CLASS WITH ENHANCED STYLES */
const menuClass = (item) => {
  const isActive = route.path === item.route;
  const baseClasses =
    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 relative overflow-hidden";

  if (isActive) {
    return `${baseClasses} bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20`;
  }

  return `${baseClasses} hover:bg-white/10 text-slate-300 hover:text-white`;
};

const menuIconClass = (item) => {
  const isActive = route.path === item.route;
  return isActive
    ? "text-white"
    : "text-slate-400 group-hover:text-white transition-colors";
};

/* ACTIONS */
const viewProfile = () => {
  showProfileMenu.value = false;
    router.push("/admin/profile");
  showToast("Loading profile...", "info");
};

const openSettings = () => {
  showProfileMenu.value = false;
    router.push("/admin/settings");
  showToast("Opening settings...", "info");
};

const showHelp = () => {
  showToast("Help & Documentation", "info");
};

const openNotifications = () => {
  showToast("No new notifications", "info");
};

const logout = () => {
  showToast("Logging out...", "info");
  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("sidebar_collapsed");
    window.location.href = "/auth/login";
  }, 500);
};

// Close profile menu when route changes
watch(
  () => route.path,
  () => {
    showProfileMenu.value = false;
  }
);

// Close profile menu when clicking outside
const handleClickOutside = (event) => {
  const profileElement = document.querySelector(".profile-menu-container");
  if (
    showProfileMenu.value &&
    profileElement &&
    !profileElement.contains(event.target)
  ) {
    showProfileMenu.value = false;
  }
};

// Add event listener for clicks outside
if (typeof window !== "undefined") {
  document.addEventListener("click", handleClickOutside);
}

/* MENU DATA WITH ENHANCED CONFIGURATION */
const menu1 = [
  {
    name: "dash",
    label: "Dashboard",
    icon: "bi-grid-3x3-gap-fill",
    route: "/admin/dashboard",
    badge: null,
  },
  {
    name: "content",
    label: "All Content",
    icon: "bi-file-earmark-text-fill",
    badge: 20,
    route: "/admin/content",
  },
  {
    name: "collections",
    label: "Collections",
    icon: "bi-folder2-open-fill",
    route: "/admin/collections",
    badge: null,
  },
  {
    name: "media",
    label: "Media Library",
    icon: "bi-images",
    route: "/admin/media",
    badge: null,
  },
];

const menu2 = [
  {
    name: "newpost",
    label: "New Post",
    icon: "bi-pencil-square",
    route: "/admin/newpost",
  },
  {
    name: "categories",
    label: "Categories",
    icon: "bi-tag-fill",
    route: "/admin/categories",
  },
  {
    name: "comments",
    label: "Comments",
    icon: "bi-chat-square-text-fill",
    route: "/admin/comments",
  },
];

const menu3 = [
  {
    name: "settings",
    label: "Settings",
    icon: "bi-sliders2",
    route: "/admin/settings",
  },
  {
    name: "permissions",
    label: "Permissions",
    icon: "bi-shield-check",
    route: "/admin/permissions",
  },
  {
    name: "analytics",
    label: "Analytics",
    icon: "bi-graph-up",
    route: "/admin/analytics",
  },
];
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.8);
}

/* Sidebar Container */
.sidebar-container {
  backdrop-filter: blur(0px);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Navigation Item Hover Effects */
.nav-item {
  position: relative;
  transition: all 0.2s ease;
}

.nav-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleX(0);
  width: 3px;
  height: 70%;
  background: linear-gradient(to bottom, #3b82f6, #6366f1);
  border-radius: 0 4px 4px 0;
  transition: transform 0.2s ease;
}

.nav-item:hover::before {
  transform: translateY(-50%) scaleX(1);
}

.nav-item.active::before {
  transform: translateY(-50%) scaleX(1);
}

/* Badge Pulse Animation */
.badge-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Fade Slide Transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* Dropdown Transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Toast Transition */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Active Link Styles */
.router-link-active {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.2),
    rgba(99, 102, 241, 0.2)
  );
  border-left: 3px solid #3b82f6;
}

/* Hover Scale Effect for Buttons */
button {
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

/* Collapsed State Adjustments */
.sidebar-container.w-20 .nav-item {
  justify-content: center;
}

.sidebar-container.w-20 .nav-item i {
  margin: 0;
}

/* Glassmorphism Effects */
.bg-white\/5 {
  backdrop-filter: blur(8px);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .sidebar-container {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar-container.mobile-open {
    transform: translateX(0);
  }
}
</style>
