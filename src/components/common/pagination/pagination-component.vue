<template>
    <el-pagination
      v-model:currentPage="currentPageNumber"
      :small="true"
      :disabled="false"
      :background="true"
      :pager-count="4"
      layout="prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      @current-change="$emit('change-current-page')"
    />
</template>

<script>
import { computed } from 'vue'
    export default {
        props: {
            pageSize: {
                type: Number,
                default: 10,
            },

            total: {
                type: Number,
                default: 0,
            },

            modelValue: {
                type: Number,
                default: 1,
            },

        },

        setup(props, {emit}) {

            const currentPageNumber = computed({
                get: () => props.modelValue,
                set: (value) => emit("update:modelValue", value),
            });

            return {
                currentPageNumber,
            }

        }
    }
</script>

<style lang="scss" scoped>
@import './pagination-component.scss';
</style>