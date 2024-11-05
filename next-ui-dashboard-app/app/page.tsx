import Image from "next/image"
import Clock from "./modules/Clock"
import News from "./modules/News"
import OutfitIdeas from "./modules/OutfitIdeas"
import Weather from "./modules/Weather"
import { Suspense } from "react"

export default function Home() {
  return (
    <div>
      <Clock></Clock>
      <News></News>
      <Weather></Weather>
      <Suspense>
        <OutfitIdeas></OutfitIdeas>
      </Suspense>
    </div>
  )
}
