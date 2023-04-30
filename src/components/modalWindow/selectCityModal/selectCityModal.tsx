import React, { type Dispatch, type SetStateAction, useState } from 'react'
import type WeatherData from '../../../utils/interface/interface'
import { getWeather } from '../../../utils/axios/axios'
import styles from './SelectCityModal.module.css'

interface Props {
    weather: WeatherData[]
    setWeather: (weather: WeatherData[]) => void
    setSelectCity: Dispatch<SetStateAction<boolean>>
}

export default function SelectCityModal({ weather, setWeather, setSelectCity }: Props) {
    const [city, setCity] = useState<string>('')

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCity(event.target.value)
    }

    function handleAccept() {
        addNewCity(city)
        setCity('')
        setSelectCity(false)
    }

    function addNewCity(city: string) {
        void getWeather(city).then((result) => {
            setWeather([...weather, result])
        })
    }

    function handleCancel() {
        setCity('')
        setSelectCity(false)
    }

    return (
        <div className={styles.container}>
            <div>
                <h2>Enter city</h2>
                <input type='text' value={city} onChange={handleInputChange} />
                <div>
                    <button onClick={handleAccept}>Accept</button>
                    <button onClick={handleCancel}>Cansel</button>
                </div>
            </div>
        </div>
    )
}
