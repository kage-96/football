'use client'

import { FormEventHandler, useState } from "react"
import { supabase } from "@/utils/supabase"
import { Form } from "../_components/Form"

export default function Signup(){
  const [email,setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit:FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault()

    const {data,error} = await supabase.auth.signUp({
      email,
      password,
      options:{
        emailRedirectTo:`http://localhost:3000/login`,
      },
    })
    if(error){
      alert('登録に失敗しました。')
    }

    if(data.user){
      setEmail('')
      setPassword('')
      await fetch('/api/users',{
        method:"POST",
        headers:{
          "Content-Type": 'application/json'
        },
        body:JSON.stringify({
          id:data.user.id,
          email:data.user.email,
          favorites:[]
        }),
        credentials:"include"
      })
      alert('確認メールを送信しました。')
    }
  }

  return(

    <Form
      onSubmit={handleSubmit}
      isLogin={false}
      buttonTxt="アカウント作成する"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  )
}