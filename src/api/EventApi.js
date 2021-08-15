import Api from '@/api/api'

export default {
  Get(type) {
    if (type) return Api().get('event/?source=verification')
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
  },
  Finish(id) {
    return Api().put('/event/finish/' + id)
  },
}