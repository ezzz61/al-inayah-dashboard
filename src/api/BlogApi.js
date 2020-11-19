import Api from '@/api/api'

export default {
  Get() {
    return Api().get('blog/')
  },
  Add(data) {
    return Api().post('blog/', data)
  },
  Delete(id) {
    return Api().delete('blog/' + id)
  },
  Detail(id) {
    return Api().get('blog/' + id)
  },
  Update(id, data) {
    return Api().put('blog/' + id, data)
  },
  Upload(id, data) {
    return Api().post('blog/upload/' + id, data)
  }
}