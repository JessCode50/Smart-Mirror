"use client"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  fetchSettingsChanged,
  pushSettingsChanged
} from "./serverSettingsChanged"
export default function PageRefreshTimer() {
  const router = useRouter()
  const THIRTY_SEVEN_MINUTES = 2220000
  function refreshPage() {
    router.refresh()
  }
  const lastRefresh = useRef(Date.now())
  useEffect(() => {
    // const refreshInterval = setInterval(() => {
    //   if (Date.now() - lastRefresh.current > THIRTY_SEVEN_MINUTES) {
    //     refreshPage()
    //   } else if (settingsChanged === false) {
    //     console.log("dsad")
    //     fetchSettingsChanged().then((res) => {
    //       console.log(res)
    //       pushSettingsChanged().then(() => refreshPage())
    //     })
    //     clearInterval(refreshInterval)
    //   }
    // }, 3000)
    let refreshInterval: NodeJS.Timeout

    pushSettingsChanged().then(() => {
      console.log("pushed")
      refreshInterval = setInterval(() => {
        fetchSettingsChanged().then((res) => {
          if (res === true) {
            refreshPage()
          }
        })
        if (Date.now() > lastRefresh.current + THIRTY_SEVEN_MINUTES) {
          lastRefresh.current = Date.now()
          refreshPage()
        }
      }, 3000)
    })

    return () => {
      clearInterval(refreshInterval)
    }
  })
  return <div></div>
}
