import Api from "@/api/api";

export default {
  Get() {
    return Api().get("category/");
  },
  GetActive() {
    return Api().get("category?active=1");
  },
  Add(data) {
    return Api().post("category/", data);
  },
  Delete(id) {
    return Api().delete("category/" + id);
  },
  Detail(id) {
    return Api().get("category/" + id);
  },
  Update(id, data) {
    return Api().put("category/" + id, data);
  },
  GetTag() {
    return Api().get("category/type");
  },
  GetActiveTag() {
    return Api().get("category/type?active=1");
  },
  AddTag(data) {
    return Api().post("category/type", data);
  },
  DeleteTag(id) {
    return Api().delete("category/type/" + id);
  },
  DetailTag(id) {
    return Api().get("category/type/" + id);
  },
  UpdateTag(id, data) {
    return Api().put("category/type/" + id, data);
  }
};
