import React, { useState } from 'react'
import styles from './Header.module.css'
import logo from '../../images/logo.png'
import search from '../../images/search.png'
import { useDispatch, useSelector } from 'react-redux'
import { changeTemperatureUnit } from '../../utils/redux/weatherSlice'
import { getWeather } from '../../utils/axios/axios'
import { addLocation } from '../../utils/redux/locationSlice'
import { Link } from 'react-router-dom'

export default function Header() {
    const [city, setCity] = useState<string>('')
    const dispatch = useDispatch()

    const temperatureUnit = useSelector((state: any) => state.weather.temperatureUnit)

    const handleTemperatureUnitChange = (unit: string) => {
        dispatch(changeTemperatureUnit(unit))
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCity(event.target.value)
    }

    function handleAccept() {
        addNewCity(city)
        setCity('')
    }

    function addNewCity(city: string) {
        void getWeather(city).then((result) => {
            dispatch(addLocation(result))
        })
    }

    return (
        <div className={styles.header}>
            <Link to={'/'} className={styles.logo}>
                <img className={styles.logoImage} src={logo} alt={'logo'} />
                Weather IO
            </Link>
            <div className={styles.input}>
                <img src={search} alt={'search'} />
                <input
                    type={'text'}
                    placeholder={'Enter city'}
                    value={city}
                    onChange={handleInputChange}
                />
                <button onClick={handleAccept}>Search</button>
            </div>
            <ul className={styles.temperature}>
                <li
                    className={temperatureUnit === 'C' ? styles.active : undefined}
                    onClick={() => {
                        handleTemperatureUnitChange('C')
                    }}
                >
                    C°
                </li>
                <li
                    className={temperatureUnit === 'F' ? styles.active : undefined}
                    onClick={() => {
                        handleTemperatureUnitChange('F')
                    }}
                >
                    F°
                </li>
            </ul>
        </div>
    )
}
