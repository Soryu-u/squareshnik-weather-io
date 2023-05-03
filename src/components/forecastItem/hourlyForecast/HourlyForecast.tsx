import React from 'react'
import styles from './HourlyForecast.module.css'
import { convertTemperature } from '../../../utils/functions'

export default function HourlyForecast({ item, temperatureUnit }: any) {
    const temperatureInCelsius = Number(convertTemperature(item.main.temp, 'C'))
    const heightPercentage = (temperatureInCelsius % 100) + 30

    const fillColor =
        temperatureInCelsius < 0
            ? 'rgb(43, 84, 138)'
            : temperatureInCelsius < 20
            ? 'rgb(173, 168, 2)'
            : temperatureInCelsius < 30
            ? 'rgb(173, 110, 2)'
            : 'rgb(173, 30, 2)'

    console.log(heightPercentage)

    return (
        <div className={styles.main}>
            <div>{item.dt_txt.split(' ')[1].slice(0, 5)}</div>
            <div className={styles.container}>
                <div
                    className={styles.temperature}
                    style={{ height: `${heightPercentage}%`, backgroundColor: fillColor }}
                >
                    {convertTemperature(item.main.temp, temperatureUnit)}°{temperatureUnit}
                </div>
            </div>
            <div className={styles.weather}>
                <img src={item.weather[0].imageUrl} alt={item.weather[0].main} />
                <div>{item.weather[0].main}</div>
            </div>
        </div>
    )
}
