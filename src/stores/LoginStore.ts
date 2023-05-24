import { defineStore } from "pinia";
import dao from "@/axios/CommApiDao";
export const useLoginStore = defineStore("userPojo", {
  state: () => ({
    userid: "",
    user: {},
    jwt: "",
    mesages: ""
  }),
  getters: {
    getToken: (state) => {
      return state.jwt;
    },
    getMeg: (state) => {
      return state.mesages;
    }
  },
  actions: {
    async onLogin(name: string, passwod: string) {
      if (name == "" || passwod == "") {
        this.mesages = "用户名称与密码不能为空";
        return "errer";
      }
      const req = await dao.postAsyn("api/sys/onlogin", { name: name });
      if (req.code != "00") {
        this.mesages = "用户名称与密码有错误";
        return "errer";
      }
      this.jwt = req.jwt;
      this.user = req.user;
      //req.defaults.headers.common['Authorization'] = `Bearer `+this.jwt;
      return "suc";
    },
    goClose(meg: string) {
      this.jwt = "";
      this.mesages = meg;
    }
  },
  persist: {
    enabled: true, // 这个配置代表存储生效，而且是整个store都存储
    strategies: [{ storage: localStorage, paths: ["jwt"] }]
  }
});
