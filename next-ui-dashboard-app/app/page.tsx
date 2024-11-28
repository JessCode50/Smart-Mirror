import Image from "next/image"
import Clock from "./modules/Clock"
import News from "./modules/News"
import OutfitIdeas from "./modules/OutfitIdeas"
import Weather from "./modules/Weather"

export default function Home() {
  return (
    <div className = "pl-24">
      <Weather></Weather>
      <News></News>
      <OutfitIdeas></OutfitIdeas>

      <div className = "flex justify-end pr-24">
      <Clock></Clock>
      <Date></Date>
      </div>
      
      
    </div>
  )
}