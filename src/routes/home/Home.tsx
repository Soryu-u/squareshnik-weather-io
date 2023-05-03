import React, { useEffect } from 'react'
import WeatherCard from '../../components/weatherCard/WeatherCard'
import styles from './Home.module.css'
import { getWeather } from '../../utils/axios/axios'
import { useDispatch, useSelector } from 'react-redux'
import { addLocation, editLocation } from '../../utils/redux/locationSlice'
import type WeatherData from '../../utils/interface/interface'

export default function Home() {
    const dispatch = useDispatch()
    const location = useSelector((state: any) => state.location.location)
    const cities = localStorage.getItem('locations')
    let citiesArray: string[] = []
    useEffect(() => {
        if (cities !== null && location.length === 0) {
            citiesArray = JSON.parse(cities)
            citiesArray.forEach((city: string) => {
                void getWeather(city).then((result) => {
                    dispatch(addLocation(result))
                })
            })
        }
    }, [])

    const handleRefreshClick = (city: string, reqId: string) => {
        void getWeather(city).then((res) => {
            const newLocation = location.map((w: WeatherData) => (w.reqId === reqId ? res : w))
            dispatch(editLocation(newLocation))
        })
    }

    const handleDeleteClick = (index: number, city: string) => {
        const newLocation = location.filter((card: WeatherData, i: number) => i !== index)
        const cities = localStorage.getItem('locations')
        let citiesArray: string[] = []
        if (cities !== null) {
            citiesArray = JSON.parse(cities)
        }
        const newCities = citiesArray.filter((c: string) => c !== city.toLowerCase())
        localStorage.setItem('locations', JSON.stringify(newCities))
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
                                handleDeleteClick(index, card.name)
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
