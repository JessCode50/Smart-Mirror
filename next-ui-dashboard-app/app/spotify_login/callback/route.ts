import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import {
  SpotifyAccessToken,
  SpotifyTokenStore
} from "@/app/lib/spotifyDataTypes"
import { redirect } from "next/navigation"

const client_id = "ff8ff81c736941439e5a5ea1a89ffdea"
const client_secret = process.env.SPOTIFY_CLIENT_SECRET

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const authCode = searchParams.get("code")
  const returnedState = searchParams.get("state")

  const cookieStore = await cookies()
  const storedState = cookieStore.get("state")?.value
  console.log(storedState)
  console.log(returnedState)
  if (
    storedState === undefined ||
    returnedState === null ||
    storedState !== returnedState
  ) {
    return new Response("ERROR: State does not match! Authentication failed!")
  }
  if (authCode == null || client_secret == undefined) {
    return new Response("ERROR: No auth code received!")
  }

  const accessTokenReq = await fetch(
    `https://accounts.spotify.com/api/token?code=${authCode}&redirect_uri=${request.url}&grant_type=authorization_code`,
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${client_id}:${client_secret}`)
      }
    }
  )
  const accessToken: SpotifyAccessToken = await accessTokenReq.json()
  if (!accessToken.access_token)
    return new Response("ERROR: Access Token Request Failed")

  const tokenObject: SpotifyTokenStore = {
    expires: Date.now() + accessToken.expires_in * 1000,
    token: accessToken,
    refresh_token: accessToken.refresh_token || ""
  }
  cookieStore.set("spotifyToken", JSON.stringify(tokenObject), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: Date.now() + 90 * 24 * 60 * 60 * 1000
  })

  redirect("/")
  // query is "hello" for /api/search?query=hello
}
