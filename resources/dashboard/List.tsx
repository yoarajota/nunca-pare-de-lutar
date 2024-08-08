"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"

type ListProps = {
  data: {
    id: number
    is_rest_day: boolean
    custom_name: string
    description: string
    profiles: {
      name: string
      picture: string
    }
  }[]
}

export default function List({ data }: ListProps) {
  return (
    <>
      {data.length === 0 && <p>lista vazia nessa porra</p>}
      {data.map((item) => (
        <div className="flex items-center gap-4" key={item.id}>
          <span>{item.is_rest_day ? "❌" : "✅"}</span>

          <Avatar className="hidden size-9 sm:flex">
            <AvatarImage src={item.profiles.picture} alt="Avatar" />
            <AvatarFallback className="flex size-full items-center justify-center">
              {item.profiles.name[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold leading-none">{item.profiles.name}</p>
            <div
              style={{
                whiteSpace: "pre-wrap",
              }}
              className="text-sm leading-none"
            >
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
