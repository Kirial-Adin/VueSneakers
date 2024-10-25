<script setup>
import {Store} from '../store/store'

const authStore = Store()
const logout = async() => {
    await authStore.logout()
}
</script>

<template>
    <div>
        <h1>Profile</h1>
        <p v-if="!authStore.UserInfo.user.isActivated">Необходимо активировать аккаунт</p>
        <button class="w-32 mx-auto border-2 border-solid border-gray-300 hover:border-gray-500" @click="logout">
            Выйти
        </button>
    </div>
</template>

<style scoped lang="scss">
</style>