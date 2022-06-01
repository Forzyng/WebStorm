<template>
  <input v-model="songLyricsQuery"><br>
  <span v-if="err">{{err}}</span><br>
  <button :disabled=isDis @click="doQuery"> Send </button><br>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'SongLyrics',
  setup () {
    const store = useStore()
    return {
      isDis: computed(() => { return store.getters.getCanSendSongLyrics }),
      err: computed(() => { return store.getters.getSongLyricsErr }),
      songLyricsQuery: computed({
        get () {
          return store.getters.getSongLyricsQuery
        },
        set (data) {
          store.commit('setSongLyricsQuery', data)
        }
      }),
      doQuery: () => store.dispatch('apiGetSongLyrics')
    }
  }
}
</script>

<style scoped>
</style>
