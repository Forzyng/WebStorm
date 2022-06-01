<template>
  <MyArray></MyArray>
<h1>My First Value</h1>
<MyFirstValue></MyFirstValue>
</template>

<script>
import MyFirstValue from '@/components/store/MyFirstValue'
import MyArray from '@/components/store/MyArray'
export default {
  name: 'StoreView',
  components: {
    MyArray,
    MyFirstValue
  }
}
</script>

<style scoped>

</style>
