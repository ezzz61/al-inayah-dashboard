import Api from "@/api/api";

export default {
  Get() {
    return Api().get("pengumuman/");
  },
  Add(data) {
    return Api().post("pengumuman/add", data);
  },
  Delete(id) {
    return Api().delete("pengumuman/" + id);
  },
  Detail(id) {
    return Api().get("pengumuman/" + id);
  },
  Update(id, data) {
    return Api().put("pengumuman/" + id, data);
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
