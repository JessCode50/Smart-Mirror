import { cookies } from "next/headers"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()
  console.log(allCookies)
  cookieStore.set("test", "123")
  return new Response(JSON.stringify({ res: "Hello World!" }))
}
