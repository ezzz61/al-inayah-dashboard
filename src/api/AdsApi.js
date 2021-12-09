import Api from "@/api/api";

export default {
  Get() {
    return Api().get("ads/");
  },
  Add(data) {
    return Api().post("ads/", data);
  },
  Delete(id) {
    return Api().delete("ads/" + id);
  },
  Detail(id) {
    return Api().get("ads/" + id);
  },
  Update(id, data) {
    return Api().put("ads/" + id, data);
  },
  Upload(id, data, source) {
    return Api().post("ads/upload/" + id + "?source=" + source, data);
  }
};
