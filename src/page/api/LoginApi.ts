import dao from "@/axios/CommApiDao";
const loginUser = async (name: string, paswd: string) => {
  const rs = dao.postAsyn("http://localhost:8099/sys/onlogin", { name: 112 });
  rs.then((e) => {
    console.log(e);
  });
};
