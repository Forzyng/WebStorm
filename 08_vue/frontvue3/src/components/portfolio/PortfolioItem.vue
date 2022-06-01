<template>
  <p> {{ item.name }}</p>
</template>

<script>
export default {
  name: 'PortfolioItem',
  props: {
    item: {}
  }
}
</script>

<style scoped>
</style>
