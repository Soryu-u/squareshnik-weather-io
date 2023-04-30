import React, { useState } from 'react'
import WeatherCard from '../../components/weatherCard/WeatherCard'
import type WeatherData from '../../utils/interface/interface'
import styles from './Home.module.css'
import plus from '../../images/plus.png'
import SelectCityModal from '../../components/modalWindow/selectCityModal/selectCityModal'

export default function Home() {
    const [weather, setWeather] = useState<WeatherData[]>([])
    const [selectCity, setSelectCity] = useState<boolean>(false)

    return (
        <div className={styles.container}>
            {weather.length > 0 &&
                weather.map((card, index) => {
                    return <WeatherCard key={index} data={card} />
                })}
            <div className={styles.add}>
                <img
                    onClick={() => {
                        setSelectCity(!selectCity)
                    }}
                    src={plus}
                    alt={'add'}
                />
            </div>
            {selectCity && <SelectCityModal {...{ weather, setWeather, setSelectCity }} />}
        </div>
    )
}
