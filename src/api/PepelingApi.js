import Api from "@/api/api";

export default {
  Get() {
    return Api().get("pepeling/");
  },
  Add(data) {
    return Api().post("pepeling/add", data);
  },
  Delete(id) {
    return Api().delete("pepeling/" + id);
  },
  Detail(id) {
    return Api().get("pepeling/" + id);
  },
  Update(id, data) {
    return Api().put("pepeling/" + id, data);
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
