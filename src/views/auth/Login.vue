<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-emerald-400 font-roboto"
  >
    <div class="w-[380px] bg-white rounded-2xl shadow-xl p-6 animate-fadeIn">
      <!-- Header -->
      <div class="text-center mb-6">
        <div class="text-3xl text-blue-500 mb-2">
          <i class="bi bi-layers-fill"></i>
        </div>
        <h4 class="font-bold text-lg">Welcome Back</h4>
        <p class="text-gray-500 text-sm">Sign in to continue to NexusCMS</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="login">
        <!-- Email -->
        <div class="mb-4">
          <label class="block text-sm mb-1">Email</label>

          <div class="flex items-center bg-gray-100 rounded-lg px-3">
            <i class="bi bi-envelope-fill text-gray-400 mr-2"></i>

            <input
              v-model="email"
              type="email"
              placeholder="admin@nexus.io"
              required
              class="w-full bg-transparent outline-none py-2 text-sm"
            />
          </div>
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label class="block text-sm mb-1">Password</label>

          <div class="flex items-center bg-gray-100 rounded-lg px-3">
            <i class="bi bi-lock-fill text-gray-400 mr-2"></i>

            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="••••••••"
              required
              class="w-full bg-transparent outline-none py-2 text-sm"
            />

            <button
              type="button"
              @click="togglePassword"
              class="text-gray-400 hover:text-gray-600"
            >
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>

        <!-- Options -->
        <div class="flex justify-between items-center mb-4 text-sm">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="remember" />
            Remember me
          </label>

          <a href="#" class="text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <!-- Button -->
        <button
          class="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-400 text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          <span v-if="!loading">Sign In</span>

          <div
            v-if="loading"
            class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></div>
        </button>
      </form>

      <!-- Footer -->
      <div class="text-center mt-4 text-sm">
        Don’t have an account?
        <router-link to="/auth/register" class="text-blue-500 hover:underline">
          register
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { loginAPI } from "../../services/useAuth";

const email = ref("");
const password = ref("");
const loading = ref(false);

const router = useRouter();

async function login() {
  loading.value = true;

  try {
    const res = await loginAPI({
      email: email.value,
      password: password.value,
    });

    // ✅ FIX: use res.data
    const data = res.data;

    // save token
    localStorage.setItem("token", data.token);

    // save user (VERY IMPORTANT for profile/dashboard)
    localStorage.setItem("user", JSON.stringify(data.user));

    await Swal.fire({
      icon: "success",
      title: "Login Success",
      text: `Welcome ${data.user.name}`,
      timer: 1200,
      showConfirmButton: false,
    });

    router.push("/dashboard");
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: err.response?.data?.message || "Invalid login",
    });
  } finally {
    loading.value = false;
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

.font-roboto {
  font-family: "Roboto", sans-serif;
}

/* animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease;
}
</style>