'use client'

import { FormEvent, useState } from "react"
import { supabase } from "@/utils/supabase"
import { useRouter } from "next/navigation"
import { Form } from "../_components/Form"

export default function Signup(){
  const [email,setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const {error} = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if(error){
      alert('ログインに失敗しました。')
    }else{
      const { data: { session } } = await supabase.auth.getSession();
      console.log(session)
      router.replace('/');
    }
  }

  return(

      <Form
        onSubmit={handleSubmit}
        isLogin={true}
        buttonTxt='ログイン'
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

  )
}