import Api from "@/api/api";

export default {
  Get() {
    return Api().get("faq/");
  },
  GetAll() {
    return Api().get("faq/all");
  },
  GetActive() {
    return Api().get("faq?active=1");
  },
  Add(data) {
    return Api().post("faq/", data);
  },
  Delete(id) {
    return Api().delete("faq/" + id);
  },
  Detail(id) {
    return Api().get("faq/" + id);
  },
  Update(id, data) {
    return Api().put("faq/" + id, data);
  },
  GetFaqCategory() {
    return Api().get("faq/category");
  },
  GetActiveFaqCategory() {
    return Api().get("faq/category?active=1");
  },
  AddFaqCategory(data) {
    return Api().post("faq/category", data);
  },
  DeleteFaqCategory(id) {
    return Api().delete("faq/category/" + id);
  },
  DetailFaqCategory(id) {
    return Api().get("faq/category/" + id);
  },
  UpdateFaqCategory(id, data) {
    return Api().put("faq/category/" + id, data);
  }
};
