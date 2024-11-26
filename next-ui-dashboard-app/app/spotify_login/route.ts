import { cookies } from "next/headers"
import { redirect } from "next/navigation"
function generateRandomString(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const client_id = "ff8ff81c736941439e5a5ea1a89ffdea"
export async function GET() {
  const state = generateRandomString(16)
  const scope =
    "user-read-currently-playing user-top-read user-read-private user-read-email"
  const cookieStore = await cookies()
  cookieStore.set("state", state, {
    secure: true,
    httpOnly: true,
    sameSite: "lax"
  })
  redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=http://localhost:3000/spotify_login/callback&state=${state}`
  )
}
