import Clock from "./modules/Clock"
import News from "./modules/News"
import OutfitIdeas from "./modules/OutfitIdeas"
import Weather from "./modules/Weather"
import { Suspense } from "react"
import PageRefreshTimer from "./PageRefreshTimer"
import Photos from "./modules/Photos"
import SpotifyNowPlaying from "./modules/SpotifyNowPlaying"
import SpotifyTop from "./modules/SpotifyTop"

export default function Home() {
  return (
    <main className="pl-2 flex flex-col min-h-screen">
      <div className="mb-19">
          <Weather></Weather>
      </div>
      <div className="flex flex-row flex-grow">
        <div className = "flex flex-col flex-grow">
          <div className="mb-10">
            <News></News>
          </div>
          <div className = "mb-10">
            <Suspense>
              <SpotifyNowPlaying></SpotifyNowPlaying>
              <SpotifyTop></SpotifyTop>
            </Suspense>
          </div>
          <Suspense>
            <OutfitIdeas></OutfitIdeas>
          </Suspense>
        </div>
        <div className="flex-grow"></div>
        <div className="flex flex-col justify-end items-end pr-2 pb-3">
          <div className="mb-10">
            <Photos></Photos>
          </div>
          <Clock></Clock>
        </div>
      </div>
      <PageRefreshTimer></PageRefreshTimer>
    </main>
  )
}
