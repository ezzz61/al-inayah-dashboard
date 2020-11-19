import Api from '@/api/api'

export default {
  Get() {
    return Api().get('tenant/')
  },
  Add(data) {
    return Api().post('tenant/', data)
  },
  Delete(id) {
    return Api().delete('tenant/' + id)
  },
  Detail(id) {
    return Api().get('tenant/' + id)
  },
  Update(id, data) {
    return Api().put('tenant/' + id, data)
  },
  Upload(id, data) {
    return Api().post('tenant/upload/' + id, data)
  }
}