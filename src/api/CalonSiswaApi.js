import Api from "@/api/api";

export default {
  Get() {
    return Api().get("calon-siswa/");
  },
  Add(data) {
    return Api().post("calon-siswa/add", data);
  },
  Delete(id) {
    return Api().delete("calon-siswa/" + id);
  },
  Detail(id) {
    return Api().get("calon-siswa/" + id);
  },
  Update(id, data) {
    return Api().put("calon-siswa/" + id, data);
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
