"use client"

import { Auth0Provider } from "@auth0/auth0-react"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()

  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || "dev-example.auth0.com"
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || "exampleClientId"
  const redirectUri = typeof window !== "undefined" ? window.location.origin : ""

  const onRedirectCallback = (appState: any) => {
    router.push(appState?.returnTo || window.location.pathname as string)
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
