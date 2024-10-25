<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['onClickRemove'])
defineProps({
    id: Number,
    price: Number,
    title: String,
    imageUrl: String,
    isFavorite: {type: Boolean, default: false},
    isAdded: Boolean,
    onClickAdd: Function,
    onClickFavorite: Function,
})
</script>
<template>
    <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
        <img class="w-16 h-16" :src="imageUrl" :alt="title">
        <div class="flex flex-col justify-between flex-1">
            <p>{{ title }}</p>
            <div class="flex justify-between mt-2">
                <b class="flex-1">{{ price }} руб.</b>
                <img @click="emit('onClickRemove')" class="opacity-40 hover:opacity-100 cursor-pointer transition" src="/close.svg" alt="">
            </div>
        </div>
    </div>
</template>