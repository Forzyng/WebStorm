export default {
  state: {
    songLyricsArray: [],
    songLyricsQuery: null,
    songLyricsErr: null,
    isPreload: false
  },
  // методы получения данных
  getters: {
    getSongsLyrics (state) {
      return state.songLyricsArray
    },
    getSongLyricsQuery (state) {
      return state.songLyricsQuery
    },
    getSongLyricsErr (state) {
      return state.songLyricsErr
    },
    getCanSendSongLyrics (state) {
      if (!state.songLyricsQuery) return true
      if (state.songLyricsQuery.length < 3) return true
      return false
    },
    getIsPreload (state) {
      return state.isPreload
    }
  },
  // методы смены данных через commit
  mutations: {
    setSongLyrics (state, data = []) {
      state.songLyricsArray = data
      console.log(state.songLyricsArray)
    },
    setIsPreload (state, data = false) {
      state.isPreload = data
    },
    setSongLyricsQuery (state, data) {
      state.songLyricsQuery = data
      if (data.length < 3) {
        state.songLyricsErr = ' < 3'
      } else {
        state.songLyricsErr = null
      }
    }
  },
  // запуск кода через dispatch
  actions: {
    apiGetSongLyrics ({ state, commit, dispatch }) {
      dispatch('toastInfo', 'start')
      commit('setIsPreload', true)

      dispatch('apiFetch')

      dispatch('toastInfo', 'finish')
      commit('setIsPreload', false)
    },
    apiFetch ({ state, commit, dispatch }) {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
          'X-RapidAPI-Key': '193f1c6eecmshda126dc8e1eead4p1018e9jsnd0c157327e54'
        }
      }

      fetch('https://genius-song-lyrics1.p.rapidapi.com/search?q=' +
        state.songLyricsQuery + '&per_page=10&page=1', options)
        .then(response => response.json())
        .then(response => {
          commit('setSongLyrics', response.response.hits)
        })
        .catch(err => console.error(err))
    }
  }
}
