import React from 'react'
import styles from './WeatherCard.module.css'
import type WeatherData from '../../utils/interface/interface'
import wind from '../../images/wind.png'
import pressure from '../../images/temperature.png'
import humidity from '../../images/humidity.png'
import rain from '../../images/acid-rain.png'
import WeatherInfo from '../weatherInfo/WeatherInfo'
import { useSelector } from 'react-redux'

export default function WeatherCard(props: { data: WeatherData }) {
    const weatherInfo = [
        {
            image: wind,
            alt: 'wind',
            item: `${props.data.wind.speed} km/h`,
            description: 'Wind',
        },
        {
            image: rain,
            alt: 'rain',
            item: `${props.data.clouds.all}%`,
            description: 'Chance of rain',
        },
        {
            image: pressure,
            alt: 'pressure',
            item: `${props.data.main.pressure} mBar`,
            description: 'Pressure',
        },
        {
            image: humidity,
            alt: 'humidity',
            item: `${props.data.main.humidity}%`,
            description: 'Humidity',
        },
    ]

    const temperatureUnit = useSelector((state: any) => state.weather.temperatureUnit)

    function convertTemperature(temperature: number, temperatureUnit: string): string {
        if (temperatureUnit === 'C') {
            return (temperature - 273.15).toFixed(0)
        } else {
            return (((temperature - 273.15) * 9) / 5 + 32).toFixed(0)
        }
    }

    const temperature: string = convertTemperature(props.data.main.temp, temperatureUnit)
    const iconUrl: string = props.data.weather[0].imageUrl

    const timezoneOffset = props.data.timezone

    const localTimezoneOffset = new Date().getTimezoneOffset() * 60000
    const localTime = new Date(Date.now() + timezoneOffset * 1000 + localTimezoneOffset)

    const formattedDate = localTime.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    const formattedTime = localTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })

    const isDay = localTime.getHours() >= 7 && localTime.getHours() < 18
    const headerClassName = isDay ? styles.day : styles.night

    return (
        <div className={styles.container}>
            <div className={[styles.header, headerClassName].join(' ')}>
                <div className={styles.date}>
                    <div className={styles.dateItem}>{formattedDate}</div>
                </div>
                <div>
                    <div className={styles.city}>
                        {props.data.name}, {props.data.sys.country}. {formattedTime}
                    </div>
                </div>
            </div>
            <div style={{ padding: '5px 15px 15px 15px' }}>
                <div className={styles.weather}>
                    <div className={styles.weatherItem}>
                        <img
                            className={styles.weatherIcon}
                            src={iconUrl}
                            alt={props.data.weather[0].main}
                        />
                        <div>{props.data.weather[0].main}</div>
                    </div>
                    <div className={styles.temperature}>
                        {temperature}°{temperatureUnit}
                    </div>
                </div>
                <span className={styles.horizontalLine}></span>
                <div className={styles.info}>
                    {weatherInfo.map((item, index) => {
                        return <WeatherInfo key={index.toString() + item.alt} data={item} />
                    })}
                </div>
            </div>
        </div>
    )
}