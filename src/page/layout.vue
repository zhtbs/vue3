<script setup lang="ts">
  import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from "@ant-design/icons-vue";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import dao from "@/axios/CommApiDao";
  const router = useRouter();
  let collapsed = ref(false);
  dao.postAsyn("api/sys/userlist", {});
  const menus = [
    {
      name: "系统管理",
      id: 10000,
      child: [
        { name: "用户管理", id: 100001, path: "/userlist" },
        { name: "部门管理", id: 100002, path: "/userlistb" }
      ]
    },
    {
      name: "业务管理",
      id: 20000,
      child: [
        { name: "任务甘特图", id: 20001, path: "/tankPlan" },
        { name: "工单管理", id: 20002, path: "/userlistc" }
      ]
    }
  ];
  const onpage = (cnus: any) => {
    router.push({ path: cnus.path });
  };
</script>
<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">Ant UI</div>
      <a-menu mode="inline" theme="dark" :inline-collapsed="collapsed">
        <template v-for="nus in menus" :key="nus.id">
          <a-sub-menu>
            <template #icon>
              <PieChartOutlined />
            </template>
            <template #title>{{ nus.name }}</template>
            <template v-for="cnus in nus.child" :key="cnus.id">
              <a-menu-item @click="onpage(cnus)">{{ cnus.name }}</a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout class="ant-layout">
      <a-layout-header style="background: #fff; padding: 0">
        <a-row>
          <a-col :span="3">
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          </a-col>
          <a-col :span="6" :offset="14">
            <div style="float: right">
              <span>
                <a-avatar size="small">
                  <template #icon><UserOutlined /></template> </a-avatar
                ><span class="sysfont">系统设置</span>
              </span>

              <a-avatar size="large">
                <template #icon><UserOutlined /></template>
              </a-avatar>
            </div>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content
        class="layout-content"
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '550px',
          minWidth: '700px',
          overflow: 'auto'
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
  .layout-content {
    flex: none;
  }
  .ant-layout {
    height: 100vh;
    overflow: auto;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .logo {
    height: 32px;
    color: white;
    font-size: 19px;
    font-weight: 700;
    margin: 15px;
  }
  .sysfont {
    padding-left: 8px;
    padding-right: 30px;
    font-size: 14px;
  }
</style>
