"use client"

import useAuth from "@lib/store/auth"
import Script from "next/script"
import { useEffect } from "react"

import { useRouter } from "next/navigation"

export default function Web() {
  const { signIn } = useAuth()
  const router = useRouter()

  // @ts-ignore
  window.handleCredentialResponse = async (response: { credential: string }) => {
    await signIn(response.credential)

    router.push("/dashboard", { scroll: false })
  }

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async />

      <div
        id="g_id_onload"
        data-client_id="241589987239-rd0lq7urchqffe72abaocco8ks7ck316" // Remove hardcoded asap
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleCredentialResponse"
        data-nonce=""
        data-auto_select="true"
        data-itp_support="true"
        data-use_fedcm_for_prompt="true"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  )
}
