'use client'

import { Dispatch, FC, FormEvent, SetStateAction } from "react"
import { Button } from "../_components/Button"
import { Field } from "./Field"
import Link from "next/link"

interface Props {
  onSubmit:(e:FormEvent<HTMLFormElement>) => void
  isLogin:boolean
  buttonTxt:string
  email:string
  password:string
  setEmail:Dispatch<SetStateAction<string>>
  setPassword:Dispatch<SetStateAction<string>>
}

export const Form:FC<Props> = ({onSubmit,isLogin,buttonTxt,email,setEmail,password,setPassword}) => {

  return(

    <div className="flex justify-center items-center flex-col">
      <form action="" className="max-w-[400px] w-full" onSubmit={onSubmit}>
        <Field
          htmlFor_inputId="email"
          labelTxt="メールアドレス"
          type='email'
          placeholder="example@test.com"
          value={email}
          onChange={setEmail}
         />

        <Field
          htmlFor_inputId="password"
          labelTxt="パスワード"
          type='password'
          placeholder="⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎"
          value={password}
          onChange={setPassword}
         />

        <Button type='submit' text={buttonTxt} />
      </form>

      {isLogin
      ?(
        <div className="text-center mt-6">
          {/* <p className="underline">パスワードを忘れた方はこちら</p> */}
          <Link href='/signup' className="mt-6 block pt-6 border-t w-full">アカウント作成</Link>
        </div>
      )
    :''}

    </div>
  )
}