<template>
  <div class="h2 mb-0">
    <h1> Table </h1>
    <MySelect></MySelect>
    <BButton variant="primary" @click="onCLick">Test</BButton>
<!--    <b-icon icon="arrow-up"></b-icon>-->
<!--    <b-icon icon="exclamation-triangle"></b-icon>-->
    <BTable :items="items">
    </BTable>
  </div>
</template>

<script>
import { BButton, BTable } from 'bootstrap-vue-3'
import MySelect from '@/components/bootstrap/MySelect'
export default {
  components: {
    MySelect,
    BButton,
    BTable
  },
  methods: {
    onCLick () {
      this.$toast.success('Order placed.', {
        // override the global option
        position: 'top'
      })
    }
  },
  data () {
    return {
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
      ]
    }
  },
  name: 'BootStrap'
}
</script>

<style scoped>

</style>
