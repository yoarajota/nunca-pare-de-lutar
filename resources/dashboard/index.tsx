"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import Form from "./Form"
import List from "./List"
import { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"

type history = {
  created_at: string
  custom_name: string
  description: string
  id: number
  is_rest_day: boolean
  profiles: {
    name: string
    picture: string
  }
}

type groupedHistory = {
  [date: string]: history[]
}

export default function Dashboard({
  isBlocked,
  submit,
  data,
  user,
  getList,
}: {
  isBlocked: boolean
  submit: (values: any) => Promise<{ error: string | null }>
  getList: () => Promise<history[]>
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
  //@ts - ignore
  const [listData, setListData] = useState(data)
  const [historyData, setHistoryData] = useState<groupedHistory>({})

  const today = new Date().toLocaleDateString()

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString()
  }

  function groupByDate(data: history[]): groupedHistory {
    return data.reduce((acc: groupedHistory, item: history) => {
      const dateKey: string = formatDate(item.created_at)

      if (!acc[dateKey]) {
        acc[dateKey] = []
      }
      acc[dateKey].push(item)

      return acc
    }, {})
  }

  useEffect(() => {
    getList().then((response) => {
      console.log(response)
      const groupedData = groupByDate(response)
      setHistoryData(groupedData)
    })
  }, [getList])

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
        <Card className="mt-10">
          <CardHeader>
            <CardTitle>Lista Anteriores</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Accordion collapsible type="single">
              {Object.entries(historyData)
                .filter(([date]) => date !== today)
                .reverse()
                .map(([date, items]) => (
                  <AccordionItem key={date} value={date}>
                    <AccordionTrigger className="pb-3">{date}</AccordionTrigger>
                    <AccordionContent>
                      <List data={items} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
