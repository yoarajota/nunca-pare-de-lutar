import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { createClient, getUserInfo } from "@lib/supabase/server"
import Dashboard from "resources/dashboard"

export const revalidate = 10

function getCurrentTimeInTimezone(timezoneOffset: number) {
  const now = new Date()

  return new Date(now.getTime() + timezoneOffset * 60 * 1000)
}

async function getData() {
  const timezoneOffset = -180 // São Paulo está 180 minutos (3 horas) atrás do UTC

  // Start of today
  const start = getCurrentTimeInTimezone(timezoneOffset)
  start.setHours(0, 0, 0, 0)

  // End of today
  const end = getCurrentTimeInTimezone(timezoneOffset)
  end.setHours(23, 59, 59, 999)

  const { data, error } = await createClient()
    .from("list")
    .select("*, profiles(*)")
    .gte("created_at", start.toUTCString())
    .lte("created_at", end.toUTCString())
    .order("created_at", { ascending: false })

  if (!data || error) {
    throw new Error(error.message)
  }

  return data
}

export default async function Web() {
  const data = await getData()
  const user = await getUserInfo()

  const isBlocked = data.some((item) => item.profiles.id === user?.auth_user?.id)

  async function submit(values: {
    custom_name: string
    is_rest_day: boolean
    description: string
  }): Promise<{ error: string | null }> {
    "use server"

    const { error } = await createClient()
      .from("list")
      .insert({ ...values, is_rest_day: !values.is_rest_day })

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  }

  return (
    <div className="mx-auto flex h-auto min-h-screen w-3/4 max-w-2xl flex-col items-center gap-8 py-12 lg:w-1/2">
      <Dashboard isBlocked={isBlocked} submit={submit} data={data} user={user} />
    </div>
  )
}
