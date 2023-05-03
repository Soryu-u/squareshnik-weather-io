import React from 'react'
import styles from './Sidebar.module.css'
import type FullWeatherData from '../../utils/interface/fullDataInterface'
import { convertTemperature } from '../../utils/functions'
import back from '../../images/return.png'
import { Link } from 'react-router-dom'
import WeatherInfo from '../weatherInfo/WeatherInfo'
import wind from '../../images/wind.png'
import rain from '../../images/acid-rain.png'
import pressure from '../../images/temperature.png'
import humidity from '../../images/humidity.png'
import type weatherDetails from '../../utils/interface/weatherDetails'

interface Props {
    weatherInfo: FullWeatherData
    temperatureUnit: string
}

export default function Sidebar({ weatherInfo, temperatureUnit }: Props) {
    const weatherDetails: weatherDetails[] = [
        {
            image: wind,
            alt: 'wind',
            item: `${weatherInfo.list[0].wind.speed} km/h`,
            description: 'Wind',
        },
        {
            image: rain,
            alt: 'rain',
            item: `${weatherInfo.list[0].clouds.all}%`,
            description: 'Cloud',
        },
        {
            image: pressure,
            alt: 'pressure',
            item: `${weatherInfo.list[0].main.pressure} mBar`,
            description: 'Pressure',
        },
        {
            image: humidity,
            alt: 'humidity',
            item: `${weatherInfo.list[0].main.humidity}%`,
            description: 'Humidity',
        },
    ]
    return (
        <div className={styles.sidebar}>
            <div className={styles.main}>
                <Link to={'/'} className={styles.back}>
                    <img src={back} alt={'return'} />
                    back
                </Link>
                <img
                    className={styles.mainImage}
                    src={weatherInfo.list[0].weather[0].imageUrl}
                    alt={'icon'}
                />
                <div className={styles.temperature}>
                    {convertTemperature(weatherInfo.list[0].main.temp, temperatureUnit)}°
                    {temperatureUnit}
                </div>
                <div className={styles.location}>{weatherInfo.city.name}</div>
                <div className={styles.date}>
                    {new Date(weatherInfo.list[0].dt_txt.split(' ')[0]).toLocaleDateString(
                        'en-GB',
                        {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        },
                    )}
                </div>
            </div>
            <span className={styles.horizontalLine}></span>
            <div className={styles.dailyDetails}>
                <div className={styles.weatherDetails}>
                    <img
                        className={styles.weatherImage}
                        src={weatherInfo.list[0].weather[0].imageUrl}
                        alt={'icon'}
                    />
                    {weatherInfo.list[0].weather[0].main},{' '}
                    {weatherInfo.list[0].weather[0].description}
                </div>
                <div className={styles.weatherDetailsItems}>
                    {weatherDetails.map((item, index) => {
                        return <WeatherInfo key={index} data={item} />
                    })}
                </div>
            </div>
        </div>
    )
}
