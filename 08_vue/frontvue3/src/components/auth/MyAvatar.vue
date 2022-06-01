<template>
  <div>
    <img v-if="currentAvatarUrl" v-bind:src=currentAvatarUrl alt="curAvatar">
    <img v-if="fileName" v-bind:src=fileName alt="newAvatar">
    <input type="file" @change="uploadAvatar" >
    <button type="button" @click="saveAvatar"> Save Avatar</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'MyAvatar',
  setup () {
    const store = useStore()
    return {
      saveAvatar: function () {
        store.dispatch('apiUpdateAvatar')
      },
      fileName: computed(() => {
        const img = store.getters.newFileAvatar
        if (img) {
          console.log('getter')
          console.log(store.getters.newFileAvatar)
          return 'http://localhost:3000/uploads' + img + '?' + Math.random()
        }
        return null
      }),
      currentAvatarUrl: computed(() => 'http://localhost:3000/store/avatars' + store.getters.currentAvatarUrl),
      uploadAvatar: function (e) {
        const files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        store.dispatch('apiUploadAvatar', files[0])
      }
    }
  }
}
</script>
