import Api from "@/api/api";

export default {
  Get() {
    return Api().get("bagian-pengasuh/");
  },
  Add(data) {
    return Api().post("bagian-pengasuh/add", data);
  },
  Delete(id) {
    return Api().delete("bagian-pengasuh/" + id);
  },
  Detail(id) {
    return Api().get("bagian-pengasuh/" + id);
  },
  Update(id, data) {
    return Api().put("bagian-pengasuh/" + id, data);
  },
  Upload(id, data, source) {
    return Api().post("article/upload/" + id + "?source=" + source, data);
  },
  UploadBanner(id, data, source) {
    return Api().post(
      "article/upload_banner/" + id + "?source=" + source,
      data
    );
  }
};
