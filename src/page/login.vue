<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { storeToRefs } from "pinia";
  import { useLoginStore } from "@/stores/LoginStore";
  const router = useRouter();
  const acc = ref<string>("");
  const paswd = ref<string>("");
  const { onLogin, goClose } = useLoginStore();
  const { mesages } = storeToRefs(useLoginStore());
  const onUserLogin = () => {
    onLogin(acc.value, paswd.value).then((e) => {
      if (e == "suc") {
        router.push({ path: "/Layout" });
      }
    });
  };
</script>
<template>
  <section class="min-h-screen flex items-stretch text-white">
    <div
      class="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
      style="background-image: "
    >
      <div class="absolute opacity-60 inset-0 z-0" style="background-color: #1e90ff"></div>
      <div class="w-full px-24 z-10">
        <h1 class="text-5xl font-bold text-left tracking-wide">管理系统</h1>
        <p class="text-3xl my-4">Vue3 系统.</p>
      </div>
      <div class="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4"></div>
    </div>
    <div
      class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
      style="background-color: #c0c0c0"
    >
      <div
        class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
        style="background-image: url()"
      >
        <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
      </div>
      <div class="w-full py-6 z-20">
        <h1 class="my-6"></h1>
        <div class="py-6 space-x-2">
          <span
            class="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white"
            >f</span
          >
          <span
            class="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white"
            >G+</span
          >
          <span
            class="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white"
            >in</span
          >
        </div>
        <p class="text-gray-100">{{ mesages }}</p>
        <form @submit.prevent="onUserLogin" class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
          <div class="pb-2 pt-4">
            <input v-model="acc" placeholder="用户名称" class="block w-full p-4 text-lg rounded-sm bg-black" />
          </div>
          <div class="pb-2 pt-4">
            <input
              v-model="paswd"
              type="password"
              placeholder="请输入密码"
              class="block w-full p-4 text-lg rounded-sm bg-black"
            />
          </div>
          <div class="text-right text-gray-400 hover:underline hover:text-gray-100">
            <a href="#">是否记住密码?</a>
          </div>
          <div class="px-4 pb-2 pt-4">
            <button
              class="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
            >
              登录信息
            </button>
          </div>

          <div class="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden"></div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
