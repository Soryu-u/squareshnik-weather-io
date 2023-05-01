import { configureStore } from '@reduxjs/toolkit'
import LocationState from './locationSlice'
import weatherState from './weatherSlice'

const store = configureStore({
    reducer: {
        weather: weatherState,
        location: LocationState,
    },
})

export default store
