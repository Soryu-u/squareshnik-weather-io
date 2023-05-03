import React from 'react'
import styles from './DailyForecast.module.css'
import { convertTemperature } from '../../../utils/functions'

interface Props {
    item: any
    date: string[]
    temperatureUnit: string
}

export default function DailyForecast({ item, date, temperatureUnit }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.date}>
                {new Date(date[0]).toLocaleString('en-us', {
                    month: 'short',
                    day: 'numeric',
                })}
            </div>
            <img src={item.weather[0].imageUrl} />
            <div className={styles.weatherInfo}>
                <div className={styles.temperature}>
                    {convertTemperature(item.main.temp_max, temperatureUnit)}°{temperatureUnit}
                </div>
                <div>{item.weather[0].main}</div>
            </div>
        </div>
    )
}
