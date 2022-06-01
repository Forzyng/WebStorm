import ajax from '@/store/ajax'

export default {
  // namespaced: true,
  // набор данных которые я хочу хранить и их начальные значения
  state: {
    myFirstValue: JSON.parse(localStorage.getItem('myFirstValue')) || 0
  },
  // методы получения данных
  getters: {
    getMyFirstValue (state) {
      return state.myFirstValue
    }
  },
  // методы смены данных через commit
  mutations: {
    setMyFirstValue (state, data) {
      localStorage.setItem('myFirstValue', JSON.stringify(data))
      state.myFirstValue = data
    }
  },
  // запуск кода через dispatch
  actions: {
    apiGetMyFirstValue ({ state, commit, dispatch }) {
      console.log('Get Data')
      ajax.get('url')
      // fetch()
      //   .then()
      commit('setMyFirstValue', 'получил')
      dispatch('toastInfo', 'Ok')
    }
  }
}
