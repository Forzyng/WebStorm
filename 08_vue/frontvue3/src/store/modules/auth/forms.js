export default {
  // namespace: true,
  state: {
    email: '',
    password: '',
    repeatPassword: '',
    registerCheck: false,
    errLogin: null,
    errPassword: null
  },
  getters: {
    canRegister: (state) => {
      // todo  вычислить могу ли я отсылать форму
      if (state.email.length === 0) return false
      if (state.password.length === 0) return false
      return true
    },
    email: (state) => state.email,
    password: (state) => state.password,
    repeatPassword: (state) => state.repeatPassword,
    registerCheck: (state) => state.registerCheck,
    errLogin: (state) => state.errLogin,
    errPassword: (state) => state.errPassword
  },
  mutations: {
    email: (state, data) => { state.email = data },
    password: (state, data) => { state.password = data },
    repeatPassword: (state, data) => { state.repeatPassword = data },
    registerCheck: (state, data) => { state.registerCheck = data },
    errLogin: (state, data) => { state.errLogin = data },
    errPassword: (state, data) => { state.errPassword = data }
  },
  actions: {
    email ({ commit, dispatch }, data) {
      if (!data) data = ''
      commit('email', data)
      dispatch('validateForm')
    },
    password ({ commit, dispatch }, data) {
      if (!data) data = ''
      commit('password', data)
      dispatch('validateForm')
    },
    repeatPassword ({ commit, dispatch }, data) {
      if (!data) data = ''
      commit('repeatPassword', data)
      dispatch('validateForm')
    },
    registerCheck ({ commit, dispatch }, data) {
      commit('registerCheck', data)
      dispatch('validateForm')
    },
    validateForm ({ state, commit, dispatch }, data = null) {
      commit('errLogin', null)
      commit('errPassword', null)
      const email = state.email
      const password = state.password
      if (email.length < 2) { commit('errLogin', ' короткий ') }
      if (password.length < 2) { commit('errPassword', ' короткий ') }
      // console.log(email + ' ' + password)
      // TODO  проверки
    },
    apiTryCrateUser ({ state, commit, dispatch }, data = null) {
      const newUser = {
        email: state.email,
        password: state.password
      }
      fetch('http://localhost:3000/api/tryCreateUser', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(newUser) // body data type must match "Content-Type" header
      })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          dispatch('toastSuccess', ' user Create')
          // TODO  уйти на другой маршрут, сообщить что все хорошо
        })
        .catch(err => {
          dispatch('errorLogAjax', err)
        })
    },
    apiTryLogin ({ state, commit, dispatch }) {
      const user = {
        email: state.email,
        password: state.password
      }
      fetch('http://localhost:3000/api/auth', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(user) // body data type must match "Content-Type" header
      })
        .then(res => {
          if (res.status === 200) { return res.json() } else { dispatch('toastInfo', 'JWT Not Ready') }
        }
        )
        .then(json => {
          if (!json) return
          console.log(json)
          dispatch('toastSuccess', ' JWT Ready ')
          commit('JwtToken', json.token)
          commit('user', json.user)
          // TODO  уйти на другой маршрут, сообщить что все хорошо
        })
        .catch(err => {
          dispatch('errorLogAjax', err)
        })
    }
  }

}
