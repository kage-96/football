import { FC, useEffect, useState } from "react"

interface Props {
  url:string
  method:"GET" | "POST" | "DELETE" | "PUT"
}
export const useFetcher = <T,>({url,method}:Props) => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error,setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetcher = async () => {
      try{
        setIsLoading(true)
        const res = await fetch(url,{
          method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
        if(res.status === 429){
          console.log('Too many request')
        }
        if(res.ok){
          const data:T = await res.json()
          setData(data)
        }

      }catch(e){
        setError(e as Error)

      }finally{
        setIsLoading(false)
      }
      
    }
    fetcher()
    
  }, [url])
  return {data,isLoading,error}
}