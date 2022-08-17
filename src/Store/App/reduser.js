import { createSlice } from '@reduxjs/toolkit'
import { fetchWeatherByName, fetchSport, fetchAutocomplete, fetchHistoryWeather } from './thunks';

const weatherApi = createSlice({
    name: "weatherapi",
    initialState: {
        cityWeather: [],
        sports: [],
        autocompleteCity: [],
        getHistoryWeather: [],
        status: null,
        favoriteCity: []
    },
    reducers: {},
    extraReducers: {
        [fetchWeatherByName.fulfilled]: (state, action) => {
            state.cityWeather = action.payload;
        },
        [fetchSport.fulfilled]: (state, action) => {
            state.sports = action.payload;
        },
        [fetchAutocomplete.fulfilled]: (state, action) => {
            state.autocompleteCity = action.payload;
        },
        [fetchHistoryWeather.fulfilled]: (state, action) => {
            state.getHistoryWeather = action.payload;
        },
    },
})

export const { } = weatherApi.actions
export default weatherApi.reducer




