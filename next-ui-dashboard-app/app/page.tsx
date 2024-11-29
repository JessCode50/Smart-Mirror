import Clock from "./modules/Clock"
import News from "./modules/News"
import OutfitIdeas from "./modules/OutfitIdeas"
import Weather from "./modules/Weather"
import { Suspense } from "react"
import PageRefreshTimer from "./PageRefreshTimer"
import Photos from "./modules/Photos"
import SpotifyNowPlaying from "./modules/SpotifyIntegration/SpotifyNowPlaying"
import SpotifyTop from "./modules/SpotifyIntegration/SpotifyTop"
import {
  db,
  DEFAULT_SETTINGS,
  getMirrorSettings,
  setMirrorSettings
} from "./stores/settingsClient"
import { checkSpotifyTokenExpired } from "./lib/spotifyDataTypes"
import { requestFromRefreshToken } from "./lib/spotifyToken"
export const dynamic = "force-dynamic"

export default async function Home() {
  let mirrorSettings = await getMirrorSettings()
  if (mirrorSettings === null) {
    mirrorSettings = DEFAULT_SETTINGS
    await setMirrorSettings(mirrorSettings)
    db.ping()
    console.log("Null")
  }
  if (
    mirrorSettings.spotifyToken != undefined &&
    checkSpotifyTokenExpired(mirrorSettings.spotifyToken)
  ) {
    mirrorSettings.spotifyToken = await requestFromRefreshToken(
      mirrorSettings.spotifyToken
    )
  }
  if (mirrorSettings.spotifyToken !== undefined) {
    console.log("Working...")
  }

  return (
    <main className="pl-2 flex flex-col min-h-screen">
      <div className="mb-19">
        <Weather></Weather>
      </div>
      <div className="flex flex-row flex-grow">
        <div className="flex flex-col flex-grow">
          <div className="mb-10">
            <News></News>
          </div>
          <div className="mb-10">
            <Suspense>
              <SpotifyNowPlaying
                spotifyStore={mirrorSettings.spotifyToken}
              ></SpotifyNowPlaying>
              <SpotifyTop
                spotifyStore={mirrorSettings.spotifyToken}
              ></SpotifyTop>
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
