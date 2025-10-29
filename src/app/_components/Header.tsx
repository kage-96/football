'use client'

import Link from "next/link"
import { FC, useState } from "react"
import { useSupabaseSession } from "../_hooks/useSupabaseSession"
import { useFetcher } from "../_hooks/useFetcher"
import { usePathname } from "next/navigation"
import { CompetitionType } from "../types/CompetitionsType"

export const Header:FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { session } = useSupabaseSession();
  const pathname = usePathname()
  const {data,isLoading,error} = useFetcher<CompetitionType[]>(
    {
      url : '/api/competitions',
      method:"GET"
    }
  )

  const handleClickMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // if(!data) return <p>ユーザーがいません。</p>

  return(
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white font-bold py-4 px-6 z-[1000] ">
      <div className="flex items-center max-md:justify-between">
        <Link href='/' className="md:mr-4">
          <h1 className="text-2xl font-bold whitespace-nowrap">Football App</h1>
        </Link>

        <button type='button' onClick={handleClickMobileMenuToggle} className="max-md:block relative w-[16px] h-[12px] md:hidden">
          <span className="absolute top-0 block w-full h-px bg-white"></span>
          <span className="absolute top-[50%] translate-y-[-50%] block w-full h-px bg-white"></span>
          <span className="absolute bottom-0 block w-full h-px bg-white"></span>
        </button>

        {!isLoading && (

          <nav className={`
            max-md:h-screen
            max-md:bg-gray-800/90
            max-md:absolute
            max-md:top-[60px]
            max-md:left-0
            max-md:px-6
            max-md:py-4
            transition-all
            duration-300
            ease-in-out
            ${!isMobileMenuOpen && 'max-md:opacity-0 max-md:pointer-events-none'}
            justify-between
            w-full
            md:flex
            md:items-center
            `}
            >

            <ul className="md:flex">
            {data?.map((competition) => (
              <li className='md:mr-4 max-md:mb-2 max-md:pb-2 list-none' key={competition.id}>
              <Link
                href={`/competitions/${competition.id}/standings`}
                className={`md:hover:underline ${pathname.includes(competition.id.toString()) && 'md:underline'}`}
                onClick={handleClickMobileMenuToggle}
                >
                {competition.name}
              </Link>
              </li>
            ))}
            </ul>

          {session ?(
            <Link
              href='/account'
              className={`hover:underline ${pathname.includes('/account') && 'underline'}`}
              onClick={handleClickMobileMenuToggle}
              >
              アカウント
            </Link>
          ):(
            <Link href="/login" className="hover:underline"onClick={handleClickMobileMenuToggle}>ログイン</Link>
          )
        }
        </nav>
          )}
        
      </div>
    </header>
  )
}