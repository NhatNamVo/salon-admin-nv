<template>
    <div class="header-bar-wrapper">
        <div class="header-logo">
            <img src="../../../assets/logo.png" alt="">
        </div>
        <div class="header-action">
            <i>...new feature...</i>
        </div>
        <div class="user-action">
            <button class="button button-logout" @click="handleLogout">
                <p>Logout</p>
                <div class="overlay"/>
            </button>
        </div>
    </div>
</template>

<script>
import { getUserLogged, removeUserLogged } from '@/helpers/utils/sesstion-storage/session-storage';
import { useRouter } from 'vue-router';
    export default {
        setup() {
            const router = useRouter();

            const handleLogout = () => {
                removeUserLogged();
                const userLoggedIn = getUserLogged();
                if (!userLoggedIn) {
                    router.push({name: 'login'})
                }
            };

            return {
                handleLogout,
            }
        }
    }
</script>

<style lang="scss" scoped>
@import './header-bar.scss';
</style>