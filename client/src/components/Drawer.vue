<script setup lang="ts">
import { defineProps, ref, computed, inject, } from 'vue';
import axios from 'axios';
import DrawerHead from './DrawerHead.vue';
import CartListItem from './CartListItem.vue';
import InfoBlock from './InfoBlock.vue';

const props = defineProps({
    totalPrice: Number,
    vatPrice: Number,
})

const {cart, closeDrawer} = inject('cartActions');
const isCreating = ref(false);
const orderId = ref(null)
const cartIsEmpty = computed(() => cart.value.length === 0)
const BtnDisabled = computed(() => isCreating.value || cartIsEmpty.value) 

const createOrder = async () => {
    try {
        isCreating.value = true;
        const { data } = await axios.post('https://197ddba2853ff7e5.mokky.dev/orders', {
            items: cart.value,
            totalPrice: props.totalPrice.value,
        })
        cart.value = [];

        orderId.value = data.id;
    } catch (error) {
        console.log(error);
    } finally {
        isCreating.value = false;
    }
}

</script>
<template>
    <div class="fixed top-0 left-0 w-full h-full bg-black/70 z-10"></div>
    <div class="bg-white w-96 h-full fixed top-0 right-0 z-20 p-10">
        <DrawerHead />

        <div v-if="!totalPrice || orderId" class="flex h-full items-center">
            <InfoBlock 
                v-if="!totalPrice && !orderId" 
                imageUrl="/package-icon.png" 
                title="Ваша корзина пуста" 
                description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." 
            />
            <InfoBlock  
                v-if="orderId"
                imageUrl="/order-success-icon.png" 
                title="Зазказ оформлен!" 
                :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке.`" 
            />
        </div>
        

        <div v-else>
            <CartListItem />

            <div class="flex flex-col gap-4 mt-7">
                <div class="flex gap-2 ">
                    <span>Итого:</span>
                    <div class="flex-1 border-b border-dashed"></div>
                    <b>{{totalPrice}} Р.</b>
                </div>
                <div class="flex gap-2">
                    <span>Налог 5%:</span>
                    <div class="flex-1 border-b border-dashed"></div>
                    <b>{{vatPrice}} Р.</b>
                </div>
                <button :disabled="BtnDisabled"  @click="createOrder" class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-gray-400">
                    Оформить заказ
                </button>
            </div>
        </div>
    </div>
</template>