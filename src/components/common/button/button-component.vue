<template>
    <el-button type="primary" v-bind="mergeAttrs">
      <slot/>
    </el-button>
</template>

<script>
import { computed } from 'vue'
    export default {
        setup(_,{attrs}) {
          const mergeAttrs = computed(()=>{
            return Object.assign({}, attrs)
          });

          return {
            mergeAttrs,
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>