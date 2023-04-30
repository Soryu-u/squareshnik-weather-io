import React from 'react'
import styles from '../weatherCard/WeatherCard.module.css'

export default function WeatherInfo({ data }: any) {
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
