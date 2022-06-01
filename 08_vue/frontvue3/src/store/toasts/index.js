import { useToast } from 'vue-toast-notification'
const toast = useToast()

export default {
  actions: {
    toastSuccess ({ state, commit, dispatch }, msg) {
      toast.success(msg)
    },
    toastInfo ({ state, commit, dispatch }, msg) {
      msg = '<h2>Hi</h2>' + msg
      toast.info(msg)
    }
  }
}
