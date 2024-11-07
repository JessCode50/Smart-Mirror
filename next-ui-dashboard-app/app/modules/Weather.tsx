const Weather = async() => {
  let data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=43.4668&longitude=-80.5164&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max&timezone=auto')
  // Orlando: let data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=28.5383&longitude=-81.3792&current=temperature_2m,weather_code,wind_speed_10m&daily=uv_index_max')
   // Costa Rica let data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=10&longitude=-84&current=temperature_2m,weather_code')
  let weatherInfo = await data.json()
  var temperature = Math.round(weatherInfo.current.temperature_2m)
  var temperatureApparent = Math.round(weatherInfo.current.apparent_temperature)
  var wind = Math.round(weatherInfo.current.wind_speed_10m)
  var dailyHigh = Math.round(weatherInfo.daily.apparent_temperature_max[0])
  var dailyLow = Math.round(weatherInfo.daily.apparent_temperature_min[0])
  var UVindex = weatherInfo.daily.uv_index_max[0]

  if (UVindex >= 0 && UVindex < 3){
    UVindex = "Low"
  }
  else if (UVindex >= 3 && UVindex < 6){
    UVindex = "Moderate"
  }
  else if (UVindex >= 6 && UVindex < 8){
    UVindex = "High"
  }
  else if (UVindex >= 8 && UVindex < 11){
    UVindex = "Very High"
  }
  else {
    UVindex = "Extreme"
  }


  var weatherDiscrip = weatherInfo.current.weather_code

  if (weatherDiscrip == 0){
    weatherDiscrip = "Clear Sky"
  }
  else if (weatherDiscrip == 1){
    weatherDiscrip = "Mainly Clear"
  }
  else if (weatherDiscrip == 2){
    weatherDiscrip = "Partly Cloudy"
  }
  else if (weatherDiscrip == 3){
    weatherDiscrip = "Overcast"
  }
  else if (weatherDiscrip == 45 || weatherDiscrip == 48){
    weatherDiscrip = "Fog"
  }
  else if (weatherDiscrip == 51){
    weatherDiscrip = "Light Drizzle"
  }
  else if (weatherDiscrip == 53){
    weatherDiscrip = "Moderate Drizzle"
  }
  else if (weatherDiscrip == 55){
    weatherDiscrip = "Intense Drizzle"
  }
  else if (weatherDiscrip == 56){
    weatherDiscrip = "Light Freezing Drizzle"
  }
  else if (weatherDiscrip == 57){
    weatherDiscrip = "Intense Freezing Drizzle"
  }
  else if (weatherDiscrip == 61){
    weatherDiscrip = "Light Rain"
  }
  else if (weatherDiscrip == 63){
    weatherDiscrip = "Moderate Rain"
  }
  else if (weatherDiscrip == 65){
    weatherDiscrip = "Heavy Rain"
  }
  else if (weatherDiscrip == 66){
    weatherDiscrip = "Light Freezing Rain"
  }
  else if (weatherDiscrip == 67){
    weatherDiscrip = "Heavy Freezing Rain"
  }
  else if (weatherDiscrip == 71){
    weatherDiscrip = "Light Snow Fall"
  }
  else if (weatherDiscrip == 73){
    weatherDiscrip = "Moderate Snow Fall"
  }
  else if (weatherDiscrip == 75){
    weatherDiscrip = "Heavy Snow Fall"
  }
  else if (weatherDiscrip == 77){
    weatherDiscrip = "Snow Grains"
  }
  else if (weatherDiscrip == 80){
    weatherDiscrip = "Light Rain Showers"
  }
  else if (weatherDiscrip == 81){
    weatherDiscrip = "Moderate Rain Showers"
  }
  else if (weatherDiscrip == 82){
    weatherDiscrip = "Heavy Rain Showers"
  }
  else if (weatherDiscrip == 85){
    weatherDiscrip = "Light Snow Showers"
  }
  else if (weatherDiscrip == 86){
    weatherDiscrip = "Heavy Snow Showers"
  }
  else if (weatherDiscrip == 95){
    weatherDiscrip = "Thunderstorms"
  }
  else if (weatherDiscrip == 96){
    weatherDiscrip = "Thunderstorms with Light Hail"
  }
  else if (weatherDiscrip == 99){
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
      <p>UV Index: {UVindex}</p>
      <p>Weather Description: {weatherDiscrip} </p>
    </div>
  )
}


export default Weather
