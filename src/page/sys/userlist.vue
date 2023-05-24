<script setup lang="ts">
  import { SmileOutlined, PlusOutlined } from "@ant-design/icons-vue";
  import saveuser from "@/page/sys/usersave.vue";
  import { ref } from "vue";
  const visible = ref<boolean>(false);
  const userpojo = ref<Object>({});
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
  const data = [
    {
      id: "1",
      deptid: 1,
      deptname: "部门一",
      acc: "32234",
      name: "zht",
      post: "经理",
      address: "*********"
    },
    {
      id: "2",
      deptid: 2,
      deptname: "部门二",
      name: "lt",
      acc: "1233",
      post: "经理",
      address: "*********"
    },
    {
      id: "8",
      deptid: 2,
      deptname: "部门二",
      name: "122",
      acc: "554",
      post: "经理",
      address: "*********"
    },
    {
      id: "9",
      deptid: 3,
      deptname: "部门三",
      name: "oo",
      acc: "3444",
      post: "经理",
      address: "*********"
    }
  ];

  const showDrawer = (user: any) => {
    visible.value = true;
    userpojo.value = user == null ? {} : user;
  };
  const closeDrawer = () => {
    console.log("====>");
    visible.value = false;
  };
</script>
<template>
  <div class="box">
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
        <span> <SmileOutlined />地址 </span>
      </template>
      <template #name="{ text }">
        <a> <a-icon type="smile-o" />{{ text }}</a>
      </template>
      <template #action="{ record }">
        <a-button type="primary" class="c-button-gree" @click="showDrawer(record)">修改</a-button>
        <a-divider type="vertical" />
        <a-popconfirm title="是否删除?" @confirm="" ok-text="确定" cancel-text="取消">
          <a>删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>

  <a-drawer
    title="用户添加"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="closeDrawer"
  >
    <saveuser v-model:userpojo="userpojo" v-on:onclore="closeDrawer"> </saveuser>
  </a-drawer>
</template>
<style scoped>
  .box {
    width: 100%;
    background-color: "#fff";
    height: "100%";
  }
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
