import React, { useState } from 'react'
import styles from './WeatherCard.module.css'
import type WeatherData from '../../utils/interface/interface'
import wind from '../../images/wind.png'
import pressure from '../../images/temperature.png'
import humidity from '../../images/humidity.png'
import rain from '../../images/acid-rain.png'
import plus from '../../images/plus.png'
import refresh from '../../images/refresh.png'
import done from '../../images/done.png'
import WeatherInfo from '../weatherInfo/WeatherInfo'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { convertTemperature } from '../../utils/functions'
import type weatherDetails from '../../utils/interface/weatherDetails'

export default function WeatherCard(props: {
    data: WeatherData
    onDelete: () => void
    onRefresh: () => void
}) {
    const [icon, setIcon] = useState<string>(refresh)
    const weatherDetails: weatherDetails[] = [
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
            description: 'Cloud',
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

    function handleRefresh() {
        if (icon !== done) {
            props.onRefresh()
            setIcon(done)
            setTimeout(() => {
                setIcon(refresh)
            }, 5000)
        }
    }

    return (
        <div className={styles.container}>
            <div className={[styles.header, headerClassName].join(' ')}>
                <div className={styles.date}>
                    <div className={styles.dateItem}>{formattedDate}</div>
                    <img
                        className={styles.removeItem}
                        onClick={props.onDelete}
                        src={plus}
                        alt={'remove'}
                    />
                </div>
                <div>
                    <div className={styles.city}>
                        {props.data.name}, {props.data.sys.country}. {formattedTime}
                    </div>
                </div>
            </div>
            <div className={styles.content}>
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
                    {weatherDetails.map((item, index) => {
                        return <WeatherInfo key={index.toString() + item.alt} data={item} />
                    })}
                </div>
                <span className={styles.horizontalLine}></span>
                <div className={styles.navigation}>
                    <img
                        className={icon !== done ? styles.refresh : styles.done}
                        onClick={handleRefresh}
                        src={icon}
                        alt={'refresh'}
                    />
                    <Link to={`info/${props.data.reqId}`} className={styles.open}>
                        See details
                    </Link>
                </div>
            </div>
        </div>
    )
}
