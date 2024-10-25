<script setup>
import logInForm from '../components/LogInForm.vue'
import ProfileForm from '../components/ProfileForm.vue'
import { Store } from '../store/store'

const store = Store()

</script>

<template>
  <logInForm v-if="!store.UserInfo.isAuth" />
  <ProfileForm v-else />
</template>
