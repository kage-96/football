'use client'

import { useParams } from "next/navigation"
import { List } from "./List"

const TabList = [
  {"url":"standings","value":"順位"},
  {"url":"matches","value":"日程"},
  {"url":"scorers","value":"得点"},
]

export const Tabs = () => {
  const {id} = useParams()

  return(
      <ul className="flex items-center justify-between max-w-[360px] mx-auto mb-4">
        {TabList.map((tab) => (
          <List
            key={tab.value}
            path={`/competitions/${id}/${tab.url}`}
          >
          {tab.value}
        </List>
        ))}
      </ul>
  )
}