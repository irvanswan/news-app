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

  const { data, mutate, error } = useSWR('getNews', getNews, {})
  const loading = !data & !error

  return {
    news: data,
    mutateNews: mutate,
    errNews: error,
    loadNews: loading
  }
}