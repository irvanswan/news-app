import useSWR from "swr"
import Fetcher from "../../../lib/fetcher"

export const fetchNews = (where) => {
  const getNews = () => Fetcher({
    method : 'GET',
    url: `${process.env.API_URL}/news/`,
    params: {
      limit: where.limit,
      offset : where.offset
    },
  })

  const { data, mutate, error } = useSWR('getNews', getNews, {refreshInterval: 1000 })
  const loading = !data & !error

  return {
    news: data,
    mutateNews: mutate,
    errNews: error,
    loadNews: loading
  }
}
export const searchNews = (where, initialData) =>{
  const searchingNews = async() => await Fetcher({
    method : 'GET',
    url : `${process.env.API_URL}/news/search`,
    params : {
      key : where.key
    }
  })

  const {data, mutate, error} = useSWR(where.key?'search news':null, searchingNews, initialData)
  const loading = !data & !error

  return{
    news: data,
    mutateNews: mutate,
    errNews: error,
    loadNews: loading
  }
}
export const getNews = (where)=>{
  const getNews = () =>Fetcher({
    method : 'GET',
    url : `${process.env.API_URL}/news/`,
    params:{
      id_news : where.id_news
    }
  })

  const {data, mutate, error} = useSWR(where.id_news?'get news':null, getNews, {})
  const loading = !data & !error

  return {
    news: data,
    mutateNews: mutate,
    errNews: error,
    loadNews: loading
  }
}