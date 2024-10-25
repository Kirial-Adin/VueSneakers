<script setup lang="ts">
import { Store } from '../store/store'
import { ref } from 'vue';

const email = ref<string>('');
const password = ref<string>('');

const authStore = Store()

const login = async() => {
    await authStore.login(email.value, password.value)
}

const registration = async() => {
    await authStore.registration(email.value, password.value)
}

</script>

<template>
    <div class="flex items-center">
        <div class="grid box-content mx-auto border-2 border-solid border-gray-500 border-slate-300 px-5 py-5 gap-4">
            <input 
                class="w-80 box-content p-1 border-b-2 border-solid border-gray-500 box-content focus:outline-none"
                @input="email = $event.target.value"
                type="text" 
                placeholder="Email" 
                v-model="email"
            >
            <input
                class="w-80 box-content p-1 border-b-2 border-solid border-gray-500 focus:outline-none"
                @input="password = $event.target.value" 
                type="password" 
                placeholder="Пароль" 
                v-model="password"
            >
            <button class="w-48 mx-auto border-2 border-solid border-gray-300 hover:border-gray-500" @click="login">
                Войти
            </button>
            <button class="w-48 mx-auto border-2 border-solid border-gray-300 hover:border-gray-500" @click="registration">
                Зарегистрироваться
            </button>
        </div>
        
    </div>
</template>

<!-- <style scoped lang="scss">
@import '../assets/styles/variables.scss';
.form {
    position: relative;
    z-index: 15;
    width: 530px;
    border-radius: 4px;
    box-shadow: 0 0 30px rgba(#000000, .1);
    box-sizing: border-box;
    margin: 100px auto 10px;
    overflow: hidden;

    .group {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 0 20px;

        &:last-child {
            margin: 0;
        }
    }

    .label {
        display: block;
        margin: 0 0 10px;
        color: rgb(black, 0.6);
        font-size: 12px;
        font-weight: 500;
        line-height: 1;
        text-transform: uppercase;
        letter-spacing: .2em;
    }

    input {
        outline: none;
        display: block;
        background: rgba(black, 0.1);
        width: 100%;
        border: 0;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 12px 20px;
        color: rgb(black, 0.6);
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        line-height: inherit;
        transition: 0.3s ease;

        &:focus {
        color: (black, 0.8);
        }
    }

    button {
        outline: none;
        background: $waves;
        width: 40%;
        border: 0;
        border-radius: 4px;
        padding: 12px 20px;
        color: white;
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        line-height: inherit;
        text-transform: uppercase;
        cursor: pointer;
        margin: 10px auto;
    }
}
</style> -->