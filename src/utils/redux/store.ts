import { configureStore } from '@reduxjs/toolkit'
import weatherState from './weatherSlice'

const store = configureStore({
    reducer: {
        weather: weatherState,
    },
})

export default store
