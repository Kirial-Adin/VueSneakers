<script setup lang="ts">
import { ref, onMounted, inject, defineProps} from 'vue';
import  axios  from 'axios';
import CardList from '../components/CardList.vue';

const favorites = ref([])
const { addToCart } = inject('cartActions')

onMounted(async () => {
    try{
        const { data } = await axios.get('https://197ddba2853ff7e5.mokky.dev/favorites?_relations=items');

        favorites.value = data.map((obj) => obj.item);

    } catch (error) {
        console.log(error)
    }
})

</script>

<template>
    <h1 class="text-3xl font-bold mb-10">Мои закладки</h1>
    <CardList 
    :items="favorites" 
    @add-to-cart="addToCart"
    is-favorites
    />

</template>