<template>
  <div>
    <Login @ctrLoginBtn="ctrLogin" />
  </div>
</template>

<script>
import Login from '../../components/headers/login/Login.vue'

export default {
  name: 'ToLogin',
  data() {
    return {
    }
  },
  methods: {
    // 通过 login 传的事件 再次传到 Header 组件 来显示登录后头像等信息
    ctrLogin(){
      this.$emit('emitLogin')
    }
  },
  components: {
    Login
  }
}
</script>
    
<style lang='less' scoped>
</style>