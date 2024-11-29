import { DBAccess, MirrorSettings } from "../lib/dbAccess"
import { SpotifyTokenStore } from "../lib/spotifyDataTypes"

export const db = new DBAccess(
  "se101-finalproject-magicmirror-appdata",
  "mirrorSettings"
)

export const DEFAULT_SETTINGS: MirrorSettings = {
  username: "default", // will be default always for now
  settingsUpdated: true,
  weather: {
    longitude: -80.5204,
    latitude: 43.4643,
    tempUnit: "Celsius"
  },
  outfitSuggestions: {
    style: "Streetwear",
    gender: "Unisex"
  }
}
export async function getMirrorSettings(): Promise<MirrorSettings | null> {
  const settings = await db.getSettings("default")
  if (settings === null || settings.spotifyToken === undefined) return null
  return settings
}
export async function setMirrorSettings(settings: MirrorSettings) {
  db.writeSettings(settings)
}
export async function updateSpotifyAccessToken(
  newTokenStore: SpotifyTokenStore
) {
  let settings = await db.getSettings("default")
  if (settings === null) {
    settings = DEFAULT_SETTINGS
  }
  settings.spotifyToken = newTokenStore
  db.writeSettings(settings)
}
