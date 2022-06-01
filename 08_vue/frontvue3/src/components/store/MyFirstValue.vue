<template>
  <h3> Моя первая переменная в хранилище {{ myFirstValue }} </h3>
  <input v-model="MyVModel">
  <button v-on:click="onBtnClick">10</button>
  <button @click="onBtnUpdate"> Update </button>
  <button @click="putToast"> Toast </button>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MyFirstValue',
  setup: function () {
    const store = useStore()
    return {
      putToast: function () {
        store.dispatch('toastInfo', 'user')
      },
      myFirstValue: computed(() => store.getters.getMyFirstValue),
      onBtnClick: function () {
        store.commit('setMyFirstValue', 10)
      },
      onBtnUpdate: function () {
        store.dispatch('apiGetMyFirstValue')
      },
      MyVModel: computed({
        get: function () {
          console.log('get')
          return store.getters.getMyFirstValue
        },
        set: function (data) {
          console.log(data)
          store.commit('setMyFirstValue', data)
        }
      })
    }
  }
})
</script>

<style scoped>

</style>
