"use client"

import { Checkbox } from "@components/ui/checkbox"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { useReducer, useState } from "react"
import { Save } from "lucide-react"
import { toast } from "sonner"
import { Textarea } from "@components/ui/textarea"
import { cn } from "@lib/utils"

type CheckboxDemoProps = {
  submit: (values: any) => Promise<{ error: string | null }>
  defaultObject: any
  isBlocked: boolean
  setListData: (prev: any) => void
  user: any
}

export default function Form({ submit, defaultObject, isBlocked = false, user, setListData }: CheckboxDemoProps) {
  const [formBlocked, setFormBlocked] = useState(isBlocked)
  const [loading, setLoading] = useState(false)

  const [state, dispatch] = useReducer(
    (state: any, action: any) => {
      switch (action.type) {
        case "REST_DAY":
          return { ...state, is_rest_day: action.payload }
        case "CUSTOM_NAME":
          return { ...state, custom_name: action.payload }
        case "DESCRIPTION":
          return { ...state, description: action.payload }
        case "RESET FORM":
          return {
            is_rest_day: true,
            custom_name: "",
            description: "",
          }
        default:
          return state
      }
    },
    {
      is_rest_day: true,
      custom_name: "",
      description: "",
      ...defaultObject,
    }
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (formBlocked || loading) {
      return
    }

    setLoading(true)

    const { error } = await submit(state)

    setLoading(false)

    if (!error) {
      toast("boa monstro")
      setFormBlocked(true)
      setListData((prev: any) => [
        {
          ...state,
          id: new Date().getTime(),
          is_rest_day: !state.is_rest_day,
          profiles: {
            name: user.name,
            picture: user.picture,
          },
        },
        ...prev,
      ])

      dispatch({ type: "RESET FORM" })

      return
    }

    toast(error ?? "deu ruim")
  }

  return (
    <form className={cn("flex flex-col items-center gap-4 p-6 sm:flex-row")} onSubmit={handleSubmit}>
      <div className="flex items-center gap-4">
        <Checkbox
          disabled={formBlocked}
          id="is_rest_day"
          checked={state.is_rest_day}
          onCheckedChange={(value) => dispatch({ type: "REST_DAY", payload: value })}
        />
        <div>
          <label htmlFor="is_rest_day">{!state.is_rest_day ? "❌" : "✅"}</label>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Input
          disabled={formBlocked}
          placeholder="Nome da Lenda"
          value={state.custom_name}
          onChange={(e) => dispatch({ type: "CUSTOM_NAME", payload: e.target.value })}
        />
        <Textarea
          disabled={formBlocked}
          placeholder="Descrição do Treino"
          value={state.description}
          onChange={(e) => dispatch({ type: "DESCRIPTION", payload: e.target.value })}
        />
      </div>

      <Button type="submit" variant="outline" disabled={formBlocked}>
        <Save size={18} />
      </Button>
    </form>
  )
}
