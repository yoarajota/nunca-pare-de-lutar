import { type Session, type User } from "@supabase/supabase-js"

type AuthState = {
  user: User | null
  session: Session | null
  fetching: boolean
  fetched: boolean
}

type AuthActions = {
  init: () => Promise<void>
  signIn: (credential: string) => Promise<void>
}

export type UseAuth = AuthState & AuthActions
