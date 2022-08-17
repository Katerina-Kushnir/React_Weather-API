import React, { useState, useEffect, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Home.css';
import { weatherSelector } from "../../Store/App/selector";
import { fetchSport, fetchWeatherByName, fetchAutocomplete, fetchHistoryWeather } from "../../Store/App/thunks";
import { ThemeContext } from '../AppRouter'
import moment from "moment";
import { useTranslation } from "react-i18next";
import '../../utils/i18nex';
import LogoutBtn from "../../components/Logout/Logout";
import Account from "../../components/Account/Account";
import Sport from "../../components/Sport/Sport";

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const stylesContext = {
    light: {
        homePage: {
            color: 'black',
        }
    },
    dark: {
        homePage: {
            color: 'white',
        }
    },
};

function Home() {
    const dispatch = useDispatch();

    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    }

    const getWeather = useSelector(weatherSelector);
    const [degree, setDegree] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [pressure, setPressure] = useState(null);
    const [favoriteCity, setFavoriteCity] = useState("");
    const [selectedCity, setSelectedCity] = useState(false);
    const [weatherHourly, setWeatherHourly] = useState("");
    const [cityForCalendar, setCityForCalendar] = useState("");
    const [listOfFavoriteCity, setListOfFavoriteCity] = useState([]);
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        const lang = localStorage.getItem("i18nextLng");
        if (lang) {
            setLanguage(lang);
        } else {
            setLanguage("en");
        }
    }, [])

    const degrees = useCallback((event) => {
        localStorage.setItem("temperature", event.target.value);
        const temp = localStorage.getItem("temperature");
        setDegree(temp);
    }, [])
    
    const windSpeedy = useCallback((event) => {
        localStorage.setItem("wind speed", event.target.value);
        const wind = localStorage.getItem("wind speed",);
        setWindSpeed(wind);
    }, [])

    const pressures = useCallback((event) => {
        localStorage.setItem("pressure", event.target.value);
        const pressure = localStorage.getItem("pressure");
        setPressure(pressure);
    }, [])

    const stop = useCallback((event) => {
        event.stopPropagation();
    }, [])

    const getFavoriteCity = useCallback((event) => {
        setFavoriteCity(event.target.value);
        setCityForCalendar(event.target.value);
        if (event.target.value.length > 2) {
            setSelectedCity(true);
        }
    }, [setSelectedCity])

    const addCity = useCallback(() => {
        dispatch(fetchWeatherByName(favoriteCity));
        setFavoriteCity("");
    }, [dispatch, favoriteCity])

    const selectFromListFavoriteCities = useCallback((event) => {
        dispatch(fetchWeatherByName(event.target.textContent))
    }, [dispatch])

    const addFavoriteCity = useCallback((favoriteCity) => {
        localStorage.setItem("favoriteCities", JSON.stringify([...listOfFavoriteCity, favoriteCity]));
        setListOfFavoriteCity([...listOfFavoriteCity, favoriteCity]);
    }, [listOfFavoriteCity])

    const deleteFromListFavoriteCities = useCallback((cityName) => {
        const newListOfFavoriteCity = listOfFavoriteCity.filter(city => city.name !== cityName)
        setListOfFavoriteCity(newListOfFavoriteCity);
        localStorage.setItem("favoriteCities", JSON.stringify(newListOfFavoriteCity));
    }, [listOfFavoriteCity])

    const getCityAutocomplete = useCallback((event) => {
        dispatch(fetchWeatherByName(event.target.textContent));
        dispatch(fetchSport(event.target.textContent));
        setSelectedCity(false);
        setFavoriteCity("");
    }, [dispatch])

    const getWeatherHourly = (index) => {
        setWeatherHourly(getWeather.cityWeather.forecast.forecastday[index].hour);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);   //MUI
    const open = Boolean(anchorEl);     //MUI
    const handleClick = (event) => { event.stopPropagation(); setAnchorEl(event.currentTarget); };   //MUI
    const handleClose = (event) => { event.stopPropagation(); setAnchorEl(null); };   //MUI
    const [openModal, setOpenModal] = React.useState(false);    //MUI
    const handleOpenModal = (event) => { event.stopPropagation(); setOpenModal(true) };    //MUI
    const handleCloseModal = (event) => { event.stopPropagation(); setOpenModal(false) };  //MUI
    const [value, setValue] = React.useState(new Date());  //MUI
    const handleChangeCalendar = (newValue) => {
        setValue(newValue);
        const rightFormatDate = moment(newValue).format().split("T")[0];
        dispatch(fetchHistoryWeather({ rightFormatDate, cityForCalendar }));
    };     //MUI

    useEffect(() => {
        const temp = localStorage.getItem("temperature");
        if (temp) {
            setDegree(temp);
        } else {
            setDegree("C");
        }
    }, [])

    useEffect(() => {
        const wind = localStorage.getItem("wind speed");
        if (wind) {
            setWindSpeed(wind);
        } else {
            setWindSpeed("kph");
        }
    }, [])

    useEffect(() => {
        const press = localStorage.getItem("pressure");
        if (press) {
            setPressure(press);
        } else {
            setPressure("mb");
        }
    }, [])

    const favor = localStorage.getItem("favoriteCities");
    const favCity = JSON.parse(favor)
    useEffect(() => {
        if (favor) {
            setListOfFavoriteCity(favCity);
        }
    }, [])

    useEffect(() => {
        dispatch(fetchWeatherByName("London"));
    }, [dispatch])

    useEffect(() => {
        const hourly = getWeather ? getWeather?.cityWeather?.forecast?.forecastday[0]?.hour : null
        setWeatherHourly(hourly);
    }, [getWeather])

    // useEffect(() => {
    //     dispatch(fetchAutocomplete(""));
    // }, [dispatch])

    // useEffect(() => {
    //     console.log("Autocomplete", getWeather.sports);
    // })

    useEffect(() => {
        if (favoriteCity) {
            dispatch(fetchAutocomplete(favoriteCity));
        } else {
            return
        }
    }, [favoriteCity, dispatch])

    // useEffect(() => {
    //     dispatch(fetchHistoryWeather(""));
    //     dispatch(fetchWeatherByName("London"));
    // }, [dispatch])


    const theme = useContext(ThemeContext);
    const styles = stylesContext[theme];

    return (
        <div>
            <div style={styles.homePage}>
                <div className="homePageBg"></div>
                <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Typography sx={{ minWidth: 100 }}>{t("header.api")}</Typography>
                        <Typography sx={{ minWidth: 100 }}>{t("header.name")}</Typography>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={() => changeLanguage("en")}>{t("lang.en")}</Button>
                            <Button onClick={() => changeLanguage("ua")}>{t("lang.ua")}</Button>
                        </ButtonGroup>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <Account/>
                        <Divider />

                        <MenuItem onClick={handleOpenModal}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            {t("header.settings")}
                            <Modal
                                open={openModal}
                                onClose={handleCloseModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">{t("header.temp")}</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            onClick={(e) => stop(e)}
                                            onChange={(e) => degrees(e)}
                                        >
                                            <FormControlLabel value="F" control={<Radio />} label={t("header.tempF")} />
                                            <FormControlLabel value="C" control={<Radio />} label={t("header.tempC")} />
                                        </RadioGroup>

                                        <FormLabel id="demo-radio-buttons-group-label2">{t("header.wind")}</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label2"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            onClick={(e) => stop(e)}
                                            onChange={(e) => windSpeedy(e)}
                                        >
                                            <FormControlLabel value="kph" control={<Radio />} label={t("header.windK")} />
                                            <FormControlLabel value="mph" control={<Radio />} label={t("header.windM")} />
                                        </RadioGroup>

                                        <FormLabel id="demo-radio-buttons-group-label3">Atmospheric pressure</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label3"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            onClick={(e) => stop(e)}
                                            onChange={(e) => pressures(e)}
                                        >
                                            <FormControlLabel value="mb" control={<Radio />} label="pressure mb" />
                                            <FormControlLabel value="in" control={<Radio />} label="pressure in" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Modal>
                        </MenuItem>

                        <LogoutBtn/>
                    </Menu>

                    <div className="homeTop">
                        <div className="search-city">
                            <TextField id="outlined-basic" value={favoriteCity} onChange={(e) => getFavoriteCity(e)} label={t("city.searchCity")} variant="outlined" size="small" />
                            <Button variant="text" onClick={() => addCity()}>{t("city.search")}</Button>
                            {
                                selectedCity ? <div className="auto-city">
                                    {
                                        Array.isArray(getWeather?.autocompleteCity) ? getWeather?.autocompleteCity?.map((city, index) => (
                                            <p key={index} onClick={(e) => getCityAutocomplete(e)} >{city.name.startsWith(favoriteCity) ? city.name : ""}</p>
                                        )) : ""
                                    }
                                </div> : ""
                            }
                        </div>

                        <div className="calendar">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label={t("calendar.dateDesk")}
                                        inputFormat="yyyy-MM-dd"
                                        value={value}
                                        onChange={handleChangeCalendar}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </div>

                    </div>


                    <div className="home-content">
                        <div className="home-content-left">
                            <div className="home-content-favorite-city">
                                <p className="variant-city">{t("city.select")}: {getWeather.cityWeather.error ? "City not found" : getWeather.cityWeather ? getWeather.cityWeather.location?.name : ""}, {getWeather.cityWeather.error ? "Country not found" : getWeather.cityWeather ? getWeather.cityWeather.location?.country : ""}</p>
                                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={() => addFavoriteCity(getWeather.cityWeather.location)} />
                            </div>

                            <div className="myFavoriteCity">
                                <div>{t("city.favorite")}:
                                    {
                                        listOfFavoriteCity.map((favoriteCity, index) => (
                                            <p key={(favoriteCity + index)} className="favoriteCity-row">
                                                <span onClick={(e) => selectFromListFavoriteCities(e)}>{" " + favoriteCity.name}</span>
                                                <IconButton aria-label="delete" onClick={() => deleteFromListFavoriteCities(favoriteCity.name)} >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </p>
                                        ))
                                    }
                                </div>

                            </div>
                            <div className="home-content-left-top">

                                <div className="weather-day">
                                    <div className="weather-day-left">
                                        <div className="weather-data">
                                            <p className="weather-data-time">{getWeather ? getWeather.cityWeather.location?.localtime : ""}</p>
                                        </div>
                                        <div className="weather-data">
                                            <p className="weather-data-city">{getWeather ? getWeather.cityWeather.location?.name : ""}</p>
                                        </div>
                                        <div className="weather-data-flex">
                                            <p className="weather-data-temp">
                                                {(degree === "F") ? getWeather.cityWeather.current?.temp_f + " °F" : ""}
                                                {(degree === "C") ? getWeather.cityWeather.current?.temp_c + " °C" : ""}
                                            </p>
                                            <p className="weather-data-icon">
                                                <img src={getWeather.cityWeather.current?.condition.icon} alt="img"/>
                                                <span>{getWeather.cityWeather.current?.condition.text}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="weather-day-right">
                                        <p className="weather-day-right-data">{t("weather.feelslike")}............
                                            {(degree === "F") ? getWeather.cityWeather.current?.feelslike_f + " °F" : ""}
                                            {(degree === "C") ? getWeather.cityWeather.current?.feelslike_c + " °C" : ""}
                                        </p>
                                        <p className="weather-day-right-data">{t("weather.wind")}.....
                                            {(windSpeed === "kph") ? getWeather.cityWeather.current?.wind_kph + " kph" : ""}
                                            {(windSpeed === "mph") ? getWeather.cityWeather.current?.wind_mph + " mph" : ""}

                                        </p>
                                        <p className="weather-day-right-data">{t("weather.press")}...........
                                            {(pressure === "mb") ? getWeather.cityWeather.current?.pressure_mb + " mb" : ""}
                                            {(pressure === "in") ? getWeather.cityWeather.current?.pressure_in + " in" : ""}
                                        </p>
                                    </div>
                                </div>

                                <div className="days">
                                    {
                                        getWeather ? getWeather.cityWeather.forecast?.forecastday.map((day, index) => (
                                            <div key={day.date + index} className="one-day" onClick={() => getWeatherHourly(index)}>
                                                <div>{day.date}</div>
                                                <img src={day.day.condition.icon}  alt="img"/>
                                                <div>{day.day.condition.text}</div>
                                                <div className="days-temp">
                                                    <div>
                                                        <p className="days-temp-margin">{t("weather.min")}</p>
                                                        <p className="days-temp-margin">
                                                            {(degree === "F") ? day.day.mintemp_f + " °F" : ""}
                                                            {(degree === "C") ? day.day.mintemp_c + " °C" : ""}
        
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="days-temp-margin">{t("weather.max")}</p>
                                                        <p className="days-temp-margin">
                                                            {(degree === "F") ? day.day.maxtemp_f + " °F" : ""}
                                                            {(degree === "C") ? day.day.maxtemp_c + " °C" : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : ""
                                    }
                                </div>

                            </div>

                            <div className="waether-hourly">
                                {
                                    weatherHourly ? weatherHourly.map((cityTime, i) => (
                                        <div key={(cityTime + i)} className="hour">
                                            <div className="hour-content">{cityTime.time}</div>
                                            <div className="hour-content"><img src={cityTime.condition.icon}  alt="img"/><p>{cityTime.condition.text}</p></div>

                                            <div className="hour-content">
                                                {(degree === "F") ? cityTime.temp_f + " °F" : ""}
                                                {(degree === "C") ? cityTime.temp_c + " °C" : ""}
                                            </div>
                                            <div className="hour-content">
                                                {(windSpeed === "kph") ? cityTime.wind_kph + " kph" : ""}
                                                {(windSpeed === "mph") ? cityTime.wind_mph + " mph" : ""}
                                            </div>
                                            <div className="hour-content">
                                                {(pressure === "mb") ? cityTime.pressure_mb + " mb" : ""}
                                                {(pressure === "in") ? cityTime.pressure_in + " in" : ""}
                                            </div>

                                        </div>
                                    )) : ""
                                }
                            </div>

                            <div className="history-weather">
                                <div className="history-weather-date">{t("weather.history")}:
                                    {
                                        getWeather ? getWeather.getHistoryWeather.forecast?.forecastday.map((day, index) => (
                                            <div key={day.date + index}>
                                                <div className="history-weather-data">{day.date}</div>
                                            </div>
                                        )) : ""
                                    }
                                </div>
                                <div className="history-weather-flex">
                                    <div className="days-temp-history-left">
                                        <p className="history-weather-name">{getWeather.getHistoryWeather.error ? "Please select city and date to receive the history" : getWeather.getHistoryWeather ? getWeather.getHistoryWeather.location?.name + ", " : ""} 
                                        {getWeather.getHistoryWeather.error ? "" : getWeather.getHistoryWeather ? getWeather.getHistoryWeather.location?.country : ""}</p>
                                        {
                                            getWeather ? getWeather.getHistoryWeather.forecast?.forecastday.map((day, index) => (
                                                <div key={day.date + index}>
                                                    <div className="days-temp-history">
                                                        <div className="days-temp-history-col1">
                                                            <p>
                                                                {(degree === "F") ? day.day.avgtemp_f + " °F" : ""}
                                                                {(degree === "C") ? day.day.avgtemp_c + " °F" : ""}
                                                            </p>
                                                        </div>
                                                        <div className="days-temp-history-col2">
                                                            <img src={day.day.condition.icon}  alt="img"/>
                                                            <p>{day.day.condition.text}</p>
                                                        </div>
                                                    </div>
                                                    <div className="days-temp-history-wind">
                                                        <p>{t("weather.wind")}..........
                                                            {(windSpeed === "kph") ? day.day.maxwind_kph + "kph" : ""}
                                                            {(windSpeed === "mph") ? day.day.maxwind_mph + "mph" : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            )) : ""
                                        }
                                    </div>
                                    <div className="days-temp-history-right">
                                        {
                                            getWeather ? getWeather.getHistoryWeather.forecast?.forecastday.map((day, index) => (
                                                <div key={day.date + index}>
                                                    <div className="days-temp-history">
                                                        <div className="days-temp-history-col3">
                                                            <p>{t("weather.sunrise")}..........
                                                                {day.astro.sunrise}
                                                            </p>
                                                            <p>{t("weather.sunset")}...........
                                                                {day.astro.sunset}
                                                            </p>
                                                            <p>{t("weather.moonrise")}.....
                                                                {day.astro.moonrise}
                                                            </p>
                                                            <p>{t("weather.moonset")}......
                                                                {day.astro.moonset}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )) : ""
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>

                        <Sport/>
                    </div>

                </React.Fragment>
            </div>
        </div>
    );
}

export default Home;
