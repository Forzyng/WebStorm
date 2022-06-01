<template>
  <div class="home">
    <MyAvatar></MyAvatar>
    <MyLogin></MyLogin><hr>
    <MyRegister></MyRegister>
  </div>
</template>

<script>
// @ is an alias to /src

import MyRegister from '@/components/auth/MyRegister'
import MyLogin from '@/components/auth/MyLogin'
import MyAvatar from '@/components/auth/MyAvatar'

export default {
  name: 'HomeView',
  components: {
    MyAvatar,
    MyLogin,
    MyRegister
  }
}
</script>
