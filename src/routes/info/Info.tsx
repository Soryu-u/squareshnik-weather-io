import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getFullWeatherInfo } from '../../utils/axios/axios'
import styles from './Info.module.css'
import type FullWeatherData from '../../utils/interface/fullDataInterface'
import { useSelector } from 'react-redux'
import DailyForecast from '../../components/forecastItem/dailyForecast/DailyForecast'
import Sidebar from '../../components/sidebar/Sidebar'
import HourlyForecast from '../../components/forecastItem/hourlyForecast/HourlyForecast'

export default function Info() {
    const [weatherInfo, setWeatherInfo] = useState<FullWeatherData>()
    const { id } = useParams()
    let city: string = ''
    if (id != null) {
        city = id.split(':')[1]
    }

    useEffect(() => {
        void getFullWeatherInfo(city).then((res) => {
            setWeatherInfo(res)
        })
    }, [city])

    const temperatureUnit = useSelector((state: any) => state.weather.temperatureUnit)

    return (
        <div>
            {weatherInfo !== undefined && (
                <div className={styles.main}>
                    <Sidebar {...{ weatherInfo, temperatureUnit }} />
                    <div className={styles.weatherInfo}>
                        <div className={styles.forecast}>
                            <div className={styles.headText}>Forecast</div>
                            <div style={{ overflowY: 'auto' }}>
                                <div className={styles.forecastCards}>
                                    {weatherInfo.list.map((item: any, index: number) => {
                                        const date = item.dt_txt.split(' ')
                                        if (date[1] === '12:00:00') {
                                            return (
                                                <DailyForecast
                                                    key={index}
                                                    {...{
                                                        item,
                                                        date,
                                                        temperatureUnit,
                                                    }}
                                                />
                                            )
                                        }
                                        return null
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={styles.headText}>Hourly forecast</div>
                        <div className={styles.highlights}>
                            <div className={styles.hourlyForecast}>
                                {weatherInfo.list.map((item, index) => {
                                    if (index > 0 && index < 10) {
                                        return (
                                            <HourlyForecast
                                                key={index}
                                                {...{ item, temperatureUnit }}
                                            />
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
