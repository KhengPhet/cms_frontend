<template>
  <main class="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <RouterLink to="/" class="hover:text-primary font-medium">
          ទំព័រដើម
        </RouterLink>
        <span>›</span>
        <span class="text-primary font-semibold">ទំនាក់ទំនង</span>
      </nav>

      <!-- Page Title -->
      <div class="mb-12 text-center">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          ទំនាក់ទំនងមកកាន់ពួកយើង
        </h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          យើងខ្ញុំសូមស្វាគមន៍រាល់មតិយោបល់ សំណួរ និងការផ្តល់យោបល់របស់លោកអ្នក។
          សូមបំពេញទម្រង់ខាងក្រោម ហើយយើងខ្ញុំនឹងទាក់ទងអ្នកវិញក្នុងពេលឆាប់ៗ។
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <!-- FOLLOW US -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-700 dark:text-white">
              តាមដានពួកយើង
            </h2>
          </div>

          <ul class="space-y-3">
            <li v-for="social in socials" :key="social.name">
              <a
                :href="social.link"
                target="_blank"
                class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition group"
              >
                <div
                  class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:scale-110 transition"
                >
                  <img
                    :src="social.icon"
                    class="w-5 h-5 object-contain"
                    :alt="social.name"
                  />
                </div>
                <span class="text-gray-700 dark:text-gray-200 font-medium">
                  {{ social.name }}
                </span>
              </a>
            </li>
          </ul>
        </div>

        <!-- CONTACT FORM -->
        <div
          class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-700 dark:text-white">
              ផ្ញើសារមកកាន់ពួកយើង
            </h2>
          </div>

          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  ឈ្មោះ <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  v-model="form.username"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
                  placeholder="សូមបញ្ចូលឈ្មោះរបស់អ្នក"
                />
                <p v-if="errors.username" class="mt-1 text-xs text-red-500">
                  {{ errors.username }}
                </p>
              </div>

              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  អ៊ីមែល <span class="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  v-model="form.email"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
                  placeholder="example@email.com"
                />
                <p v-if="errors.email" class="mt-1 text-xs text-red-500">
                  {{ errors.email }}
                </p>
              </div>

              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  លេខទូរស័ព្ទ <span class="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  v-model="form.telephone"
                  required
                  minlength="9"
                  maxlength="10"
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
                  placeholder="012345678"
                />
                <p v-if="errors.telephone" class="mt-1 text-xs text-red-500">
                  {{ errors.telephone }}
                </p>
              </div>

              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  អាសយដ្ឋាន <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  v-model="form.address"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
                  placeholder="សូមបញ្ចូលអាសយដ្ឋានរបស់អ្នក"
                />
              </div>
            </div>

            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                សារ <span class="text-red-500">*</span>
              </label>
              <textarea
                rows="5"
                v-model="form.message"
                required
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition resize-none"
                placeholder="សូមបញ្ចូលសាររបស់អ្នក..."
              ></textarea>
              <p class="mt-1 text-xs text-gray-500">
                {{ form.message.length }}/500 តួអក្សរ
              </p>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg
                  v-if="isSubmitting"
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{ isSubmitting ? "កំពុងផ្ញើ..." : "ផ្ញើសារ" }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Contact Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center"
        >
          <div
            class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 dark:text-white mb-2">
            ទូរស័ព្ទ
          </h3>
          <p class="text-gray-600 dark:text-gray-400">012 333 444</p>
          <p class="text-gray-600 dark:text-gray-400">096 555 666</p>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center"
        >
          <div
            class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 dark:text-white mb-2">
            អ៊ីមែល
          </h3>
          <p class="text-gray-600 dark:text-gray-400">info@newskh.com</p>
          <p class="text-gray-600 dark:text-gray-400">support@newskh.com</p>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center"
        >
          <div
            class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 dark:text-white mb-2">
            អាសយដ្ឋាន
          </h3>
          <p class="text-gray-600 dark:text-gray-400">ភ្នំពេញ, កម្ពុជា</p>
          <p class="text-gray-600 dark:text-gray-400">
            សង្កាត់បឹងកេងកង, ខណ្ឌចំការមន
          </p>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-4 text-center"
        @click.stop
      >
        <div
          class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
          ផ្ញើសារជោគជ័យ!
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          សូមអរគុណសម្រាប់ការផ្ញើសារមកកាន់ពួកយើង។
          យើងខ្ញុំនឹងទាក់ទងអ្នកវិញក្នុងពេលឆាប់ៗ។
        </p>
        <button
          @click="closeModal"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          បិទ
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";

