import Image from "next/image"
import Clock from "./modules/Clock"
import News from "./modules/News"
import OutfitIdeas from "./modules/OutfitIdeas"
import Weather from "./modules/Weather"
import { Suspense } from "react"
import PageRefreshTimer from "./PageRefreshTimer"

export default function Home() {
  return (
    <div className="pl-24">
      <Suspense>
        <Weather></Weather>
        <News></News>

        <OutfitIdeas></OutfitIdeas>
      </Suspense>
      <div className="flex justify-end pr-24">
        <Clock></Clock>
      </div>
      <PageRefreshTimer></PageRefreshTimer>
    </div>
  )
}
