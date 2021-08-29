import useSWR from "swr";
import Fetcher from "lib/fetcher";

export const getAllComment = (id_news)=>{
        const getComments = () =>Fetcher({
          method : 'GET',
          url : `${process.env.API_URL}/comments/${id_news}`,
        })
      
        const {data, mutate, error} = useSWR(where.id_news?'get news':null, getComments, {})
        const loading = !data & !error
      
        return {
          news: data,
          mutateNews: mutate,
          errNews: error,
          loadNews: loading
        }
}