import axios, { AxiosInstance } from "axios";
import { useLoginStore } from "@/stores/LoginStore";
const apiAjax: AxiosInstance = axios.create({
  // 后台的URL路径
  //baseURL: "http://localhost:8099",
  headers: {
    "Content-type": "application/json"
  }
});
apiAjax.interceptors.request.use(
  (config) => {
    const userstore = useLoginStore();
    const token = userstore.getToken;
    config.headers["token"] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiAjax.interceptors.response.use(
  (response) => {
    if (response.data.state != undefined) {
      if (!response.data.state) {
        const userstore = useLoginStore();
        userstore.goClose(response.data.msg);
      }
    }
    return response;
  },
  (error) => {
    console.log(`[Axios Error]`, error);
    const userstore = useLoginStore();
    userstore.goClose("网络错误");
    return Promise.reject(error);
  }
);

export default apiAjax;
