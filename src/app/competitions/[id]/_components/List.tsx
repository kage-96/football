import Link from "next/link"
import { usePathname } from "next/navigation";

interface Props {
  path:string
  children: React.ReactNode;
}

export const List = ({path,children}:Props) => {
  const pathname = usePathname();
  return(
    <li>
      <Link
        href={path}
        className={`
          text-gray-900
          py-2
          px-6
          rounded-2xl
          bg-gray-200
          ${path === pathname ? 
            'border border-gray-700'
            :
            'pointer shadow-md hover:bg-gray-300'
          }
          `}>
        {children}
      </Link>
    </li>
  )
}