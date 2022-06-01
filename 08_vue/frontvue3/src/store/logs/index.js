import { useToast } from 'vue-toast-notification'
const toast = useToast()

export default {
  actions: {
    errorLog ({ state, commit, dispatch }, msg) {
      console.log(msg)
      toast.error(msg)
    },
    errorLogAjax ({ state, commit, dispatch }, error) {
      let msg = '???'
      if (error.status === 403) {
        msg = '<h3>Access Denied</h3>'
      } else if (error.status === 404) {
        msg = '<h3>Not found</h3>'
      }
      this.dispatch('errorLogConsole', error)
      toast.error(msg)
    },
    errorLogConsole ({ state, commit, dispatch }, error) {
      console.log(error)
    }
  }
}
