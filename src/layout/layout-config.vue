<template>
    <component :is="layout">
        <slot/>
    </component>
</template>

<script>
import { useRoute } from 'vue-router'
import { shallowRef, watch } from 'vue'
import defaultLayoutVue from './default-layout.vue'

    export default {
        setup() {
            const layout = shallowRef(defaultLayoutVue);
            const routes = useRoute();

            watch(
                () => routes.meta,
                async meta => {
                    try {
                        const component = await require(`@/layout/${meta.layout}.vue`)
                        layout.value = component?.default || defaultLayoutVue;
                    } catch(error) {
                        layout.value = defaultLayoutVue;
                    }
                }
            );

            return {
                layout
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>