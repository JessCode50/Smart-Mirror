"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function PageRefreshTimer() {
  const router = useRouter()
  const settingsChanged = false // TODO: map this property using a server action
  const THIRTY_SEVEN_MINUTES = 2220000
  function refreshPage() {
    router.refresh()
  }
  const lastRefresh = Date.now()
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (settingsChanged) {
        refreshPage()
      } else if (Date.now() - lastRefresh > THIRTY_SEVEN_MINUTES) {
        refreshPage()
      }
    }, 3000)
    return () => {
      clearInterval(refreshInterval)
    }
  })
  return <div></div>
}
