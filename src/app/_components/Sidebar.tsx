'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      <ul className='fixed left-0 top-0 w-[280px] h-screen bg-gray-100 py-6 z-[100] mt-12'>
        {pathname.includes('admin')
        && (
          <li className="">
            <Link
              href='/admin/users'
              className={`p-3 block border-b border-gray-300 hover:bg-gray-200 ${pathname.includes('/users') ? 'bg-gray-200' : ''}`}>
                ユーザー一覧
            </Link>
          </li>
        )
    }
      </ul>
    </>
  );
}
