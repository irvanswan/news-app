import axios from 'axios'

/* const fetchData = async () => await axios.get(`${process.env.API_URL}/news`)
  .then(res => ({
    error: false,
    news: res.data,
  }))
  .catch(() => ({
      error: true,
      news: null,
    }),
); */

const getNews = async(url) => axios.get(url).then(res => res.data)
const searchNews = async(url)=> axios.get(url).then(res => res.data)
const addNews = async(url, data, cb, cb2)=>{
  cb(true)
  axios.post(url, data).then(result=>{
      cb(false)
      alert(result.data.message)
  }).catch(error =>{
      cb(false)
      alert('Failed')
  })
}

export { getNews, searchNews, addNews }