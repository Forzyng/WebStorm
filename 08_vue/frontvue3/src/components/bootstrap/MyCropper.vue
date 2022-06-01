<template>
  <vue-cropper
    ref="cropper"
    :src="imgSrc"
    alt="Source Image"
  >
  </vue-cropper>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  name: 'MyCropper',
  components: { VueCropper },
  data () {
    return {
      imgSrc: 'https://vuex.vuejs.org/flow.png',
      cropImg: '',
      data: null
    }
  }
}
</script>

<style scoped>

</style>
