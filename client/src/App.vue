<script setup lang="ts">
import { ref, watch, provide, computed, onMounted } from 'vue';
import Header from './components/Header.vue';
import Drawer from './components/Drawer.vue';
import { Store } from './store/store'


const authStore = Store()
const cart = ref([]);
const drawerOpen = ref(false);

const totalPrice = computed(() => cart.value.reduce((acc, obj) => acc + obj.price, 0));
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));

const closeDrawer = () => {
    drawerOpen.value = false
}

const openDrawer = () => {
    drawerOpen.value = true
}

const addToCart = (item) => {
    if (!item.isAdded) {
        cart.value.push(item);
        item.isAdded = true
    } else {
        cart.value.splice(cart.value.indexOf(item), 1);
        item.isAdded = false
    }
    
}

const removeFromCart = (item) => {
    cart.value.splice(cart.value.indexOf(item), 1);
    item.isAdded = false
}


watch(cart, () => {
    localStorage.setItem('cart', JSON.stringify(cart.value));
}, {deep: true});


provide('cartActions', {
    cart,
    closeDrawer,
    openDrawer,
    addToCart,
    removeFromCart,
}) 

onMounted(async () => {
    await authStore.checkAuth()
})

</script>

<template>
    <Drawer 
        v-if="drawerOpen" 
        :total-price="totalPrice" 
        :vatPrice="vatPrice"
    />

    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
        <Header :total-price="totalPrice" @open-drawer="openDrawer" />
        <div class="p-10">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>
</style>
