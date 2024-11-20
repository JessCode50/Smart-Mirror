import { cookies } from "next/headers"

const client_id = "ff8ff81c736941439e5a5ea1a89ffdea"
const client_secret = process.env.SPOTIFY_CLIENT_SECRET

export interface SpotifyAccessToken {
  access_token: string
  token_type: "Bearer"
  expires_in: number
  refresh_token?: string
  scope: string
}
export interface SpotifyTokenStore {
  expires: number
  token: SpotifyAccessToken
  refresh_token: string
}

export function checkSpotifyTokenExpired(
  tokenObject: SpotifyTokenStore
): boolean {
  return tokenObject.expires < Date.now()
}
export async function getSpotifyAccessToken(
  spotifyTokenStore: SpotifyTokenStore
): Promise<SpotifyTokenStore> {
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
  return {
    refresh_token: accessToken.refresh_token || spotifyTokenStore.refresh_token,
    token: accessToken,
    expires: Date.now() + accessToken.expires_in * 1000
  }
}

// TODO: Eventually the token should be stored in a database
