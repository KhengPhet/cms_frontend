<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
              </svg>
            </div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Dashboard</h1>
          </div>
          <p class="text-slate-500 text-sm ml-13">Welcome back! Here's what's happening with your content today.</p>
        </div>

        <div class="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span class="text-sm font-medium text-slate-700">{{ formattedDate }}</span>
        </div>
      </div>

      <!-- Stats Cards with enhanced design -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div 
          v-for="(s, i) in stats" 
          :key="i" 
          class="group bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-500 text-sm font-medium mb-1">{{ s.label }}</p>
              <p class="text-3xl font-bold text-slate-800">{{ s.value }}</p>
            </div>
            <div 
              class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
              :style="{ background: s.bg, color: s.color }"
            >
              <i :class="['bi', s.icon, 'text-xl']"></i>
            </div>
          </div>
          
          <div class="flex items-center gap-1.5 mt-3">
            <div 
              class="flex items-center gap-0.5 text-xs font-medium"
              :class="s.up ? 'text-emerald-600' : 'text-rose-600'"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="s.up ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'"></path>
              </svg>
              <span>{{ s.trend }}</span>
            </div>
            <span class="text-xs text-slate-400">vs last month</span>
          </div>
        </div>
      </div>

      <!-- Chart + Quick Actions Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        <!-- Analytics Chart -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100">
            <div class="flex items-center justify-between flex-wrap gap-3">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <h3 class="font-semibold text-slate-800">Analytics Overview</h3>
              </div>
              
              <!-- Date Range Filter Buttons -->
              <div class="flex gap-1 bg-slate-100 rounded-lg p-1">
                <button
                  v-for="range in dateRanges"
                  :key="range.value"
                  @click="selectedDateRange = range.value; filterPostsByDateRange()"
                  :class="[
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
                    selectedDateRange === range.value
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200'
                  ]"
                >
                  {{ range.label }}
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs text-slate-400">
                {{ getDateRangeDescription() }}
              </span>
              <span class="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">
                Top {{ chartPosts.length }} posts by views
              </span>
            </div>
          </div>
          
          <div class="p-6">
            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center h-64">
              <div class="text-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-3"></div>
                <p class="text-slate-400 text-sm">Loading chart data...</p>
              </div>
            </div>
            
            <!-- Chart Content -->
            <div v-else-if="chartPosts.length > 0">
              <!-- Chart Container with fixed height -->
              <div class="relative h-64 w-full">
                <div class="absolute inset-0 flex items-end gap-3">
                  <div 
                    v-for="(post, index) in chartPosts" 
                    :key="index" 
                    class="flex-1 flex flex-col items-center gap-2 h-full justify-end"
                  >
                    <div class="relative w-full group" style="height: calc(100% - 30px);">
                      <div 
                        class="absolute bottom-0 w-full rounded-lg transition-all duration-500 hover:opacity-90 cursor-pointer"
                        :style="{
                          height: getBarHeight(post.views) + '%',
                          background: isHighPerforming(post.views) ? 'linear-gradient(180deg, #34d399, #10b981)' : 'linear-gradient(180deg, #818cf8, #6366f1)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }"
                      >
                        <!-- Tooltip -->
                        <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          {{ formatNumber(post.views) }} views
                        </div>
                      </div>
                    </div>
                    <span class="text-xs font-medium text-slate-500 text-center truncate w-full px-1" :title="post.title">
                      {{ post.title?.slice(0, 10) || 'Untitled' }}
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- Chart Legend -->
              <div class="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-slate-100">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <span class="text-xs text-slate-500">Page Views</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span class="text-xs text-slate-500">High Performance (Top 60%)</span>
                </div>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-else class="flex items-center justify-center h-64">
              <div class="text-center">
                <svg class="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <p class="text-slate-400">No posts found for {{ getDateRangeDescription().toLowerCase() }}</p>
                <button 
                  @click="selectedDateRange = 'all'; filterPostsByDateRange()"
                  class="mt-3 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  View all posts →
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <h3 class="font-semibold text-slate-800">Quick Actions</h3>
            </div>
          </div>
          
          <div class="p-6">
            <div class="grid grid-cols-2 gap-3">
              <div 
                v-for="q in quick" 
                :key="q.label"
                @click="handleQuickAction(q)"
                class="group relative overflow-hidden bg-slate-50 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 rounded-xl p-4 text-center cursor-pointer transition-all duration-200 border border-slate-100 hover:border-indigo-200"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                <div class="relative">
                  <div class="w-10 h-10 mx-auto rounded-lg bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <i :class="['bi', q.icon, 'text-lg', 'text-indigo-600']"></i>
                  </div>
                  <div class="text-sm font-medium text-slate-700">{{ q.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Posts + Activity Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Recent Posts Table -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
              <h3 class="font-semibold text-slate-800">Recent Posts</h3>
            </div>
            <button 
              @click="go('content')"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-lg hover:bg-indigo-100 transition-colors"
            >
              View All
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-slate-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Author</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Views</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr 
                  v-for="p in displayedPosts" 
                  :key="p.id"
                  class="hover:bg-slate-50 transition-colors cursor-pointer group"
                  @click="go(`post/${p.id}`)"
                >
                  <td class="px-6 py-4">
                    <div class="font-medium text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {{ p.title }}
                    </div>
                   </td>
                  <td class="px-6 py-4">  
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center text-xs font-medium text-indigo-600">
                        {{ (p.author || 'U').charAt(0) }}
                      </div>
                      <span class="text-slate-600">{{ p.author || 'Unknown' }}</span>
                    </div>
                    </td>
                  <td class="px-6 py-4">
                    <span 
                      class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                      :class="p.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'"
                    >
                      <span class="w-1.5 h-1.5 rounded-full" :class="p.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'"></span>
                      {{ p.status || 'Draft' }}
                    </span>
                    </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-1 text-slate-500">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      {{ formatNumber(p.views || 0) }}
                    </div>
                    </td>
                  <td class="px-6 py-4 text-xs text-slate-500">
                    {{ formatDate(p.created_at) }}
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div v-if="displayedPosts.length === 0 && !loading" class="py-12 text-center">
            <svg class="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <p class="text-slate-400">No posts yet. Create your first post!</p>
            <button 
              @click="go('newpost')"
              class="mt-3 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Create Post →
            </button>
          </div>
          
          <!-- Loading skeleton for posts -->
          <div v-if="loading && displayedPosts.length === 0" class="divide-y divide-slate-100">
            <div v-for="i in 4" :key="i" class="px-6 py-4 animate-pulse">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div class="h-3 bg-slate-100 rounded w-1/4"></div>
                </div>
                <div class="w-20 h-8 bg-slate-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Feed -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 class="font-semibold text-slate-800">Recent Activity</h3>
            </div>
          </div>
          
          <div class="divide-y divide-slate-100">
            <div 
              v-for="(a, idx) in activities" 
              :key="idx" 
              class="px-6 py-4 hover:bg-slate-50 transition-colors"
            >
              <div class="flex gap-3">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                    <span class="text-xs font-semibold text-indigo-600">{{ a.name.charAt(0) }}</span>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-slate-700">
                    <span class="font-medium">{{ a.name }}</span>
                    <span class="text-slate-500"> {{ a.text }}</span>
                  </p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs text-slate-400">{{ a.time }}</span>
                    <span v-if="a.type" class="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{{ a.type }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="px-6 py-3 bg-slate-50 border-t border-slate-100">
            <button class="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              View all activity
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, computed, onMounted, onUnmounted } from "vue";
import API from "../../../services/api";

const router = useRouter();
const posts = ref([]);
const filteredPosts = ref([]);
const chartPosts = ref([]);
const loading = ref(true);
const selectedDateRange = ref('week');

// Date range options
const dateRanges = [
  { label: 'Day', value: 'day', hours: 24 },
  { label: 'Week', value: 'week', hours: 168 },
  { label: 'Month', value: 'month', hours: 720 },
  { label: 'Year', value: 'year', hours: 8760 },
  { label: 'All', value: 'all', hours: null }
];

const formattedDate = computed(() => {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const formatNumber = (num) => {
  if (!num) return '0';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

const formatDate = (dateString) => {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const go = (route) => {
  router.push(`/admin/${route}`);
};

const handleQuickAction = (q) => {
  if (q.external) {
    window.open(q.url, '_blank');
  } else {
    go(q.route);
  }
};

// Get maximum views for scaling
const maxViewsInChart = computed(() => {
  if (chartPosts.value.length === 0) return 1;
  return Math.max(...chartPosts.value.map(p => p.views || 0));
});

// Calculate bar height as percentage (minimum 8% for visibility)
const getBarHeight = (views) => {
  const max = maxViewsInChart.value;
  if (max === 0) return 8;
  let percentage = (views / max) * 100;
  // Ensure minimum height of 8% and maximum of 100%
  return Math.max(8, Math.min(100, percentage));
};

// Check if post is high performing (top 60% of max)
const isHighPerforming = (views) => {
  const max = maxViewsInChart.value;
  if (max === 0) return false;
  return views >= max * 0.6;
};

// Filter posts by selected date range
const filterPostsByDateRange = () => {
  if (!posts.value.length) {
    filteredPosts.value = [];
    updateChartData();
    return;
  }

  const now = new Date();
  let filtered = [...posts.value];

  const range = dateRanges.find(r => r.value === selectedDateRange.value);
  
  if (range && range.hours) {
    const cutoffDate = new Date(now.getTime() - (range.hours * 60 * 60 * 1000));
    filtered = posts.value.filter(post => {
      if (!post.created_at) return false;
      const postDate = new Date(post.created_at);
      return postDate >= cutoffDate;
    });
  }

  filteredPosts.value = filtered;
  updateChartData();
};

// Update chart data based on filtered posts
const updateChartData = () => {
  if (!filteredPosts.value.length) {
    chartPosts.value = [];
    return;
  }

  // Get top 7 posts by views
  const sorted = [...filteredPosts.value].sort((a, b) => (b.views || 0) - (a.views || 0));
  chartPosts.value = sorted.slice(0, 7);
};

// Get description of current date range
const getDateRangeDescription = () => {
  const range = dateRanges.find(r => r.value === selectedDateRange.value);
  if (!range) return 'All time';
  
  if (range.value === 'all') return 'All time';
  
  const now = new Date();
  const cutoffDate = new Date(now.getTime() - (range.hours * 60 * 60 * 1000));
  
  return `${range.label}: ${cutoffDate.toLocaleDateString()} - ${now.toLocaleDateString()}`;
};

// Filtered posts for display (most recent first)
const displayedPosts = computed(() => {
  const list = filteredPosts.value || [];
  return [...list]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);
});

// Calculate dynamic stats from filtered posts
const stats = computed(() => {
  const totalPosts = filteredPosts.value.length;
  const totalViews = filteredPosts.value.reduce((sum, post) => sum + (post.views || 0), 0);
  const publishedPosts = filteredPosts.value.filter(p => p.status === 'Published').length;
  const avgViews = totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0;
  
  // Calculate trend based on previous period
  const range = dateRanges.find(r => r.value === selectedDateRange.value);
  let trend = '+0%';
  let isUp = true;
  
  if (range && range.hours && selectedDateRange.value !== 'all') {
    const currentPeriodStart = new Date(Date.now() - (range.hours * 60 * 60 * 1000));
    const previousPeriodStart = new Date(currentPeriodStart.getTime() - (range.hours * 60 * 60 * 1000));
    
    const currentPosts = filteredPosts.value.length;
    const previousPosts = posts.value.filter(post => {
      if (!post.created_at) return false;
      const postDate = new Date(post.created_at);
      return postDate >= previousPeriodStart && postDate < currentPeriodStart;
    }).length;
    
    if (previousPosts > 0) {
      const change = ((currentPosts - previousPosts) / previousPosts) * 100;
      isUp = change >= 0;
      trend = `${isUp ? '+' : ''}${Math.round(change)}%`;
    }
  }
  
  return [
    { 
      value: formatNumber(totalPosts), 
      label: "Total Posts", 
      icon: "bi-file-earmark-text", 
      up: isUp, 
      trend: trend, 
      bg: "#eef2ff", 
      color: "#6366f1" 
    },
    { 
      value: formatNumber(totalViews), 
      label: "Total Views", 
      icon: "bi-eye", 
      up: true, 
      trend: "+20%", 
      bg: "#ecfdf5", 
      color: "#10b981" 
    },
    { 
      value: formatNumber(publishedPosts), 
      label: "Published Posts", 
      icon: "bi-check-circle", 
      up: true, 
      trend: "+8%", 
      bg: "#fef3c7", 
      color: "#f59e0b" 
    },
    { 
      value: formatNumber(avgViews), 
      label: "Avg Views/Post", 
      icon: "bi-graph-up", 
      up: totalViews > 0, 
      trend: totalViews > 0 ? "+15%" : "0%", 
      bg: "#fef2f2", 
      color: "#f43f5e" 
    },
  ];
});

// Load posts from API
const loadPosts = async () => {
  loading.value = true;
  try {
    const response = await API.get('/posts');
    
    if (response.data && response.data.success) {
      posts.value = response.data.posts || [];
      filterPostsByDateRange();
    } else {
      console.error('Invalid response format:', response.data);
      posts.value = [];
      filteredPosts.value = [];
      chartPosts.value = [];
    }
  } catch (err) {
    console.error('Error loading posts:', err);
    posts.value = [];
    filteredPosts.value = [];
    chartPosts.value = [];
  } finally {
    loading.value = false;
  }
};

// Quick actions
const quick = ref([
  { label: "New Post", icon: "bi-pencil-square", route: "newpost" },
  { label: "Upload Media", icon: "bi-cloud-upload", route: "media" },
  { label: "Visit CMS", icon: "bi-globe", external: true, url: "/" },
  { label: "Categories", icon: "bi-tags", route: "categories" },
]);

// Activity data
const activities = ref([
  { name: "System", text: "Dashboard loaded successfully", time: "Just now", type: "System" },
  { name: "Info", text: "Ready to manage your content", time: "Just now", type: "Info" },
]);

let refreshInterval = null;

onMounted(() => {
  loadPosts();
  
  // Auto-refresh every 30 seconds
  refreshInterval = setInterval(() => {
    loadPosts();
  }, 30000);
});

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});
</script>

<style scoped>
.ml-13 {
  margin-left: 3.25rem;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Filter button active state */
button:active {
  transform: scale(0.95);
}
</style>