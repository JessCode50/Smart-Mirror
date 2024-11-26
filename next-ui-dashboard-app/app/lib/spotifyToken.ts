"use server"
import { cookies } from "next/headers"
import {
  SpotifyTokenStore,
  SpotifyAccessToken,
  checkSpotifyTokenExpired
} from "./spotifyDataTypes"

const client_id = "ff8ff81c736941439e5a5ea1a89ffdea"
const client_secret = process.env.SPOTIFY_CLIENT_SECRET

export async function getSpotifyAccessToken(
  spotifyTokenStore: SpotifyTokenStore
) {
  if (!checkSpotifyTokenExpired(spotifyTokenStore)) return spotifyTokenStore
  if (!spotifyTokenStore.refresh_token)
    throw new Error("No Refresh Token, redirect to login...")

  const accessTokenReq = await fetch(
    `https://accounts.spotify.com/api/token?refresh_token=${spotifyTokenStore.refresh_token}&grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${client_id}:${client_secret}`)
      }
    }
  )
  let accessToken: SpotifyAccessToken
  try {
    accessToken = await accessTokenReq.json()
  } catch (e) {
    throw e
  }
  const cookieStore = await cookies()
  const spotifyStore = {
    refresh_token: accessToken.refresh_token || spotifyTokenStore.refresh_token,
    token: accessToken,
    expires: Date.now() + accessToken.expires_in * 1000
  }
  cookieStore.set("spotifyToken", JSON.stringify(spotifyStore), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: Date.now() + 90 * 24 * 60 * 60 * 1000
  })
}

// TODO: Eventually the token should be stored in a database
