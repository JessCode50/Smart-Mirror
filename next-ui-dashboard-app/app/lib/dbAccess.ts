import { MongoClient, ServerApiVersion, ObjectId } from "mongodb"
import { SpotifyTokenStore } from "./spotifyDataTypes"

const CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING

export interface MirrorSettings {
  _id?: ObjectId
  username: string // will be default always for now
  settingsUpdated: boolean
  weather: {
    longitude: number
    latitude: number
    tempUnit: "Fahrenheit" | "Celsius"
  }
  outfitSuggestions: {
    style: string
    gender: string
  }
  spotifyToken?: SpotifyTokenStore
}

export class DBAccess {
  private client: MongoClient
  private dbName: string
  private settingsCollection: string
  constructor(dbName: string, settingsCollection: string) {
    if (CONNECTION_STRING == undefined) {
      throw Error(
        "[ERROR] DBAccess: No Connection String! Set the MONGODB_CONNECTION_STRING env variable."
      )
    }
    this.client = new MongoClient(CONNECTION_STRING, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.dbName = dbName
    this.settingsCollection = settingsCollection
  }

  async ping() {
    try {
      // Send a ping to confirm a successful connection
      await this.client.db("admin").command({ ping: 1 })
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      )
    } catch (e) {
      throw e
    }
  }

  async getSettings(username: string): Promise<MirrorSettings | null> {
    try {
      const settings = (await this.client
        .db(this.dbName)
        .collection(this.settingsCollection)
        .findOne({ username: username })) as MirrorSettings | null
      return settings
    } catch (e) {
      throw e
    }
  }

  async writeSettings(settings: MirrorSettings): Promise<void> {
    try {
      await this.client
        .db(this.dbName)
        .collection(this.settingsCollection)
        .updateOne(
          { username: settings.username },
          { $set: settings },
          { upsert: true }
        )
    } catch (e) {
      throw e
    }
  }
}
