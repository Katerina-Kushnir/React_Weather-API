import { createAsyncThunk } from '@reduxjs/toolkit';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cdaa531bf2msh3a74fc950af8a77p1387b9jsn048eff83de29',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

export const fetchWeatherByName = createAsyncThunk(
    'http://api.weatherapi.com/v1/current.json',
    async function (city) {
        try {
            const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Error", error);
        }
    }
)

export const fetchSport = createAsyncThunk(
    'https://weatherapi-com.p.rapidapi.com/sports.json',
    async function (citySport) {
        try {
            const response = await fetch(`https://weatherapi-com.p.rapidapi.com/sports.json?q=${citySport}`, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Error sport", error);
        }
    }
)

export const fetchAutocomplete = createAsyncThunk(
    'https://weatherapi-com.p.rapidapi.com/search.json',
    async function (searchCity) {
        try {
            const response = await fetch(`https://weatherapi-com.p.rapidapi.com/search.json?q=${searchCity}`, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Search city Error", error);
        }
    }
)

export const fetchHistoryWeather = createAsyncThunk(
    'https://weatherapi-com.p.rapidapi.com/history.json',
    async function (dataSmth) {
        try {
            const response = await fetch(`https://weatherapi-com.p.rapidapi.com/history.json?q=${dataSmth.cityForCalendar}&dt=${dataSmth.rightFormatDate}&lang=en`, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("History Weather Error", error);
        }
    }
)