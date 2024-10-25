<script setup lang="ts">
import { defineEmits, defineProps, computed } from 'vue'
import { Store } from '../store/store'

const store = Store()
const emit = defineEmits(['openDrawer'])
const checkAuth = computed(() => store.UserInfo.isAuth)

defineProps({
  totalPrice: Number
})
</script>
<template>
  <header class="flex justify-between border-b border-slate-300 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <h1 class="text-xl font-bold uppercase">Vue Sneakers</h1>
        <p class="text-slate-500">Магазин лучших кроссовок</p>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
      >
        <img src="/cart.svg" alt="cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>
      <router-link v-if="checkAuth" to="/favorites">
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/heart.svg" alt="cart" />
          <span>Закладки</span>
        </li>
      </router-link>
      <router-link to="/profile">
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/profile.svg" alt="cart" />
          <span>Профиль</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
