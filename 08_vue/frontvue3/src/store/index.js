import { createStore } from 'vuex'
import myFirstValue from '@/store/modules/myFirstValue'
import toasts from '@/store/toasts'
import logs from '@/store/logs'
import songLyrics from '@/store/modules/songLyrics'
import myArray from '@/store/modules/myArray'
import auth from '@/store/modules/auth'
import portfolio from '@/store/modules/portfolio'
import profile from '@/store/modules/profile'

export default createStore({
  strict: true,
  // Тут лечше всего что бы было пусто
  // state: {
  // },
  // getters: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    myFirstValue,
    toasts,
    logs,
    songLyrics,
    myArray,
    auth,
    portfolio,
    profile
  }
})
