import axios from 'axios'

export default () => {
  return axios.create({
    //DEVOPS
    // baseURL: `https://queueserver.azurewebsites.net` 

    //PRODUCTION
    // baseURL: `https://eunoiaqueue.azurewebsites.net`

    //LOCAL
    baseURL: `http://127.0.0.1:8081`
  })
}
