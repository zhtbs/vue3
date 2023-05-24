<template>
  <div class="container">
    <div class="query-form">
      <!-- 查询表单 -->
      <a-form :form="form" layout="inline" @submit="handleSubmit">
        <a-form-item label="部门">
          <a-select v-model="form.department" :options="departments" placeholder="请选择部门" />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-model="form.name" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="职务">
          <a-input v-model="form.position" placeholder="请输入职务" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">查询</a-button>
        </a-form-item>

        <a-button type="primary" @click="showDrawer = true">添加</a-button>
        <a-drawer
          title="添加用户"
          :visible="showDrawer"
          :closable="true"
          :mask-closable="true"
          @close="showDrawer = false"
          width="40%"
        >
 
        </a-drawer>    
      </a-form>
    </div>
    <div class="user-list">
      <!-- 用户列表 -->
      <a-table :columns="columns" :dataSource="dataSource" />
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({
      department: '',
      name: '',
      position: '',
    });

    const departments = [
      { value: '部门1', label: '部门1' },
      { value: '部门2', label: '部门2' },
      { value: '部门3', label: '部门3' },
      // 其他部门选项
    ];

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: '职务',
        dataIndex: 'position',
        key: 'position',
      },
      // 其他列的配置
    ];

    const dataSource = [];

    const handleSubmit = () => {
      // 调用接口查询用户列表数据
      getEmployeeList(form).then((data) => {
        dataSource = data;
      });
    };

    const showDrawer=false;

    return {
      form,
      departments,
      columns,
      dataSource,
      handleSubmit,
      showDrawer
    };
  },
};
</script>