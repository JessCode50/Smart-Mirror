const Weather = async () => {
  let data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=43.4668&longitude=-80.5164&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max&timezone=auto')
  let weatherInfo = await data.json()
  
  return (
    <div>
      <h1 className="text-2xl">Weather</h1>
      <p>Current Weather:</p>
      <p>Temperature: 33ºC</p>
      <p>Wind: 21 km/h</p>
      {/* <div className="px-8 ...">Morning: Afternoon:</div> */} 
      <p>Morning: Afternoon: Evening:</p>
      <p>Temperature: 13ºC Temperature: 25ºC Temperature: 0ºC</p>
    </div>
  )
}


export default Weather()
