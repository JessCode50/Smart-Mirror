import Clock from "./modules/Clock"
import News from "./modules/News"
import OutfitIdeas from "./modules/OutfitIdeas"
import Weather from "./modules/Weather"
import { Suspense } from "react"
import PageRefreshTimer from "./PageRefreshTimer"
import Photos from "./modules/Photos"

export default function Home() {
  return (
    <main className="pl-24">
      <Suspense>
        <Weather></Weather>
        <News></News>
        <Photos></Photos>
        <OutfitIdeas></OutfitIdeas>
      </Suspense>
      <div className="flex justify-end pr-24">
        <Clock></Clock>
      </div>
      <PageRefreshTimer></PageRefreshTimer>
    </main>
  )
}
