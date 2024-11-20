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
            size={7}
          />
        </div>

        <div className="pr-10"></div>

        <div className="flex-none w-100">
          <h1 className="text-7xl">{currWeather.temperature}ºC</h1>
          <h1 className="text-2xl">
            Feels Like {currWeather.temperatureApparent}ºC
          </h1>
          <h1 className="text-2xl">{currWeather.getWeatherEvent().desc} </h1>
        </div>

        <div className="pr-20"></div>
        <div className="pr-5"></div>

        <div className="flex-none">
          <div className="mr-20">
            <h1 className="text-2xl text-right">
              High: {currWeather.dailyHigh}ºC
            </h1>
            <h1 className="text-2xl text-right">
              Low: {currWeather.dailyLow}ºC
            </h1>

            <div className="flex">
              <div className="flex-none w-50">
                <Icon path={mdiWeatherSunnyAlert} size={1.5} />
              </div>

              <div className="pr-3"></div>

              <div className="flex-1">
                <h1 className="text-2xl text-right">
                  UV Index: {currWeather.UVIndex} ~ {currWeather.getUVString()}
                </h1>
              </div>
            </div>

            <div className="flex">
              <div className="pr-10"></div>
              <div className="pr-7"></div>
              <div className="flex-none w-50">
                <Icon path={mdiWeatherWindy} size={1.5} />
              </div>

              <div className="flex-1">
                <h1 className="text-2xl text-right">
                  Wind: {currWeather.wind} {currWeather.windSpeedUnit}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>No Weather Data!</div>
  )
}

export default Weather
