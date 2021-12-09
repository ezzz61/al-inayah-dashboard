import Api from "@/api/api";

export default {
  Get() {
    return Api().get("talent/");
  },
  Add(data) {
    return Api().post("talent/", data);
  },
  Delete(id) {
    return Api().delete("talent/" + id);
  },
  Detail(id) {
    return Api().get("talent/" + id);
  },
  Update(id, data) {
    return Api().put("talent/" + id, data);
  },
  Upload(id, data, source) {
    return Api().post("talent/upload/" + id + "?source=" + source, data);
  }
  // UploadBanner(id, data, source) {
  //   return Api().post(
  //     "article/upload_banner/" + id + "?source=" + source,
  //     data
  //   );
  // }
};
