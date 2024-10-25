<script setup lang="ts">
import { defineProps, defineEmits} from 'vue';
import Card from './Card.vue';

defineProps({
    items: Array,
    isFavorites: Boolean,
})

const emit = defineEmits(['addToCart', 'addToFavorite'])


</script>
<template>
    <div class="grid grid-cols-4 gap-10" v-auto-animate>
        <Card 
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            :title="item.title" 
            :price="item.price" 
            :image-url="item.imageUrl" 
            :isFavorite="item.isFavorite"
            :isAdded="item.isAdded"
            :onClickFavorite="isFavorites ? null : () => emit('addToFavorite',item)"
            :onClickAdd="() => emit('addToCart', item)"
            />
    </div>
</template>