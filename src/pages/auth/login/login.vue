<template>
  <div class="login-wrapper">
    <div class="logo">
      <img src="../../../assets/logo.png" alt="">
    </div>
    <auth-form v-model="account" @submit-login="handleLogin"></auth-form>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus';

import authApis from "@/apis/account/authApis";
import { SALONADMIN_SOLUTION_ID } from "@/config/service-http";
import AuthForm from "@/components/auth/auth-form/auth-form.vue";
import { setUserLogin } from '@/helpers/utils/sesstion-storage/session-storage';

const openNotification = (status, messages = []) => {
  ElNotification.success({
    title: status,
    message: messages.toString(),
    type: status,
  })
}

export default {
  name: "login-page",
  components: {
    AuthForm,
  },

  setup() {
    const loading = ref(false);
    let messages = reactive([])
    const router = useRouter();

    const solutionId = SALONADMIN_SOLUTION_ID;

    const account = reactive({
      userID: "",
      password: "",
    });

    const handleErrorMessages = (errorMessages) => {
        if(errorMessages) errorMessages.forEach(message => messages.push(message.errorMessage))
    }

    const handleLogin = async () => {
        loading.value = true;
        messages = [];
        try {
            const response = await authApis.login({
            ...account,
            solutionId,
            });

            if(!response.data.isOK) {
                throw response.data.errorMessages;
            }

            messages.push('Login successfully')
            openNotification('success', messages)
            setUserLogin(response.data.result)
            router.push({name: 'client-list'})
            return;

      } catch (error) {
            handleErrorMessages(error);
            openNotification('error', messages)
      } finally {
            loading.value = false;
      }
    };

    return {
      loading,
      account,
      messages,
      solutionId,
      handleLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './login.scss';
</style>