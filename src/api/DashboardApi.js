import Api from '@/api/api'

export default {
  Get() {
    return Api().get('dashboard/')
  }
}