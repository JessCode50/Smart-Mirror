import { updateSpotifyAccessToken } from "@/app/stores/settingsClient"
import { redirect } from "next/navigation"

export async function GET() {
  await updateSpotifyAccessToken(null)
  redirect("/settings")
}
