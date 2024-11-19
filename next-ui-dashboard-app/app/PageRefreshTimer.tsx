"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function PageRefreshTimer() {
    const router = useRouter()
    function refreshPage() {
        router.refresh()
    }
    // useEffect(() => {
        
    // })
  return (
    <div>
        {/* <button className=" outline outline-2" onClick={refreshPage}>Refresh</button> */}
    </div>
  )
}
