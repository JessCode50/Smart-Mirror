import Icon from "@mdi/react"
import { mdiWeatherSunnyAlert } from "@mdi/js"
import { mdiWeatherWindy } from "@mdi/js"
import { WeatherData } from "../lib/weatherData"
import { fetchWeather } from "../lib/fetchWeather"

const Weather = async () => {
  let currWeather: WeatherData | null = null

  try {
    currWeather = await fetchWeather()
  } catch {
    currWeather = null
  }

  return currWeather ? (
    <div>
      <div className="flex">
        <div className="flex-none w-100">
          <Icon
            // className="fill-current text-[#fcca56]"
            path={currWeather.getWeatherEvent().icon}
            size={9}
          />
        </div>

        <div className="pr-10"></div>

        <div className="flex flex-col items-start">
          <div className="mb-3">
            <h1 className="text-7xl">{currWeather.temperature}ºC</h1>
          </div>
          <div className="mb-5">
            <h1 className="text-2xl">
              Feels Like {currWeather.temperatureApparent}ºC
            </h1>
          </div>
          <h1 className="text-2xl">{currWeather.getWeatherEvent().desc} </h1>
        </div>

        <div className="flex-grow"></div>
        <div className="flex-justify-end pr-2">
          <div className="mb-2">
            <h1 className="text-2xl text-right">
              High: {currWeather.dailyHigh}ºC
            </h1>
          </div>
          <h1 className="text-2xl text-right">Low: {currWeather.dailyLow}ºC</h1>

          <div className="flex justify-end items-center mt-4">
            <div className="flex-none w-8">
              <Icon path={mdiWeatherSunnyAlert} size={1.5} />
            </div>

            <h1 className="text-2xl text-right ml-4">
              UV Index: {currWeather.UVIndex} ~ {currWeather.getUVString()}
            </h1>
          </div>

          <div className="flex justify-end items-center mt-4">
            <div className="flex-none w-8">
              <Icon path={mdiWeatherWindy} size={1.5} />
            </div>
            <h1 className="text-2xl text-right ml-4">
              Wind: {currWeather.wind} {currWeather.windSpeedUnit}
            </h1>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>No Weather Data!</div>
  )
}

export default Weather
