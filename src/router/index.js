import { createRouter, createWebHistory } from "vue-router";

// CMS views
import Home from "../views/Home.vue";
import Sport from "../views/sports/Sport.vue";
import SportsLocal from "../views/sports/SportsLocal.vue";
import SportsInternational from "../views/sports/SportsInternational.vue";
import Social from "../views/socials/Social.vue";
import SNational from "../views/socials/SNational.vue";
import International from "../views/socials/International.vue";
import Entertainment from "../views/entertainments/Entertainment.vue";
import ENational from "../views/entertainments/ENational.vue";
import EInternational from "../views/entertainments/EInternational.vue";
import Contact from "../views/Contact.vue";
import CardDetail from "../components/common/CardDetail.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import AuthLayout from "../Layouts/AuthLayout.vue";
import MainLayout from "../Layouts/MainLayout.vue";

// Admin views
import AdminLayout from "../Layouts/admin/AdminLayout.vue";
import AdminDashboard from "../views/admin/dashboard/Dashboard.vue";
import AdminContent from "../views/admin/content/Content.vue";
import AdminEditor from "../views/admin/content/Editor.vue";
import AdminCategories from "../views/admin/categories/Categories.vue";
import AdminComments from "../views/admin/comments/Comments.vue";
import AdminCollections from "../views/admin/collections/Collections.vue";
import AdminMedia from "../views/admin/media/Media.vue";
import AdminAuthors from "../views/admin/users/Authors.vue";

const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const routes = [
  // Auth routes (unified for all users)
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "login", name: "login", component: Login },
      { path: "register", name: "register", component: Register },
    ],
  },

  // CMS main routes
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "home", component: Home },
      { path: "sports", name: "sports", component: Sport },
      { path: "sports/local", name: "sports-local", component: SportsLocal },
      { path: "sports/international", name: "sports-international", component: SportsInternational },
      { path: "social", name: "social", component: Social },
      { path: "social/local", name: "social-local", component: SNational },
      { path: "social/international", name: "social-international", component: International },
      { path: "entertainment", name: "entertainment", component: Entertainment },
      { path: "entertainment/local", name: "entertainment-local", component: ENational },
      { path: "entertainment/international", name: "entertainment-international", component: EInternational },
      { path: "contact", name: "contact", component: Contact },
      { path: "news/:id", name: "news-detail", component: CardDetail, props: true },
    ],
  },

  // Admin routes (author only)
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true, role: "author" },
    children: [
      { path: "", redirect: "/admin/dashboard" },
      { path: "dashboard", name: "admin-dashboard", component: AdminDashboard },
      { path: "content", name: "admin-content", component: AdminContent },
      { path: "newpost", name: "admin-newpost", component: AdminEditor },
      { path: "editpost/:id", name: "admin-editpost", component: AdminEditor, props: true },
      { path: "categories", name: "admin-categories", component: AdminCategories },
      { path: "comments", name: "admin-comments", component: AdminComments },
      { path: "collections", name: "admin-collections", component: AdminCollections },
      { path: "media", name: "admin-media", component: AdminMedia },
      { path: "authors", name: "admin-authors", component: AdminAuthors },
    ],
  },

  // Catch all
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Auth guard — role-based redirect
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiredRole = to.matched.find((record) => record.meta.role)?.meta.role;
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const user = getUser();

  // If not logged in and route requires auth → go to login
  if (requiresAuth && !isLoggedIn) {
    localStorage.setItem("redirectAfterLogin", to.fullPath);
    next("/auth/login");
    return;
  }

  // If logged in but wrong role → redirect to appropriate page
  if (isLoggedIn && requiredRole && user?.role !== requiredRole) {
    if (user?.role === "author") {
      next("/admin/dashboard");
    } else {
      next("/");
    }
    return;
  }

  // If logged in and trying to visit login/register → redirect by role
  if (isLoggedIn && (to.path === "/auth/login" || to.path === "/auth/register")) {
    if (user?.role === "author") {
      next("/admin/dashboard");
    } else {
      next("/");
    }
    return;
  }

  next();
});

export default router;
