import React, { useState } from 'react'
import WeatherCard from '../../components/weatherCard/WeatherCard'
import type WeatherData from '../../utils/interface/interface'
import styles from './Home.module.css'
import plus from '../../images/plus.png'
import SelectCityModal from '../../components/modalWindow/selectCityModal/selectCityModal'
import { getWeather } from '../../utils/axios/axios'

export default function Home() {
    const [weather, setWeather] = useState<WeatherData[]>([])
    const [selectCity, setSelectCity] = useState<boolean>(false)

    const handleRefreshClick = (city: string, reqId: string) => {
        void getWeather(city).then((res) => {
            setWeather((prevWeather) => prevWeather.map((w) => (w.reqId === reqId ? res : w)))
        })
    }

    console.log(weather)

    return (
        <div className={styles.container}>
            {weather.length > 0 &&
                weather.map((card, index) => {
                    return (
                        <WeatherCard
                            key={index}
                            data={card}
                            onDelete={() => {
                                const newWeather = [...weather]
                                newWeather.splice(index, 1)
                                setWeather(newWeather)
                            }}
                            onRefresh={() => {
                                handleRefreshClick(card.name, card.reqId)
                            }}
                        />
                    )
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
