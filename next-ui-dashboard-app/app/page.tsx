import Image from "next/image"
import Clock from "./modules/Clock"
import News from "./modules/News"
import OutfitIdeas from "./modules/OutfitIdeas"
import Weather from "./modules/Weather"

export default function Home() {
  return (
    <div>
      <Clock></Clock>
      <News></News>
      <OutfitIdeas></OutfitIdeas>
      <Weather></Weather>
    </div>
  )
}