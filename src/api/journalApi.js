import axios from  'axios'

const journalApi = axios.create({
    baseURL: 'https://eventos-38be9.firebaseio.com'
})

export default journalApi