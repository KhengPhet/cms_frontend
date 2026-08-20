<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-800 font-inter relative overflow-hidden">
    
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <div class="w-full max-w-md mx-4 transform transition-all duration-500 animate-fadeInUp">
      
      <!-- Main Card -->
      <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        
        <!-- Decorative gradient bar -->
        <div class="h-2 bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-500"></div>
        
        <div class="p-8">
          
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-2xl shadow-lg mb-4 transform transition-transform hover:scale-105">
              <i class="fas fa-user-plus text-3xl text-white"></i>
            </div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p class="text-gray-500 mt-2 text-sm">
              Join NexusCMS and start your journey
            </p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleRegister" class="space-y-5">
            
            <!-- Full Name -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-user mr-2 text-blue-500"></i>
                Full Name
              </label>
              <div class="relative">
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="John Doe"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none pl-11"
                />
                <i class="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
              </div>
            </div>

            <!-- Email -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-envelope mr-2 text-blue-500"></i>
                Email Address
              </label>
              <div class="relative">
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="name@email.com"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none pl-11"
                />
                <i class="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
              </div>
            </div>

            <!-- Password -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-lock mr-2 text-blue-500"></i>
                Password
              </label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  required
                  placeholder="••••••••"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none pl-11 pr-12"
                />
                <i class="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-check-circle mr-2 text-blue-500"></i>
                Confirm Password
              </label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.confirmPassword"
                  required
                  placeholder="••••••••"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none pl-11"
                />
                <i class="fas fa-check-circle absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
              </div>
              <div v-if="form.password && form.confirmPassword && form.password !== form.confirmPassword" class="mt-1 text-xs text-red-500 flex items-center gap-1">
                <i class="fas fa-exclamation-circle"></i>
                <span>Passwords do not match</span>
              </div>
            </div>

            <!-- Profile Image Upload -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-camera mr-2 text-blue-500"></i>
                Profile Image
              </label>
              <div class="relative">
                <input
                  type="file"
                  @change="handleFile"
                  accept="image/*"
                  class="hidden"
                  ref="fileInput"
                />
                <div 
                  @click="$refs.fileInput.click()"
                  class="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  <div class="flex flex-col items-center gap-2">
                    <i class="fas fa-cloud-upload-alt text-3xl text-gray-400"></i>
                    <p class="text-sm text-gray-500">Click to upload profile picture</p>
                    <p class="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>
              
              <!-- Image Preview -->
              <div v-if="preview" class="mt-4 flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <img :src="preview" class="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow-md" />
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-700">{{ form.thumbnail?.name || 'Profile image' }}</p>
                  <p class="text-xs text-gray-400">{{ formatFileSize(form.thumbnail?.size) }}</p>
                </div>
                <button
                  type="button"
                  @click="removeImage"
                  class="text-red-500 hover:text-red-700 transition-colors"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>

            <!-- Register Button -->
            <button
              type="submit"
              :disabled="loading || (form.password && form.confirmPassword && form.password !== form.confirmPassword)"
              class="w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mt-6"
            >
              <i v-if="!loading" class="fas fa-user-plus"></i>
              <div v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{{ loading ? 'Creating Account...' : 'Create Account' }}</span>
            </button>

          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-3 bg-white text-gray-500">or</span>
            </div>
          </div>

          <!-- Social Login -->
          <div class="grid grid-cols-2 gap-3">
            <button class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <i class="fab fa-google text-red-500"></i>
              <span class="text-sm">Google</span>
            </button>
            <button class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <i class="fab fa-github text-gray-800"></i>
              <span class="text-sm">GitHub</span>
            </button>
          </div>

          <!-- Footer -->
          <div class="text-center mt-6 pt-4 border-t border-gray-100">
            <p class="text-sm text-gray-600">
              Already have an account?
               <router-link to="/admin/auth/login" class="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors ml-1">
                Login
              </router-link>
            </p>
          </div>

        </div>
      </div>

      <!-- Terms hint -->
      <p class="text-center text-white/70 text-xs mt-6">
        By registering, you agree to our 
        <a href="#" class="text-white hover:underline">Terms of Service</a> and 
        <a href="#" class="text-white hover:underline">Privacy Policy</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { registerAPI } from "../../../services/auth";

const router = useRouter();
const fileInput = ref(null);

const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  thumbnail: null,
});

const preview = ref(null);
const loading = ref(false);
const showPassword = ref(false);

// Format file size
const formatFileSize = (bytes) => {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

// Handle image upload
const handleFile = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please select an image file",
      });
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Please select an image less than 5MB",
      });
      return;
    }
    
    form.thumbnail = file;
    preview.value = URL.createObjectURL(file);
  }
};

// Remove image
const removeImage = () => {
  form.thumbnail = null;
  if (preview.value) {
    URL.revokeObjectURL(preview.value);
    preview.value = null;
  }
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// Register handler
const handleRegister = async () => {
  // Validation
  if (!form.name.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Missing Information",
      text: "Please enter your full name",
    });
    return;
  }
  
  if (!form.email.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Missing Information",
      text: "Please enter your email address",
    });
    return;
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    Swal.fire({
      icon: "warning",
      title: "Invalid Email",
      text: "Please enter a valid email address",
    });
    return;
  }
  
  if (!form.password) {
    Swal.fire({
      icon: "warning",
      title: "Missing Information",
      text: "Please enter a password",
    });
    return;
  }
  
  // Password strength validation
  if (form.password.length < 6) {
    Swal.fire({
      icon: "warning",
      title: "Weak Password",
      text: "Password must be at least 6 characters long",
    });
    return;
  }
  
  if (form.password !== form.confirmPassword) {
    Swal.fire({
      icon: "warning",
      title: "Password Mismatch",
      text: "Passwords do not match. Please try again.",
    });
    return;
  }

  loading.value = true;

  const formData = new FormData();
  formData.append("name", form.name.trim());
  formData.append("email", form.email.trim().toLowerCase());
  formData.append("password", form.password);

  if (form.thumbnail) {
    formData.append("thumbnail", form.thumbnail);
  }

  try {
    const response = await registerAPI(formData);

    await Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "Welcome to NexusCMS! Redirecting to login...",
      timer: 1500,
      showConfirmButton: false,
      background: "#fff",
      backdrop: true,
    });

    router.push("/admin/auth/login");

  } catch (err) {
    let errorMessage = "Registration failed. Please try again.";
    
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.response?.data?.errors) {
      errorMessage = Object.values(err.response.data.errors).flat().join(", ");
    }
    
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: errorMessage,
      confirmButtonColor: "#3b82f6",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.font-inter {
  font-family: 'Inter', sans-serif;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blob {
  0%, 100% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Input autofill styles */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  box-shadow: 0 0 0 30px white inset !important;
}
</style>