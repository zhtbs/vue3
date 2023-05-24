import apiAjax from "./ajax-common";
class CommApiDao {
  get(url: string, data: any): Promise<any> {
    return apiAjax.get(url, data);
  }
  post(url: string, data: any): Promise<any> {
    return apiAjax.post(url, data);
  }
  public async postAsyn(url: string, data: any) {
    const re = await this.post(url, data);
    return re.data;
  }
  async getAsyn(url: string, data: any) {
    const res = await this.get(url, data);
    return res.data;
  }
}
export default new CommApiDao();
