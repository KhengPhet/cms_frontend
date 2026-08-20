<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-xl font-semibold">Categories</h2>
        <p class="text-gray-500 text-sm">
          Organise your content with categories.
        </p>
      </div>

      <button
        @click="openModal()"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
      >
        <i class="bi bi-plus-lg"></i>
        New Category
      </button>
    </div>

    <!-- Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6"
    >
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="bg-white rounded-xl shadow p-4"
      >
        <div class="mb-2">
          <i class="bi bi-tag-fill text-lg"></i>
        </div>

        <div class="font-semibold">{{ cat.name }}</div>
        <div class="text-sm text-gray-400">/{{ cat.slug }}</div>

        <hr class="my-5">

        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-400"> {{ cat.count }} posts </span>

          <div class="flex gap-2">
            <button @click="openModal(cat)" class="text-blue-500 cursor-pointer">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button @click="deleteCategory(cat.id)" class="text-red-500 cursor-pointer">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow">
      <div class="p-4 border-b font-semibold text-xl">Category Details</div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-blue-500 text-white">
            <tr>
              <th class="p-3 text-left">#</th>
              <th class="p-3 text-left">Name</th>
              <th class="p-3 text-left">Slug</th>
              <th class="p-3 text-left">Posts</th>
              <th class="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(cat, i) in categories" :key="cat.id" class="border-t">
              <td class="p-3 text-gray-400">{{ i + 1 }}</td>
              <td class="p-3 font-semibold">{{ cat.name }}</td>
              <td class="p-3 text-gray-400">/{{ cat.slug }}</td>
              <td class="p-3 font-semibold">{{ cat.count }}</td>

              <td class="p-3">
                <div class="flex gap-2">
                  <button @click="openModal(cat)" class="text-blue-500">
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button @click="deleteCategory(cat.id)" class="text-red-500">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ====== MODAL (only this section was redesigned) ====== -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      @click.self="closeModal"
    >
      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        <!-- Coloured top bar -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <i class="bi bi-tag-fill text-white text-sm"></i>
              </div>
              <div>
                <h3 class="text-white font-semibold text-base leading-tight">
                  {{ isEdit ? "Edit Category" : "New Category" }}
                </h3>
                <p class="text-blue-100 text-xs mt-0.5">
                  {{ isEdit ? "Update the category details below" : "Fill in the details for your new category" }}
                </p>
              </div>
            </div>
            <button
              @click="closeModal"
              class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <i class="bi bi-x-lg text-sm"></i>
            </button>
          </div>
        </div>

        <!-- Form body -->
        <div class="px-6 py-6 space-y-5">

          <!-- Name -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Category Name <span class="text-red-400 normal-case font-normal">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g. Technology"
              class="w-full border border-gray-200 bg-gray-50 focus:bg-white text-sm px-3.5 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-300"
            />
          </div>

          <!-- Slug -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Slug
            </label>
            <div class="flex items-center border border-gray-200 bg-gray-50 focus-within:bg-white rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 transition">
              <span class="pl-3.5 pr-0.5 text-gray-400 text-sm select-none">/</span>
              <input
                v-model="form.slug"
                type="text"
                placeholder="e.g. technology"
                class="flex-1 text-sm px-2 py-2.5 bg-transparent outline-none placeholder-gray-300"
              />
            </div>
            <p class="text-xs text-gray-400 mt-1.5">Auto-generated from name. You can edit it manually.</p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Description
              <span class="normal-case font-normal text-gray-400 ml-1">(optional)</span>
            </label>
            <textarea
              v-model="form.desc"
              placeholder="A short description of this category…"
              rows="3"
              class="w-full border border-gray-200 bg-gray-50 focus:bg-white text-sm px-3.5 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-300 resize-none"
            ></textarea>
          </div>

        </div>

        <!-- Footer -->
        <div class="px-6 pb-6 flex justify-end gap-2">
          <button
            @click="closeModal"
            class="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="saveCategory"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <i :class="isEdit ? 'bi bi-pencil-fill' : 'bi bi-plus-lg'" class="text-xs"></i>
            {{ isEdit ? "Update" : "Save" }}
          </button>
        </div>

      </div>
    </div>
    <!-- ====== END MODAL ====== -->

  </div>
</template>

<script setup>
import { ref, watch ,onMounted } from 'vue'
import categoryAPI from '../../../services/category';

/* ================= state ================= */
const categories = ref([])
const loading = ref(false);

const showModal = ref(false)
const isEdit = ref(false)

const form = ref({
  id: null,
  name: '',
  slug: '',
  description: ''
})

// =============== fetch =================
const fetchCategories = async () => {
  try {
    loading.value = true;

    const data = await categoryAPI.getAll();

    // handle _id from backend
    categories.value = data.map((c) => ({
      ...c,
      id: c.id || c._id,
    }));

  } catch (err) {
    console.error(err);
    alert("Failed to load categories");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCategories);

/* ================= MODAL ================= */
const openModal = (cat = null) => {
  if (cat) {
    isEdit.value = true;
    form.value = { ...cat };
  } else {
    isEdit.value = false;
    form.value = { id: null, name: "", slug: "", desc: "" };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

/* ================= AUTO SLUG ================= */
watch(() => form.value.name, (val) => {
  if (!isEdit.value) {
    form.value.slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
});

/* ================= SAVE ================= */
const saveCategory = async () => {
  if (!form.value.name) return alert("Name required");

  try {
    if (isEdit.value) {
      await categoryAPI.update(form.value.id, form.value);
    } else {
      await categoryAPI.create(form.value);
    }

    await fetchCategories();
    closeModal();
  } catch (err) {
    console.error(err);
    alert("Save failed");
  }
};

/* ================= DELETE ================= */
const deleteCategory = async (id) => {
  if (!confirm("Delete this category?")) return;

  try {
    await categoryAPI.remove(id);
    await fetchCategories();
  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};
</script>


