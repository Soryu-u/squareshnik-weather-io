import React from 'react'
import WeatherCard from '../../components/weatherCard/WeatherCard'
import styles from './Home.module.css'
import { getWeather } from '../../utils/axios/axios'
import { useDispatch, useSelector } from 'react-redux'
import { editLocation } from '../../utils/redux/locationSlice'
import type WeatherData from '../../utils/interface/interface'

export default function Home() {
    const dispatch = useDispatch()
    const location = useSelector((state: any) => state.location.location)

    const handleRefreshClick = (city: string, reqId: string) => {
        void getWeather(city).then((res) => {
            const newLocation = location.map((w: WeatherData) => (w.reqId === reqId ? res : w))
            dispatch(editLocation(newLocation))
        })
    }

    const handleDeleteClick = (index: number) => {
        const newLocation = location
            .map((card: WeatherData, i: number) => {
                if (i === index) {
                    return null
                } else {
                    return card
                }
            })
            .filter((card: WeatherData) => card !== null)
        dispatch(editLocation(newLocation))
    }

    return (
        <div className={styles.container}>
            {location.length > 0 &&
                location.map((card: WeatherData, index: number) => {
                    return (
                        <WeatherCard
                            key={index}
                            data={card}
                            onDelete={() => {
                                handleDeleteClick(index)
                            }}
                            onRefresh={() => {
                                handleRefreshClick(card.name, card.reqId)
                            }}
                        />
                    )
                })}
        </div>
    )
}
