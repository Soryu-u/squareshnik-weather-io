import React from 'react'
import styles from './Root.module.css'
import { Outlet } from 'react-router-dom'
import Header from '../../components/header/Header'
import { Provider } from 'react-redux'
import store from '../../utils/redux/store'

export default function Root() {
    return (
        <div className={styles.main}>
            <Provider store={store}>
                <Header />
                <Outlet />
            </Provider>
        </div>
    )
}