const form = reactive({
  username: "",
  email: "",
  telephone: "",
  address: "",
  message: "",
});

const errors = reactive({
  username: "",
  email: "",
  telephone: "",
});

const isSubmitting = ref(false);
const showModal = ref(false);

const socials = [
  { name: "Facebook", icon: "/facebook.png", link: "https://facebook.com" },
  { name: "YouTube", icon: "/youtube.png", link: "https://youtube.com" },
  { name: "Instagram", icon: "/Instagram.png", link: "https://instagram.com" },
  { name: "Telegram", icon: "/Telegram.png", link: "https://t.me" },
  { name: "Email", icon: "/email.png", link: "mailto:info@newskh.com" },
  { name: "TikTok", icon: "/TikTok.png", link: "https://tiktok.com" },
  { name: "ទូរស័ព្ទ", icon: "/phone.png", link: "tel:012333444" },
];

// Validation functions
const validateEmail = (email) => {
  const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  const re = /^[0-9]{9,10}$/;
  return re.test(phone);
};

const validateForm = () => {
  let isValid = true;

  if (!form.username.trim()) {
    errors.username = "សូមបញ្ចូលឈ្មោះរបស់អ្នក";
    isValid = false;
  } else if (form.username.length < 2) {
    errors.username = "ឈ្មោះត្រូវមានយ៉ាងហោចណាស់ ២ តួអក្សរ";
    isValid = false;
  } else {
    errors.username = "";
  }

  if (!form.email) {
    errors.email = "សូមបញ្ចូលអ៊ីមែលរបស់អ្នក";
    isValid = false;
  } else if (!validateEmail(form.email)) {
    errors.email =
      "សូមបញ្ចូលអ៊ីមែលឱ្យបានត្រឹមត្រូវ (ឧទាហរណ៍: name@example.com)";
    isValid = false;
  } else {
    errors.email = "";
  }

  if (!form.telephone) {
    errors.telephone = "សូមបញ្ចូលលេខទូរស័ព្ទរបស់អ្នក";
    isValid = false;
  } else if (!validatePhone(form.telephone)) {
    errors.telephone = "លេខទូរស័ព្ទត្រូវមាន ៩ ឬ ១០ ខ្ទង់";
    isValid = false;
  } else {
    errors.telephone = "";
  }

  return isValid;
};

// function submitForm() {
//   if (!validateForm()) {
//     return;
//   }

//   isSubmitting.value = true;

//   // Simulate API call
//   setTimeout(() => {
//     console.log("Form submitted:", { ...form });

//     // Reset form
//     Object.keys(form).forEach((key) => {
//       form[key] = "";
//     });

//     isSubmitting.value = false;
//     showModal.value = true;
//   }, 1000);

//   // contech with telegram
//   await fetch("YOUR_WEBHOOK_URL", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(form),
// });
// }

async function submitForm() {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    console.log("Sending:", form);

    const res = await fetch("https://eopizhp043cnzp1.m.pipedream.net", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username,
        email: form.email,
        telephone: form.telephone,
        address: form.address,
        message: form.message,
      }),
    });

    if (!res.ok) {
      throw new Error("Server error: " + res.status);
    }

    // reset form
    Object.keys(form).forEach((key) => (form[key] = ""));

    showModal.value = true;

  } catch (error) {
    console.error("ERROR:", error);
    alert("Send failed: " + error.message);
  }

  isSubmitting.value = false;
}

function closeModal() {
  showModal.value = false;
}
</script>

<style scoped>
main {
  font-family: "Battambang", sans-serif;
}
</style>