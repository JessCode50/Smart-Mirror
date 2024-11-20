import { cookies } from "next/headers"
import {
  SpotifyTokenStore,
  checkSpotifyTokenExpired,
  getSpotifyAccessToken
} from "../lib/spotifyToken"

const SpotifyTop = async () => {
  const cookieStore = await cookies()
  const spotifyStoreJSON = cookieStore.get("spotifyToken")?.value

  if (!spotifyStoreJSON) return <div>Spotify account not setup...</div>
  let spotifyStore: SpotifyTokenStore = JSON.parse(spotifyStoreJSON)

  // Check token expiry
  if (checkSpotifyTokenExpired(spotifyStore)) {
    spotifyStore = await getSpotifyAccessToken(spotifyStore)
    cookieStore.set("spotifyToken", JSON.stringify(spotifyStore), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: Date.now() + 90 * 24 * 60 * 60 * 1000
    })
  }

  // Request Top Artists and Songs

  return <div></div>
}

export default SpotifyTop
