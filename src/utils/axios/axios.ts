import axios from 'axios'

export const getWeather = async (city: string) => {
    const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0a5b118c9e91cce613466cd78c723746`,
    )

    const iconCode: string = res.data.weather[0].icon
    const weatherData: any = res.data

    weatherData.weather[0].imageUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    return weatherData
}
