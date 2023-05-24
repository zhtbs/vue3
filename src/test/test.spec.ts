import { mount } from "@vue/test-utils";
import app from "../App.vue";
import dao from "../axios/CommApiDao";
import axios from "axios";
// jest.mock('axios', () => ({
//   get: jest.fn().mockImplementation(() =>
//     Promise.resolve({
//       data: [
//         { id: 1, name: 'Leanne Graham' },
//         { id: 2, name: 'Ervin Howell' },
//       ],
//     })
//   ),
// }));
describe("dao", () => {
  it("mount 会读取子组件内容", async () => {
    const rs = dao.postAsyn("https://jsonplaceholder.typicode.com/posts", { id: 112 });
    rs.then((e) => {
      console.log("1111");
    });
  });
});
