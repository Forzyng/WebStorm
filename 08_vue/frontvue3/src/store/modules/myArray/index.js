export default {
  state: {
    myArray: JSON.parse(localStorage.getItem('myArray')) || [],
    myArrayPop: null
  },
  getters: {
    // getMyArray (state) {
    //   return state.myArray
    // },
    getMyArray: (state) => (strFilter) => {
      if (strFilter.length === 0) { return state.myArray }
      return state.myArray.filter(el => {
        return el.name.includes(strFilter)
      })
    },
    getMyArrayLen (state) {
      return state.myArray.length
    },
    getMyArrayPop (state) {
      return state.myArrayPop
    }
  },
  mutations: {
    setMyArrayPush (state, data) {
      state.myArray.push(data)
      localStorage.setItem('myArray', JSON.stringify(state.myArray))
    },
    setMyArrayDelIndex (state, index) {
      state.myArray.splice(index, 1)
      localStorage.setItem('myArray', JSON.stringify(state.myArray))
    },
    getMyArrayPop (state, data = null) {
      state.myArrayPop = state.myArray.pop()
      localStorage.setItem('myArray', JSON.stringify(state.myArray))
    },
    setMyArrayClear (state, data = null) {
      state.myArray = []
      state.myArrayPop = null
      localStorage.removeItem('myArray')
    },
    setMyArrayDelId (state, id) {
      state.myArray = state.myArray.filter(
        el => { return el.id !== id }
      )
      localStorage.setItem('myArray', JSON.stringify(state.myArray))
      this.dispatch('toastSuccess', 'del')
    }
  },
  actions: {
    apiGetMyArray () {

    },
    apiSendMyArray () {

    }
  }
}
