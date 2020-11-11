import Api from '@/api/api'

export default {
  Login(param) {
    return Api().post('admin/login', param)
  }
}