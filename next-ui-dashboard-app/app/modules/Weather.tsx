import Icon from '@mdi/react';
import { mdiWhiteBalanceSunny } from '@mdi/js';
import { mdiWeatherFog } from '@mdi/js';
import { mdiWeatherCloudy } from '@mdi/js';
import { mdiWeatherPartlyCloudy } from '@mdi/js';
import { mdiWeatherPartlyRainy } from '@mdi/js';
import { mdiWeatherRainy } from '@mdi/js';
import { mdiWeatherPouring } from '@mdi/js';
import { mdiWeatherSnowyRainy } from '@mdi/js';
import { mdiWeatherPartlySnowyRainy } from '@mdi/js';
import { mdiWeatherPartlySnowy } from '@mdi/js';
import { mdiWeatherSnowy } from '@mdi/js';
import { mdiWeatherSnowyHeavy } from '@mdi/js';
import { mdiWeatherHail } from '@mdi/js';
import { mdiWeatherLightning } from '@mdi/js';
import { mdiWeatherLightningRainy } from '@mdi/js';


const Weather = async() => {
  let data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=43.4668&longitude=-80.5164&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max&timezone=auto')
  // Orlando let data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=28.5383&longitude=-81.3792&current=temperature_2m,weather_code,wind_speed_10m&daily=uv_index_max')
   // Costa Rica let data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=10&longitude=-84&current=temperature_2m,weather_code')
   // Whitehorse let data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=60.7161&longitude=-135.0538&current=temperature_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max')

  let weatherInfo = await data.json()
  const temperature = Math.round(weatherInfo.current.temperature_2m)
  const temperatureApparent = Math.round(weatherInfo.current.apparent_temperature)
  const wind = Math.round(weatherInfo.current.wind_speed_10m)
  const dailyHigh = Math.round(weatherInfo.daily.apparent_temperature_max[0])
  const dailyLow = Math.round(weatherInfo.daily.apparent_temperature_min[0])
  const UVindex: number = weatherInfo.daily.uv_index_max[0]

  let UVString: string = ""

  if (UVindex >= 0 && UVindex < 3){
    UVString = "Low"
  }
  else if (UVindex >= 3 && UVindex < 6){
    UVString = "Moderate"
  }
  else if (UVindex >= 6 && UVindex < 8){
    UVString = "High"
  }
  else if (UVindex >= 8 && UVindex < 11){
    UVString = "Very High"
  }
  else {
    UVString = "Extreme"
  }


  const code: number =  weatherInfo.current.weather_code
  let weatherDiscrip: string = ""
  let icon: string = ""

  if (code == 0){
    weatherDiscrip = "Clear Sky"
    icon = mdiWhiteBalanceSunny
  }
  else if (code == 1){
    weatherDiscrip = "Mainly Clear"
    icon = mdiWeatherPartlyCloudy
  }
  else if (code == 2){
    weatherDiscrip = "Partly Cloudy"
    icon = mdiWeatherPartlyCloudy
  }
  else if (code == 3){
    weatherDiscrip = "Overcast"
    icon = mdiWeatherCloudy
  }
  else if (code == 45 || code == 48){
    weatherDiscrip = "Fog"
    icon = mdiWeatherFog
  }
  else if (code == 51){
    weatherDiscrip = "Light Drizzle"
    icon = mdiWeatherPartlyRainy
  }
  else if (code == 53){
    weatherDiscrip = "Moderate Drizzle"
    icon = mdiWeatherPartlyRainy
  }
  else if (code == 55){
    weatherDiscrip = "Intense Drizzle"
    icon = mdiWeatherRainy
  }
  else if (code == 56){
    weatherDiscrip = "Light Freezing Drizzle"
    icon = mdiWeatherPartlySnowyRainy
  }
  else if (code == 57){
    weatherDiscrip = "Intense Freezing Drizzle"
    icon = mdiWeatherSnowyRainy
  }
  else if (code == 61){
    weatherDiscrip = "Light Rain"
    icon = mdiWeatherPartlyRainy
  }
  else if (code == 63){
    weatherDiscrip = "Moderate Rain"
    icon = mdiWeatherRainy
  }
  else if (code == 65){
    weatherDiscrip = "Heavy Rain"
    icon = mdiWeatherRainy
  }
  else if (code == 66){
    weatherDiscrip = "Light Freezing Rain"
    icon = mdiWeatherPartlySnowyRainy
  }
  else if (code == 67){
    weatherDiscrip = "Heavy Freezing Rain"
    icon = mdiWeatherPouring
  }
  else if (code == 71){
    weatherDiscrip = "Light Snow Fall"
    icon = mdiWeatherPartlySnowy
  }
  else if (code == 73){
    weatherDiscrip = "Moderate Snow Fall"
    icon = mdiWeatherSnowy
  }
  else if (code == 75){
    weatherDiscrip = "Heavy Snow Fall"
    icon = mdiWeatherSnowyHeavy
  }
  else if (code == 77){
    weatherDiscrip = "Snow Grains"
    icon = mdiWeatherHail
  }
  else if (code == 80){
    weatherDiscrip = "Light Rain Showers"
    icon = mdiWeatherPartlyRainy
  }
  else if (code == 81){
    weatherDiscrip = "Moderate Rain Showers"
    icon = mdiWeatherRainy
  }
  else if (code == 82){
    weatherDiscrip = "Heavy Rain Showers"
    icon = mdiWeatherRainy
  }
  else if (code == 85){
    weatherDiscrip = "Light Snow Showers"
    icon = mdiWeatherPartlySnowyRainy
  }
  else if (code == 86){
    weatherDiscrip = "Heavy Snow Showers"
    icon = mdiWeatherSnowyRainy
  }
  else if (code == 95){
    weatherDiscrip = "Thunderstorms"
    icon = mdiWeatherLightning
  }
  else if (code == 96){
    weatherDiscrip = "Thunderstorms with Light Hail"
    icon = mdiWeatherLightningRainy
  }
  else if (code == 99){
    weatherDiscrip = "Thunderstorms with Heavy Hail"
    icon = mdiWeatherLightningRainy
  }
  else {
    weatherDiscrip = "No Data"
    
  }

  return (
    <div>
      <Icon 
        className="fill-current text-[#fcca56]" 
        path={icon}
        size={5} 
      />
      <div className="grid grid-rows-1 grid-flow-col gap-4">
        <div>
          Current Weather:
          Temperature: {temperature}ºC
        </div>
        <div>09</div>
      </div>
      <h1 className="text-2xl">Weather</h1>
      <p>Current Weather:</p>
      <p>Temperature: {temperature}ºC</p>
      <p>Feels Like: {temperatureApparent}ºC</p>
      <p>Daily High: {dailyHigh}ºC</p>
      <p>Daily Low: {dailyLow}ºC</p>
      <p>Wind: {wind}km/h</p>
      <p>UV Index: {UVString}</p>
      <p>Weather Description: {weatherDiscrip} </p>
    </div>
  )
}


export default Weather
