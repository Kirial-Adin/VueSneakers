import type { IUser } from '../models/IUser'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import AuthService from '../services/AuthService'
import axios from 'axios'
import type { AuthResponse } from '../models/response/AuthResponse'
import { API_URL } from '../http'

export const Store = defineStore('', () => {
  const UserInfo = ref({
    user: {} as IUser,
    isAuth: false
  })

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      UserInfo.value = {
        user: response.data.user,
        isAuth: true
      }
    } catch (e: any) {
      console.log(e.response?.data?.message)
      alert(e.response?.data?.message)
    }
  }
  const registration = async (email: string, password: string) => {
    try {
      const response = await AuthService.registration(email, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      UserInfo.value = {
        user: response.data.user,
        isAuth: true
      }
    } catch (e: any) {
      console.log(e.response?.data?.message)
      alert(e.response?.data?.message)
    }
  }
  const logout = async () => {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem('token')
      UserInfo.value = {
        user: {} as IUser,
        isAuth: false
      }
    } catch (e: any) {
      console.log(e.response?.data?.message)
      alert(e.response?.data?.message)
    }
  }

  const checkAuth = async () => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true
      })
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      UserInfo.value = {
        user: response.data.user,
        isAuth: true
      }
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  return { UserInfo, login, registration, logout, checkAuth }
})
