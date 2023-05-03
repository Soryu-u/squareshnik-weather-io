import axios from 'axios'
import type WeatherData from '../interface/interface'
import type FullWeatherData from '../interface/fullDataInterface'

let idd = 0
export const getWeather = async (city: string) => {
    try {
        idd++
        const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0a5b118c9e91cce613466cd78c723746`,
        )

        const iconCode: string = res.data.weather[0].icon
        const weatherData: WeatherData = res.data

        weatherData.reqId = `${idd}:${weatherData.name}`
        weatherData.weather[0].imageUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

        return weatherData
    } catch (error) {
        alert(`There is no location ${city}: ${(error as Error).message}`)
        throw error
    }
}
export const getFullWeatherInfo = async (city: string) => {
    try {
        const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0a5b118c9e91cce613466cd78c723746&exclude=minutely,alerts`,
        )
        const weatherData: FullWeatherData = res.data

        weatherData.list.map((item: any) => {
            const iconUrl: string = item.weather[0].icon
            item.weather[0].imageUrl = `https://openweathermap.org/img/wn/${iconUrl}@2x.png`
            return item
        })

        return weatherData
    } catch (error) {
        alert(`Unexpected error: ${(error as Error).message}`)
        window.location.pathname = '/'
        throw error
    }
}
