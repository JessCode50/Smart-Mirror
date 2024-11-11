const Weather = async() => {
  let data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=43.4668&longitude=-80.5164&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max&timezone=auto')
  // Orlando: let data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=28.5383&longitude=-81.3792&current=temperature_2m,weather_code,wind_speed_10m&daily=uv_index_max')
   // Costa Rica let data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=10&longitude=-84&current=temperature_2m,weather_code')

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

  if (code == 0){
    weatherDiscrip = "Clear Sky"
  }
  else if (code == 1){
    weatherDiscrip = "Mainly Clear"
  }
  else if (code == 2){
    weatherDiscrip = "Partly Cloudy"
  }
  else if (code == 3){
    weatherDiscrip = "Overcast"
  }
  else if (code == 45 || code == 48){
    weatherDiscrip = "Fog"
  }
  else if (code == 51){
    weatherDiscrip = "Light Drizzle"
  }
  else if (code == 53){
    weatherDiscrip = "Moderate Drizzle"
  }
  else if (code == 55){
    weatherDiscrip = "Intense Drizzle"
  }
  else if (code == 56){
    weatherDiscrip = "Light Freezing Drizzle"
  }
  else if (code == 57){
    weatherDiscrip = "Intense Freezing Drizzle"
  }
  else if (code == 61){
    weatherDiscrip = "Light Rain"
  }
  else if (code == 63){
    weatherDiscrip = "Moderate Rain"
  }
  else if (code == 65){
    weatherDiscrip = "Heavy Rain"
  }
  else if (code == 66){
    weatherDiscrip = "Light Freezing Rain"
  }
  else if (code == 67){
    weatherDiscrip = "Heavy Freezing Rain"
  }
  else if (code == 71){
    weatherDiscrip = "Light Snow Fall"
  }
  else if (code == 73){
    weatherDiscrip = "Moderate Snow Fall"
  }
  else if (code == 75){
    weatherDiscrip = "Heavy Snow Fall"
  }
  else if (code == 77){
    weatherDiscrip = "Snow Grains"
  }
  else if (code == 80){
    weatherDiscrip = "Light Rain Showers"
  }
  else if (code == 81){
    weatherDiscrip = "Moderate Rain Showers"
  }
  else if (code == 82){
    weatherDiscrip = "Heavy Rain Showers"
  }
  else if (code == 85){
    weatherDiscrip = "Light Snow Showers"
  }
  else if (code == 86){
    weatherDiscrip = "Heavy Snow Showers"
  }
  else if (code == 95){
    weatherDiscrip = "Thunderstorms"
  }
  else if (code == 96){
    weatherDiscrip = "Thunderstorms with Light Hail"
  }
  else if (code == 99){
    weatherDiscrip = "Thunderstorms with Heavy Hail"
  }
  else {
    weatherDiscrip = "No Data"
  }
  
  return (
    <div>
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
