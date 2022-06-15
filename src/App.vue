<template>
  <layout-config>
    <router-view />
  </layout-config>
</template>

<script>
import LayoutConfig from '@/layout/layout-config.vue';
export default {
  name: 'App',
  
  components: {
    LayoutConfig
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
