<template>
  <div class="flex">
    <Sidebar :isCollapsed="isCollapsed" @toggle="toggleSidebar" />
    <div class="flex-1 transition-all duration-300" :class="isCollapsed ? 'ml-20' : 'ml-72'">
      <Topbar @toggleSidebar="toggleSidebar" />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "../../components/admin/Sidebar.vue";
import Topbar from "../../components/admin/Topbar.vue";

const isCollapsed = ref(localStorage.getItem("sidebar_collapsed") === "true");

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem("sidebar_collapsed", isCollapsed.value);
};
</script>
