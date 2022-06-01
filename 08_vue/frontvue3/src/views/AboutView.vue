<template>
  <div class="about">
    <h1>This is an about page</h1>
    <MyCropper></MyCropper>
    <BootStrap></BootStrap>
  </div>
</template>
<script>
import BootStrap from '@/components/bootstrap/BootStrap'
import MyCropper from '@/components/bootstrap/MyCropper'
export default {
  components: { MyCropper, BootStrap }
}
</script>
