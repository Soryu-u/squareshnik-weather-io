import axios from 'axios'
import type WeatherData from '../interface/interface'

let idd = 0

export const getWeather = async (city: string) => {
    idd++
    const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0a5b118c9e91cce613466cd78c723746`,
    )

    const iconCode: string = res.data.weather[0].icon
    const weatherData: WeatherData = res.data

    weatherData.reqId = `${idd}%${weatherData.name}`
    weatherData.weather[0].imageUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    return weatherData
}
