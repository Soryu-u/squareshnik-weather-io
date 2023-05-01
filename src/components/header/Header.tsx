import React from 'react'
import styles from './Header.module.css'
import logo from '../../images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { changeTemperatureUnit } from '../../utils/redux/weatherSlice'

export default function Header() {
    const dispatch = useDispatch()

    const temperatureUnit = useSelector((state: any) => state.weather.temperatureUnit)

    const handleTemperatureUnitChange = (unit: string) => {
        dispatch(changeTemperatureUnit(unit))
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img className={styles.logoImage} src={logo} alt={'logo'} />
                Weather IO
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
