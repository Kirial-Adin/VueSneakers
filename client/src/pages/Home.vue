<script setup lang="ts">
import { inject, onMounted, reactive, ref, watch, defineEmits, defineProps} from 'vue';
import axios from 'axios';
import debounce from 'lodash.debounce';
import CardList from '../components/CardList.vue';

const items = ref([]);
const { cart, addToCart, removeFromeCart } = inject('cartActions')
const filtres = reactive({
    sortBy: 'title',
    searchQuery: '',
});

const onChangeSelect = (event: Event) => {
    filtres.sortBy = (event.target as HTMLInputElement).value
}
const onChangeInput = (event: Event) => {
    filtres.searchQuery = (event.target as HTMLInputElement).value
}
const onChangeSearch = debounce(onChangeInput, 200)

const addToFavorite = async (item: {
favoriteId: any; isFavorite: boolean; 
}) => {
    try{
        if (!item.isFavorite) {
            const obj = {
                itemId: item.id,
                item,
            }

            item.isFavorite = true;
            const {data} =  await axios.post(`https://197ddba2853ff7e5.mokky.dev/favorites`, obj)
            item.favoriteId = data.id;

        } else {
            item.isFavorite = false;
            await axios.delete(`https://197ddba2853ff7e5.mokky.dev/favorites/${item.favoriteId}`)
            item.favoriteId = null;
        }
    } catch (error) {
        console.log(error)
    }
}

const fetchFavorites = async () => {
    try {
        const { data: favorites } = await axios.get('https://197ddba2853ff7e5.mokky.dev/favorites');
        items.value = items.value.map((item) => {
            const favorite = favorites.find((favorite) => favorite.itemId === item.id);
            if (!favorite) {
                return item;
            }
            return {
                ...item,
                isFavorite: true,
                favoriteId: favorite.id,
            }
        });
    } catch (error) {
        console.log(error);
    }
}
const fetchItems = async () => {
    try {
        const params = {
            sortBy: filtres.sortBy,
        };
        if (filtres.searchQuery) {
            params.title = `*${filtres.searchQuery}*`
        }

        const { data } = await axios.get('https://604781a0efa572c1.mokky.dev/items', {
            params
        });
        items.value = data.map((obj: any) => ({
            ...obj,
            isFavorite: false,
            isAdded: false,
        }));
    } catch (error) {
        console.log(error); 
    }
}

onMounted(async () => {
    const localCart = localStorage.getItem('cart');
    cart.value = localCart ? JSON.parse(localCart) : [];
    
    await fetchItems();
    await fetchFavorites();
})  

watch(cart, () => {
    items.value = items.value.map((item) => ({
        ...item, 
        isAdded: false,
    }))
}); 
watch(filtres, fetchItems);

</script>
<template>
    <div class="flex justify-between items-center">
        
                <h2 class="text-3xl font-bold mb-10">Все кроссовки</h2>
                <div class="flex items-center gap-4">
                    <select @change="onChangeSelect" class="py-2 px-3 border border-gray-200 rounded-md focus:border-gray-40 outline-none focus:outline-none">
                        <option value="name">По названию</option>
                        <option value="price">По цене (дешевые)</option>
                        <option value="-price">По цене (дорогие)</option>
                    </select>
                    <div class="relative">
                        <img class="absolute left-3 top-3" src="/search.svg" alt="">
                        <input @input="onChangeSearch" class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400" placeholder="Поиск..." type="text">
                    </div>
                </div>
            </div>
            <CardList :items="items" @add-to-cart="addToCart" @add-to-favorite="addToFavorite" />
</template>