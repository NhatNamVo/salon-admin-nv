<template>
    <div class="menu-item-wrapper">
        <ul v-if="menuList.length" class="menu-item-list">
            <li class="menu-item" v-for="(menuItem, index) in menuList" :key="index">
                <template v-if="menuItem.subMenus.length == 1">
                    <router-link :to="{name: menuItem.subMenus[0].name }"> {{ menuItem.name }}</router-link>
                </template>
                <template v-else>
                    <li class="menu-item menu-item-has-submenu">
                        <a :class="setActiveMenuItem(menuItem.name)">{{ menuItem.name }}</a>
                        <ul class="submenu-list">
                            <li v-for="(subMenu, subMenuIndex) in menuItem.subMenus" :key="subMenuIndex">
                                <router-link :to="{name: subMenu.name}">
                                    {{ subMenu.text }}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { routes } from '@/routes/routes';
    export default {
        setup() {
            let menuList = ref([]);
            const routeProperties = useRoute();

            onMounted(() => {
                loadMenu();
            });
    
            const loadMenu = () => {
                const groupItems = [];
                routes.forEach(groupitem => {
                    if(groupitem.group && !groupItems.includes(groupitem.group)) {
                        groupItems.push(groupitem.group);
                    }
                })

                const menuItems = groupItems.map(groupItem => {
                    const subMenuItems = routes.filter(route => route.group == groupItem);
                    return {name: groupItem, subMenus: subMenuItems};
                })

                menuList.value = menuItems
            }

            const setActiveMenuItem = (routerName) => {
                const currentRoutePath = routeProperties.path.split('/');
                if (routerName == currentRoutePath[1]) return 'menu-item-active';
                return ''
            }

            return {
                menuList,
                setActiveMenuItem,
            }
            
        }
    }
</script>

<style lang="scss" scoped>
@import './menu-bar.scss';
</style>