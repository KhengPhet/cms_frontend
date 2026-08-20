<template>
  <router-view />
  <div id="google_translate_element" style="display: none"></div>
</template>
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  window.googleTranslateElementInit = () => {
    if (!window.google) return;

    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,km",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  if (!document.getElementById("google-translate-script")) {
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }
});
</script>
