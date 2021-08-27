import { verifyUser } from '../../lib/fetchUsers'
import useSWR from 'swr'

export const getIronSession = () =>{
    const {data, mutate, error} = useSWR('verify user', verifyUser, {refreshInterval: 100 })
    console.log('ini datas', data)
    const loading = !data & !error
    return {
        session: data,
        mutateSession: mutate,
        errSession: error,
        loadSession: loading
    }
}