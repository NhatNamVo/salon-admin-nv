<template>
  <div class="form-container">
    <el-form
      ref="formRef"
      :model="account"
      label-width="120px"
      @submit.prevent="sumitAccount(formRef)"
    >
      <el-form-item
        class="form-title"
        label="Shop Account"
        prop="userID"
        :rules="validateRule.userId"
      >
        <el-input class="form-input" v-model="account.userID" />
      </el-form-item>

      <el-form-item
        class="form-title"
        label="Password"
        prop="password"
        :rules="validateRule.password"
      >
        <el-input
          class="form-input"
          v-model="account.password"
          type="password"
          show-password
        />
      </el-form-item>

      <el-form-item class="form-button">
        <el-button
          type="primary"
          @click="sumitAccount(formRef)"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
export default {
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },

    loading: {
      type: Boolean,
      default: false,
    }
  },

  setup(props, { emit }) {
    const formRef = ref(null);

    const validateRule = reactive({
      userId: [
        {
          required: true,
          message: "Please input shop account",
        },
      ],
      password: [
        {
          required: true,
          message: "Please input password",
        },
      ],
    });

    const account = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const sumitAccount = (formEl) => {
      if (!formEl) return;

      formEl.validate((valid) => {
        if (valid) {
          emit("submit-login");
        }
        return;
      });
    };

    return {
      formRef,
      account,
      sumitAccount,
      validateRule,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./auth-form.scss";
</style>