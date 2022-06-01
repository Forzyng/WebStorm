<template>
  <h1> Все портфолио </h1>
  <ul>
    <!--    <li v-for='item in items' :key="item.id" > {{item.name}}</li>-->
    <PortfolioItem
      v-for='item in items'
      :key="item.id"
      :item='item'></PortfolioItem>
  </ul>
</template>

<script>
import PortfolioItem from '@/components/portfolio/PortfolioItem'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'PortfolioList',
  components: { PortfolioItem },
  setup () {
    const store = useStore()
    store.dispatch('apiGetPortfolioItems')
    return {
      items: computed(() => store.getters.portfolioItem)
    }
  }
}
</script>

<style scoped>
</style>
