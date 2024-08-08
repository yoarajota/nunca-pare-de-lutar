"use client"

import { Checkbox } from "@components/ui/checkbox"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { custom } from "zod"
import { useReducer } from "react"
import { ArrowDownToDot, Save } from "lucide-react"
import { toast } from "sonner"

type CheckboxDemoProps = {
  submit: (values: any) => boolean
  defaultObject: any
}

export default function Form({ submit, defaultObject }: CheckboxDemoProps) {
  // Reducer to handle state
  const [state, dispatch] = useReducer(
    (state, action) => {
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

    const { error } = await submit(state)

    if (!error) {
      dispatch({ type: "RESET FORM" })
      toast("boa monstro")

      return
    }

    toast(error ?? "deu ruim")
  }

  return (
    <form className="flex items-center gap-6" onSubmit={handleSubmit}>
      <Checkbox
        id="is_rest_day"
        checked={state.is_rest_day}
        onCheckedChange={(value) => dispatch({ type: "REST_DAY", payload: value })}
      />
      <div>
        <label htmlFor="is_rest_day">{state.is_rest_day ? "❌" : "✅"}</label>
      </div>

      <div className="flex w-full flex-col gap-2">
        <Input
          placeholder="Nome da Lenda"
          value={state.custom_name}
          onChange={(e) => dispatch({ type: "CUSTOM_NAME", payload: e.target.value })}
        />
        <Input
          placeholder="Descrição do Treino"
          value={state.description}
          onChange={(e) => dispatch({ type: "DESCRIPTION", payload: e.target.value })}
        />
      </div>

      <Button type="submit" variant="outline">
        <Save size={18} />
      </Button>
    </form>
  )
}
