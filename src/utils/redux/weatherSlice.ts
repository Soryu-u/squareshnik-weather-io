import { createSlice } from '@reduxjs/toolkit'

interface weatherState {
    temperatureUnit: string
}

const initialState: weatherState = {
    temperatureUnit: 'C',
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        changeTemperatureUnit: (state, action) => {
            state.temperatureUnit = action.payload
        },
    },
})

export const { changeTemperatureUnit } = weatherSlice.actions

export default weatherSlice.reducer
