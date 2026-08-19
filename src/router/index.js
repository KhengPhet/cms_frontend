import { createRouter, createWebHistory } from "vue-router"

// views
import Home from "../views/Home.vue"

// sports
import Sport from "../views/sports/Sport.vue"
import SportsLocal from "../views/sports/SportsLocal.vue"
import SportsInternational from "../views/sports/SportsInternational.vue"

// social
import Social from "../views/socials/Social.vue"
import SNational from "../views/socials/SNational.vue"
import International from "../views/socials/International.vue"

// entertainment
import Entertainment from "../views/entertainments/Entertainment.vue"
import ENational from "../views/entertainments/ENational.vue"
import EInternational from "../views/entertainments/EInternational.vue"

// other
import Contact from "../views/Contact.vue"
import CardDetail from "../components/common/CardDetail.vue"

// auth
import Login from "../views/auth/Login.vue"
import Register from "../views/auth/Register.vue"
import AuthLayout from "../Layouts/AuthLayout.vue"
import MainLayout from "../Layouts/MainLayout.vue"

const routes = [
  // Auth routes (no layout needed, they have their own AuthLayout)
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "login",
        component: Login,
      },
      {
        path: "register",
        name: "register",
        component: Register,
      },
    ],
  },
  
  // Main app routes with MainLayout
  {
    path: "/",
    component: MainLayout,
    children: [
      { 
        path: "", 
        name: "home", 
        component: Home 
      },

      // Sports
      { 
        path: "sports", 
        name: "sports", 
        component: Sport 
      },
      { 
        path: "sports/local", 
        name: "sports-local", 
        component: SportsLocal 
      },
      { 
        path: "sports/international", 
        name: "sports-international", 
        component: SportsInternational 
      },

      // Social
      { 
        path: "social", 
        name: "social", 
        component: Social 
      },
      { 
        path: "social/local", 
        name: "social-local", 
        component: SNational 
      },
      { 
        path: "social/international", 
        name: "social-international", 
        component: International 
      },

      // Entertainment
      { 
        path: "entertainment", 
        name: "entertainment", 
        component: Entertainment 
      },
      { 
        path: "entertainment/local", 
        name: "entertainment-local", 
        component: ENational 
      },
      { 
        path: "entertainment/international", 
        name: "entertainment-international", 
        component: EInternational 
      },

      // Contact
      { 
        path: "contact", 
        name: "contact", 
        component: Contact 
      },

      // News Detail - Accessible to everyone
      {
        path: "news/:id",
        name: "news-detail",
        component: CardDetail,
        props: true
      },
    ]
  },
  
  // Catch all route for 404 - Optional
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  // Get token from localStorage
  const token = localStorage.getItem('token') || localStorage.getItem('access_token')
  const isLoggedIn = !!token
  
  // If route requires auth and user is not logged in
  if (requiresAuth && !isLoggedIn) {
    // Store the intended route to redirect after login
    localStorage.setItem('redirectAfterLogin', to.fullPath)
    // Redirect to login page
    next('/auth/login')
  } 
  // If user is logged in and trying to access auth pages (login/register)
  else if (isLoggedIn && (to.path === '/auth/login' || to.path === '/auth/register')) {
    // Redirect to home page
    next('/')
  }
  else {
    // Proceed normally
    next()
  }
})

export default router