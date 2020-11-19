import Api from '@/api/api'

export default {
  Get() {
    return Api().get('event/')
  },
  Add(data) {
    return Api().post('event/', data)
  },
  Delete(id) {
    return Api().delete('event/' + id)
  },
  Detail(id) {
    return Api().get('event/' + id)
  },
  Update(id, data) {
    return Api().put('event/' + id, data)
  },
  Upload(id, data) {
    return Api().post('event/upload/' + id, data)
  }
}