<script setup lang="ts">
  import { SmileOutlined, PlusOutlined } from "@ant-design/icons-vue";
  import { ref } from "vue";
  const visible = ref<boolean>(false);
  const showDrawer = () => {
    visible.value = true;
  };
  const closeDrawer = () => {
    visible.value = false;
  };
  //表单头
  const columns = [
    {
      title: "部门",
      dataIndex: "deptname"
    },
    {
      title: "名称",
      align: "left",
      dataIndex: "name",
      slots: { customRender: "name" }
    },
    {
      title: "账户",
      align: "left",
      dataIndex: "acc"
    },
    {
      title: "职务",
      align: "left",
      dataIndex: "post"
    },
    {
      dataIndex: "address",
      slots: { title: "addressTitle" }
    },
    {
      title: "操作",
      dataIndex: "action",
      width: "30%",
      slots: { customRender: "action" },
      align: "center"
    }
  ];
  //表单内容
  const data = [
    {
      id: "1",
      deptid: 1,
      deptname: "部门一",
      acc: "admin",
      name: "zht",
      post: "经理",
      address: "正南街49号"
    },
    {
      id: "2",
      deptid: 2,
      deptname: "部门二",
      name: "王华",
      acc: "112345",
      post: "员工",
      address: "正北街49号"
    }
  ];
</script>
<template>
  <a-form layout="inline">
    <a-form-item name="name" label="用户名称">
      <a-input placeholder="用户名称" />
    </a-form-item>
    <a-form-item name="dept" label="部门选择">
      <a-select style="width: 120px">
        <a-select-option value="1">部门一</a-select-option>
        <a-select-option value="2">部门二</a-select-option>
        <a-select-option value="3">部门三</a-select-option>
        <a-select-option value="4">部门四</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" class="c-button-primary">查询</a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" class="c-button-primary" @click="showDrawer(null)"> <PlusOutlined />新增员工</a-button>
    </a-form-item>
  </a-form>
  <a-divider />
  <a-table :columns="columns" :data-source="data" boered>
    <template #addressTitle>
      <span> 地址 </span>
    </template>
    <template #action="{ record }">
      <a-button type="primary" class="c-button-gree" @click="showDrawer">修改</a-button>
      <a-divider type="vertical" />
      <a-popconfirm title="是否删除?" @confirm="">
        <a>删除</a>
      </a-popconfirm>
    </template>
  </a-table>
  <a-drawer
    title="用户添加"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="closeDrawer"
  >
  </a-drawer>
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
  .c-button-gree {
    color: #fff;
    background-color: #73d13d;
    border-color: #73d13d;
  }
  .c-button-gree:hover {
    color: #fff;
    background-color: #b7eb8f;
    border-color: #b7eb8f;
  }
</style>
