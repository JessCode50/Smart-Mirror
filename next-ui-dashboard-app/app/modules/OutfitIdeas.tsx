import OpenAI from "openai"
import { fetchWeather } from "../lib/fetchWeather"
import { WeatherData } from "../lib/weatherData"

const OutfitIdeas = async () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
  let aiQueryData: {
    weather:
      | { weatherData: WeatherData | "No Data"; weatherEventDesc: string }
      | "No Data"
    genderStyle: "Men" | "Women" | "Unisex"
    style: string
  } = {
    weather: "No Data",
    genderStyle: "Women",
    style: "Business Casual"
  }
  let currWeather: WeatherData | undefined = undefined

  try {
    currWeather = await fetchWeather()
    if (currWeather != undefined) {
      aiQueryData.weather = {
        weatherData: currWeather,
        weatherEventDesc: currWeather.getWeatherEvent().desc
      }
    }
  } catch {
    aiQueryData.weather = "No Data"
  }

  console.log(aiQueryData)

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an assistant designed to provide an average person general outfit 
        deas based on parameters specified in the user prompt. Those parameters may include things such as weather, 
        preferred styles, gender / unisex and will be provided as a JSON object of strings. 
        Provide exactly three ideas that are appropriate for the conditions provided only in an array of strings, 
        in JSON without any formatting.`
      },
      {
        role: "user",
        content: JSON.stringify(aiQueryData)
      }
    ]
  })

  const result: Array<string> | null = JSON.parse(
    completion.choices[0].message.content || "null"
  )
  return result ? (
    <div className="m-4 p-2">
      <h1 className=" text-xl ">Outfit Ideas</h1>
      <li>{result[0] || ""}</li>
      <li>{result[1] || ""}</li>
      <li>{result[2] || ""}</li>
    </div>
  ) : (
    <div></div>
  )
}

export default OutfitIdeas
