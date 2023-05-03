export default interface FullWeatherData {
    cod: string
    message: number
    cnt: number
    list: Array<{
        dt: number
        main: {
            temp: number
            feels_like: number
            temp_min: number
            temp_max: number
            pressure: number
            sea_level: number
            grnd_level: number
            humidity: number
            temp_kf: number
        }
        weather: Array<{
            id: number
            main: string
            description: string
            icon: string
            imageUrl: string
        }>

        clouds: {
            all: number
        }
        wind: {
            speed: number
            deg: number
            gust: number
        }
        visibility: number
        pop: number
        sys: {
            pod: string
        }
        rain?: {
            '3h': number
        }
        dt_txt: string
    }>

    city: {
        id: number
        name: string
        coord: {
            lat: number
            lon: number
        }
        country: string
        population: number
        timezone: number
        sunrise: number
        sunset: number
    }
}
