<template>
  <v-select :options="['Canada', 'United States']"></v-select>
  <FullMySelect :options="['Canada', 'United States']"></FullMySelect>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import FullMySelect from '@/components/bootstrap/FullMySelect'
export default {
  components: {
    FullMySelect,
    vSelect
  },
  name: 'MySelect'
}
</script>

<style scoped>

</style>
