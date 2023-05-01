import React from 'react'
// import { useParams } from 'react-router-dom'
// import { getFullWeatherInfo } from '../../utils/axios/axios'
import forecast from '../../utils/forecast.json'
import styles from './Info.module.css'
import type FullWeatherData from '../../utils/interface/fullDataInterface'

export default function Info() {
    const weatherInfo: FullWeatherData = forecast
    // const [weatherInfo, setWeatherInfo] = useState<any>()
    // const { id } = useParams()
    // let city: string = ''
    // if (id != null) {
    //     city = id.split('%')[1]
    // }

    // useEffect(() => {
    //     void getFullWeatherInfo(city).then((res) => {
    //         setWeatherInfo(res)
    //     })
    // }, [city])

    console.log(weatherInfo)

    const timezoneOffset = weatherInfo.city.timezone
    const localTimezoneOffset = new Date().getTimezoneOffset() * 60000
    const localTime = new Date(Date.now() + timezoneOffset * 1000 + localTimezoneOffset)

    const formattedDate = localTime.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <div>
            {weatherInfo != null && (
                <div className={styles.main}>
                    <div className={styles.sidebar}>
                        <img src={weatherInfo.list[0].weather[0].imageUrl} />
                        <div>{weatherInfo.list[0].main.temp}</div>
                        <div>
                            <div>{weatherInfo.city.name}</div>
                            <div>{formattedDate}</div>
                        </div>
                        <span className={styles.horizontalLine}></span>
                    </div>
                    <div>content</div>
                </div>
            )}
        </div>
    )
}
