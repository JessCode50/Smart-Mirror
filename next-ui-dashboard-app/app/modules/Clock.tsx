"use client"

import React, { useEffect, useState } from "react"

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    setTime(new Date().toLocaleTimeString())
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <h6 className="text-xl">{time}</h6>
    </div>
  )
}

export default Clock
