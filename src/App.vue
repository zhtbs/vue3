<script setup lang="ts">
  import { useRouter } from "vue-router";
  const router = useRouter();
  router.push({ path: "/Layout" });
</script>
<template>
  <router-view></router-view>
</template>
<style scoped></style>
