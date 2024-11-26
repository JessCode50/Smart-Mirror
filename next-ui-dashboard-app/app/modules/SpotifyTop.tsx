import { cookies } from "next/headers"
import {
  SpotifyTokenStore,
  checkSpotifyTokenExpired
} from "@/app/lib/spotifyDataTypes"
import { redirect } from "next/navigation"
import { Track } from "@spotify/web-api-ts-sdk"

const SpotifyTop = async () => {
  const cookieStore = await cookies()
  const spotifyStoreJSON = cookieStore.get("spotifyToken")?.value

  if (!spotifyStoreJSON) return <div>Spotify account not setup...</div>
  const spotifyStore: SpotifyTokenStore = JSON.parse(spotifyStoreJSON)

  // Check token expiry
  if (checkSpotifyTokenExpired(spotifyStore)) {
    redirect("/spotify_login")
  }

  // Request Top Artists and Songs
  const topTracksReq = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=4",
    {
      headers: {
        Authorization: `Bearer ${spotifyStore.token.access_token}`
      }
    }
  )
  if (topTracksReq.status == 204) return <h1>Nothing Playing on Spotify...</h1>
  const topTracks: Track[] = (await topTracksReq.json()).items

  return (
    <div className="flex flex-col gap-1 my-5 max-w-96">
      <h1 className="text-xl">Recent Favourites:</h1>
      <div className="grid grid-cols-2 gap-2">
        {topTracks.map((track: Track, i: number) => {
          return (
            <div key={i}>
              <h2>{track.name}</h2>
              <h3 className="text-sm">{track.artists[0].name}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SpotifyTop
