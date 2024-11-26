import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()
  console.log(allCookies)
  cookieStore.set("test", "123")
  return new Response(JSON.stringify({ res: "Hello World!" }))
}
