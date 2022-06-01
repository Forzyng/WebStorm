<template>
  <select>
    <option v-for="(item, index) in options" :key="index">
        {{ item }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'FullMySelect',
  props: {
    options: {}
  }
}
</script>

<style scoped>

</style>
