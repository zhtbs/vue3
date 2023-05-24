<script setup lang="ts">
  import { ref, watch } from "vue";
  import { useVuelidate } from "@vuelidate/core";
  import { required, helpers, maxLength } from "@vuelidate/validators";
  const props = defineProps({
    userpojo: <any>Object
  });
  const emit: any = defineEmits();
  const errmsg: any = ref({});
  const rules = {
    name: {
      required: helpers.withMessage("用户名称不能为空", required),
      maxLength: helpers.withMessage("字符不能大于6", maxLength(6))
    },
    acc: { required: helpers.withMessage("账户不能为空", required) }
  };
  const onsave = () => {
    const v$: any = useVuelidate(rules, props.userpojo);
    errmsg.value = {};
    v$.value
      .$validate()
      .then(() => {
        if (v$.value.$invalid) {
          console.log(v$._value.name);
          //v$.value.$errors
          errmsg.value = v$._value;
        }
        console.log(props.userpojo);
      })
      .catch((err: any) => {
        errmsg.value = err._value;
      });
  };
  interface Value {
    value?: string | number;
    label?: any;
  }
  const handleChange = (value: Value) => {
    props.userpojo.deptname = value.label[0].children;
    props.userpojo.deptid = value.value;
  };
  watch(props, (user) => {
    errmsg.value = {};
  });
</script>
<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <a-form-item label="名称">
        <a-input v-model:value="props.userpojo.name" placeholder="名称" />
        <div v-if="errmsg.name" v-for="error of errmsg.name.$errors" :key="error.$uid">
          <div class="text-red-700 font-bold">{{ error.$message }}</div>
        </div>
      </a-form-item>
    </a-col>
    <a-col :span="12">
      <a-form-item label="账户号" name="url">
        <a-input v-model:value="props.userpojo.acc" style="width: 100%" placeholder="账户号" />
        <div v-if="errmsg.acc" v-for="error of errmsg.acc.$errors" :key="error.$uid">
          <div class="text-red-700 font-bold">{{ error.$message }}</div>
        </div>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row :gutter="16">
    <a-col :span="12">
      <a-form-item label="部门" name="owner">
        <a-select v-model:value="props.userpojo.deptname" placeholder="选择部门" @change="handleChange">
          <a-select-option value="1">部门一</a-select-option>
          <a-select-option value="2">部门二</a-select-option>
          <a-select-option value="3">部门三</a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
    <a-col :span="12">
      <a-form-item label="职务" name="type">
        <a-select placeholder="职务" v-model:value="props.userpojo.post">
          <a-select-option value="经理">经理</a-select-option>
          <a-select-option value="员工">员工</a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row :gutter="16">
    <a-col :span="12">
      <a-form-item label="创建时间" name="dateTime">
        <a-date-picker style="width: 100%" />
      </a-form-item>
    </a-col>
    <a-col :span="12"> </a-col>
  </a-row>
  <a-row :gutter="16">
    <a-col :span="24">
      <a-form-item label="地址" name="description">
        <a-textarea :rows="4" v-model:value="props.userpojo.address" placeholder="地址内容" />
      </a-form-item>
    </a-col>
  </a-row>

  <div
    :style="{
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: '100%',
      borderTop: '1px solid #e9e9e9',
      padding: '10px 16px',
      background: '#fff',
      textAlign: 'right',
      zIndex: 1
    }"
  >
    <a-button style="margin-right: 8px" @click="$emit('onclore')">关闭</a-button>
    <a-button type="primary" class="c-button-primary" @click="onsave">提交</a-button>
  </div>
</template>
<style scoped>
  .c-button-primary {
    color: #fff;
    background-color: #1677ff;
    border-color: #1677ff;
  }
  .c-button-primary:hover {
    color: #fff;
    background-color: #3dc1fc;
    border-color: #2db7f5;
  }
</style>
