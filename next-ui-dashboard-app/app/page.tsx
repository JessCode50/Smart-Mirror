import Clock from "./modules/Clock"
import News from "./modules/News"
import OutfitIdeas from "./modules/OutfitIdeas"
import Weather from "./modules/Weather"
import { Suspense } from "react"
import PageRefreshTimer from "./PageRefreshTimer"
import Photos from "./modules/Photos"
import SpotifyNowPlaying from "./modules/SpotifyNowPlaying"
import SpotifyTop from "./modules/SpotifyTop"
import Loading from "./loading"

export default function Home() {
  return (
    <main className="pt-20 pl-24 flex flex-col min-h-screen">
      <div className="mb-20">
        <Weather></Weather>
      </div>
      <div className="mb-20">
        <News></News>
        <Suspense>
          <SpotifyNowPlaying></SpotifyNowPlaying>
          <SpotifyTop></SpotifyTop>
        </Suspense>
        <Suspense>
          <OutfitIdeas></OutfitIdeas>
        </Suspense>
      </div>
      <div className="flex-grow"></div>
      <div className="flex justify-end pr-24 pb-10">
        <Clock></Clock>
      </div>
      <PageRefreshTimer></PageRefreshTimer>
    </main>
  )
}
