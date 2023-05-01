import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type WeatherData from '../interface/interface'

interface LocationState {
    location: WeatherData[]
}

const initialState: LocationState = {
    location: [],
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        addLocation: (state, action: PayloadAction<WeatherData>) => {
            state.location.push(action.payload)
        },
        editLocation: (state, action: PayloadAction<WeatherData[]>) => {
            state.location = action.payload
        },
    },
})

export const { addLocation, editLocation } = locationSlice.actions

export default locationSlice.reducer
