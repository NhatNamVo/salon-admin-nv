<template>
  <div class="form-container form-client-action">
    <el-form ref="formRef" :model="clientData">
      <el-form-item class="form-title" label="Client Name" prop="clientName">
        <el-input class="form-input" v-model="clientData.clientName"/>
      </el-form-item>
      <el-form-item
        class="form-title"
        label="Client Number"
        prop="memberNumber"
      >
        <el-input class="form-input" v-model="clientData.memberNumber"/>
      </el-form-item>
      <el-form-item
        class="form-title"
        label="Mobile Number"
        prop="mobileNumber"
      >
        <el-input class="form-input" v-model="clientData.mobileNumber"/>
      </el-form-item>
      <el-form-item class="form-title" label="Gender" prop="sex">
        <el-radio-group class="ml-4" v-model="clientData.sex">
          <el-radio label="1">Male</el-radio>
          <el-radio label="2">Female</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="form-title" label="Client Group" prop="clientGroup">
        <el-select clearable placeholder="Select client group" v-model="clientData.clientGroupId">
          <el-option
            v-for="item in clientGroups"
            :key="item.clientGroupId"
            :label="item.itemName"
            :value="item.clientGroupId"
          />
        </el-select>
      </el-form-item>

      <el-form-item class="form-title" label="Registered Date" prop="registrationDate">
        <el-date-picker
          v-model="clientData.registrationDate"
          type="date"
          placeholder="Pick a date"
          :default-value="new Date(2022, 6, 12)"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { computed } from 'vue';
export default {
  props: {
    clientGroupList: {
      type: Array,
      default: ()=> [],
    },
    modelValue: {
      type: Object,
      default: () => {},
    },
  },

  setup(props, {emit}) {

    const clientData = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    return {
        clientData,
        clientGroups: props.clientGroupList,
      }
  }

};
</script>

<style lang="scss">
@import './form-client-action.scss';
</style>