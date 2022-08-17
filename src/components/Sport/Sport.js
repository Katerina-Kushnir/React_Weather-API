import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../pages/Home/Home.css';
import { weatherSelector } from "../../Store/App/selector";
import { fetchSport } from "../../Store/App/thunks";
import { useTranslation } from "react-i18next";
import '../../utils/i18nex';

import IconButton from '@mui/material/IconButton';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

function Sport() {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const getWeather = useSelector(weatherSelector);
    const [favoriteSport, setFavoriteSport] = useState([]);

    const addFavoriteSport = useCallback((tournament) => {
        localStorage.setItem("favoriteSport", JSON.stringify([...favoriteSport, tournament]));
        setFavoriteSport([...favoriteSport, tournament]);
    }, [favoriteSport])

    const deleteFavoriteSport = useCallback((tournament) => {
        const newFavoriteSport = favoriteSport?.filter(sport => sport !== tournament)
        setFavoriteSport(newFavoriteSport);
        localStorage.setItem('favoriteSport', JSON.stringify(newFavoriteSport));
    }, [favoriteSport])

    const favorSport = localStorage.getItem("favoriteSport");
    const myfavorSport = JSON.parse(favorSport)
    useEffect(() => {
        if (favorSport) {
            setFavoriteSport(myfavorSport);
        }
    }, [])

    useEffect(() => {
        dispatch(fetchSport("London"));
    }, [dispatch])

    return (
        <div className="home-content-right">
            <div className="tournament">
                <p className="tournament-p">{t("sport.allSport")}: {getWeather.cityWeather.error ? "City not found" : getWeather.cityWeather ? getWeather.cityWeather.location?.name : ""}, {getWeather.cityWeather.error ? "Country not found" : getWeather.cityWeather ? getWeather.cityWeather.location?.country : ""}</p>
                <div className="tournament-block">
                    <b>Football</b> {getWeather.sports ? getWeather.sports.football?.map((tournament, index) => (
                        <div key={tournament + index} className="home-content-right-tournament">
                            <p>{tournament.start}</p>
                            <p>Stadium: {tournament.stadium}, {tournament.country}</p>
                            <p>Tournament: {tournament.tournament}</p>
                            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={() => addFavoriteSport(tournament.start + ", " + tournament.stadium + ", " + tournament.tournament)} />
                        </div>
                    )) : ""}

                    <b>Cricket</b> {getWeather.sports ? getWeather.sports.cricket?.map((tournament, index) => (
                        <div key={tournament + index} className="home-content-right-tournament">
                            <p>{tournament.start}</p>
                            <p>Stadium: {tournament.stadium}, {tournament.country}</p>
                            <p>Tournament: {tournament.tournament}</p>
                            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={() => addFavoriteSport(tournament.start + ", " + tournament.stadium + ", " + tournament.tournament)} />
                        </div>
                    )) : ""}

                    <b>Golf</b> {getWeather.sports ? getWeather.sports.golf?.map((tournament, index) => (
                        <div key={tournament + index} className="home-content-right-tournament">
                            <p>{tournament.start}</p>
                            <p>Stadium: {tournament.stadium}, {tournament.country}</p>
                            <p>Tournament: {tournament.tournament}</p>
                            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={() => addFavoriteSport(tournament.start + ", " + tournament.stadium + ", " + tournament.tournament)} />
                        </div>
                    )) : "No sports events found"}
                </div>
            </div>

            <div className="favorite-sport-header">
                <b>{t("sport.favorite")}:</b>
            </div>
            <div className="favorite-sport">
                {favoriteSport.map((tournament, index) => (
                    <div key={tournament + index} className="favorite-sport-delete" onClick={(e) => deleteFavoriteSport(tournament)}>
                        <p key={index}>{tournament}</p>
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sport;
