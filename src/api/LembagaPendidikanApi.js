import Api from "@/api/api";

export default {
  Get() {
    return Api().get("lembaga-pendidikan/");
  },
  Add(data) {
    return Api().post("lembaga-pendidikan/add", data);
  },
  Delete(id) {
    return Api().delete("lembaga-pendidikan/" + id);
  },
  Detail(id) {
    return Api().get("lembaga-pendidikan/" + id);
  },
  Update(id, data) {
    return Api().put("lembaga-pendidikan/" + id, data);
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
