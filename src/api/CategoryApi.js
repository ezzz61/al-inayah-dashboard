import Api from '@/api/api'

export default {
  Get() {
    return Api().get('category/')
  },
  GetActive() {
    return Api().get('category?active=1')
  },
  Add(data) {
    return Api().post('category/', data)
  },
  Delete(id) {
    return Api().delete('category/' + id)
  },
  Detail(id) {
    return Api().get('category/' + id)
  },
  Update(id, data) {
    return Api().put('category/' + id, data)
  }
}