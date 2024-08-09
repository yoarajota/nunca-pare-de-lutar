"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import Form from "./Form"
import List from "./List"
import { useState } from "react"

export default function Dashboard({
  isBlocked,
  submit,
  data,
  user,
}: {
  isBlocked: boolean
  submit: (values: any) => Promise<{ error: string | null }>
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
  user: any
}) {
  // @ts-ignore
  const [listData, setListData] = useState(data)

  const today = new Date().toLocaleDateString()

  return (
    <>
      <Card className="w-full shrink-0 p-8">
        <Form
          user={user}
          isBlocked={isBlocked}
          submit={submit}
          setListData={setListData}
          defaultObject={{
            custom_name: user?.name ?? null,
          }}
        />
      </Card>
      <div className="w-full shrink-0">
        <Card>
          <CardHeader>
            <CardTitle>Lista {today}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <List data={listData} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
