// import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import env from "env.mjs"
import { cache } from "react"

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
async function getSessionUser() {
  const supabase = createClient()
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export const getSession = cache(getSessionUser)

export const getUserInfo = cache(async () => {
  const sessionUser = await getSession()

  if (!sessionUser) {
    return null
  }

  const supabase = createClient()
  try {
    const { data } = await supabase.from("profile").select("name, picture").eq("id", sessionUser.id).single()

    return { auth_user: sessionUser, ...data }
  } catch (error) {
    console.error("Error:", error)
    return null
  }
})
