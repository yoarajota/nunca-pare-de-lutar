import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { createClient } from "@lib/supabase/server"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import Form from "resources/dashboard/Form"

async function getData() {
  const { data, error } = await createClient().from("list").select("*, profile(*)")
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!data || error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(error.message)
  }

  return data
}

export default async function Web() {
  const data = await getData()

  const today = new Date().toLocaleDateString()

  async function submit(values) {
    "use server"

    console.log(values)

    const { data, error } = await createClient().from("list").insert(values)

    console.log(data)

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  }

  return (
    <div className="mx-auto flex min-h-screen h-auto w-1/2 max-w-2xl flex-col items-center justify-center gap-8">
      <Card className="w-full shrink-0 p-8">
        <Form
          submit={submit}
          defaultObject={{
            custom_name: "Custom Name",
          }}
        />
      </Card>
      <div className="h-[65vh] w-full shrink-0">
        <Card>
          <CardHeader>
            <CardTitle>Lista {today}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {data.length &&
              data.map((item) => (
                <div className="flex items-center gap-4" key={item.id}>
                  <span>{item.is_rest_day ? "❌" : "✅"}</span>

                  <Avatar className="hidden size-9 sm:flex">
                    <AvatarImage src={item.picture} alt="Avatar" />
                    <AvatarFallback className="flex size-full items-center justify-center">
                      {item.profile.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold leading-none">{item.profile.name}</p>
                    <p className="text-sm leading-none">{item.description}</p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
