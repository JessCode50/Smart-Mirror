import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getSpotifyAccessToken } from "@/app/lib/spotifyToken"
import {
  SpotifyTokenStore,
  checkSpotifyTokenExpired
} from "@/app/lib/spotifyDataTypes"
import Image from "next/image"
import Icon from "@mdi/react"
import { mdiSpotify } from "@mdi/js"

const SpotifyNowPlaying = async () => {
  const cookieStore = await cookies()
  let spotifyStoreJSON = cookieStore.get("spotifyToken")?.value

  if (!spotifyStoreJSON) return <div>Spotify account not setup...</div>
  let spotifyStore: SpotifyTokenStore = JSON.parse(spotifyStoreJSON)

  // Check token expiry
  if (checkSpotifyTokenExpired(spotifyStore)) {
    redirect("/spotify_login")
  }

  const testFetch = await fetch("http://localhost:3000/spotify_login/test", {
    credentials: "same-origin"
  })
  // Make request to spotify API
  const currentlyPlayingReq = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${spotifyStore.token.access_token}`
      }
    }
  )
  if (currentlyPlayingReq.status == 204)
    return <h1>Nothing Playing on Spotify...</h1>
  const songData = await currentlyPlayingReq.json()
  if (songData.item === null || songData.item === undefined) {
    return <h1>Nothing Playing on Spotify...</h1>
  }
  return (
    <div>
      <h1 className="text-2xl">Now Playing: </h1> <br></br>
      <div className="flex flex-row gap-4">
        <Image
          src={songData.item.album.images[0].url}
          width={128}
          height={128}
          alt="Album Cover"
        ></Image>
        <div className="flex flex-col">
          <Icon path={mdiSpotify} size={1.5}></Icon>
          <h2 className="text-xl">{songData.item.name}</h2>
          <h3 className="text-lg">{songData.item.artists[0].name}</h3>
        </div>
      </div>
    </div>
  )
}

export default SpotifyNowPlaying
