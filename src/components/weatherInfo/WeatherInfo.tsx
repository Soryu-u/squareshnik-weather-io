import React from 'react'
import styles from '../weatherCard/WeatherCard.module.css'
import type weatherDetails from '../../utils/interface/weatherDetails'

interface WeatherInfoProps {
    data: weatherDetails
}

export default function WeatherInfo({ data }: WeatherInfoProps) {
    return (
        <div className={styles.infoItem}>
            <img className={styles.infoImage} src={data.image} alt={data.alt} />
            <div className={styles.infoDescription}>
                <div>{data.item}</div>
                <div>{data.description}</div>
            </div>
        </div>
    )
}
