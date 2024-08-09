import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { createClient, getUserInfo } from "@lib/supabase/server"
import Dashboard from "resources/dashboard"

export const revalidate = 10

async function getData() {
  // Start of today
  const start = new Date()
  start.setHours(0, 0, 0, 0)

  // End of today
  const end = new Date()
  end.setHours(23, 59, 59, 999)

  const { data, error } = await createClient()
    .from("list")
    .select("*, profiles(*)")
    .gte("created_at", start.toISOString())
    .lte("created_at", end.toISOString())
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
