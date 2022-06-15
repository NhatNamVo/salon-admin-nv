<template>
  <section id="main-content">
    <header-bar />
    <menu-bar />
    <slot />
  </section>
</template>

export 

<script>
import headerBar from "@/components/common/header/header-bar.vue";
import MenuBar from "@/components/common/menu-bar/menu-bar.vue";

export default {
  components: { headerBar, MenuBar },
};
</script>

<style lang="scss" scoped>
</style>