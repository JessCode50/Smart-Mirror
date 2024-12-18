"use server"
import { MirrorSettings } from "../lib/dbAccess"
import { db } from "../stores/settingsClient"
export async function writeSettings(mirrorSettingsJSON: string) {
  const mirrorSettings: MirrorSettings = JSON.parse(
    mirrorSettingsJSON
  ) as MirrorSettings
  const currentSettings = await db.getSettings("default")
  if (currentSettings !== null && currentSettings.spotifyToken !== null)
    mirrorSettings.spotifyToken = currentSettings.spotifyToken
  db.writeSettings(mirrorSettings)
}
