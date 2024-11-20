"use server"

import { WeatherData } from "./weatherData"

export async function fetchWeather(): Promise<WeatherData> {
  const data = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=43.4668&longitude=-80.5164&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max&timezone=auto"
  )
  const weatherInfo = await data.json()
  if (!weatherInfo)
    throw new Error("fetchWeather: Failed to fetch weather data!")

  const temperature = Math.round(weatherInfo.current.temperature_2m)
  const temperatureApparent = Math.round(
    weatherInfo.current.apparent_temperature
  )
  const wind = Math.round(weatherInfo.current.wind_speed_10m)
  const dailyHigh = Math.round(weatherInfo.daily.apparent_temperature_max[0])
  const dailyLow = Math.round(weatherInfo.daily.apparent_temperature_min[0])
  const UVindex: number = weatherInfo.daily.uv_index_max[0]
  console.log(UVindex)
  const code: number = weatherInfo.current.weather_code
  return new WeatherData(
    temperature,
    temperatureApparent,
    dailyHigh,
    dailyLow,
    UVindex,
    wind,
    code
  )
}
