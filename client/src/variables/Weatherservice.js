import axios from 'axios';

const weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=19.07&lon=72.87&exclude=current,minutely,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER}';

const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=19.07&lon=72.87&exclude=daily,hourly,minutely,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER}';

const rainfallUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=19.07&lon=72.87&key=${process.env.REACT_APP_RAINFALL}&days=7'

const airQuality = 'http://api.airvisual.com/v2/nearest_city?key=${process.env.REACT_APP_AIR_QUALITY}';

export class Weatherservice {

    getWeather(locationData) {
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData.lat}&lon=${locationData.lon}&exclude=current,minutely,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER}`)
        .then(res => res.data);
    }

    getCurrentWeather(locationData) {
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData.lat}&lon=${locationData.lon}&exclude=daily,hourly,minutely,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER}`)
        .then(res => res.data);
    }

    getCurrentRainfall(locationData) {
        return axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${locationData.lat}&lon=${locationData.lon}&key=${process.env.REACT_APP_RAINFALL}&days=7`)
        .then(res => res.data);
    }

    getAirQuality() {
        return axios.get(airQuality).then(res => res.data);
    }
}