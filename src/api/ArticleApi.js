import Api from "@/api/api";

export default {
  Get() {
    return Api().get("article/");
  },
  Add(data) {
    return Api().post("article/", data);
  },
  Delete(id) {
    return Api().delete("article/" + id);
  },
  Detail(id) {
    return Api().get("article/" + id);
  },
  Update(id, data) {
    return Api().put("article/" + id, data);
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
