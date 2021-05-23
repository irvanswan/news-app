import useSWR from 'swr'

const useNews = () =>{
    const {mutate : mutateNews, error, data :news } = useSWR('api/news')
    return {mutateNews, news, error}
}
export default useNews()