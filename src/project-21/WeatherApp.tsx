import ComponentWrapper from '../components/ComponentWrapper';
import { useEffect, useState } from 'react';
import { weatherType, LocationType } from './types';

/**
 * WeatherApp Component
 *
 * This component provides a weather forecast application that allows users to search for
 * the current weather of a specific city. It fetches weather data from the OpenWeather API
 * based on the city name entered by the user.
 *
 * State Variables:
 * - `city`: The name of the city for which the weather data is fetched. Default is "gothenburg".
 * - `weather`: The weather data fetched from the API, stored as a `weatherType` object.
 * - `isLoading`: A boolean indicating whether the data is currently being fetched.
 * - `errorMsg`: A string to store any error messages encountered during the API calls.
 *
 * Effects:
 * - `useEffect`: Fetches the weather data whenever the `city` state changes. It makes two API calls:
 *   1. To fetch the geographical coordinates of the city.
 *   2. To fetch the weather data using that coordinates.
 *
 * Dependencies:
 * - `import.meta.env.VITE_WEATHER_API_KEY`: The API key for accessing the OpenWeather API.
 *
 * Notes:
 * - The weather data is displayed in metric units (Celsius).
 * - The date and time are formatted for the "Europe/Stockholm" timezone.
 */
const WeatherApp = () => {
    const [city, setCity] = useState('gothenburg');
    const [weather, setWeather] = useState<weatherType>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchCurrentWeatherBasedOnLocation = async () => {
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
            try {
                setIsLoading(true);

                // First off is to fetch location data based on the city name, meainging we need to get the coordinates of the city
                const locationResponse = (await fetch(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`,
                ).then(res => res.json())) as LocationType[];

                // Second is to fetch weather data based on the location coordinates from the previous API call
                const weatherResponse = (await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${locationResponse[0].lat}&lon=${locationResponse[0].lon}&appid=${apiKey}&units=metric`,
                ).then(res => res.json())) as weatherType;

                setWeather(weatherResponse);
                setIsLoading(false);
            } catch (error) {
                setErrorMsg('There were issues fetching data concerning the weather or location');
                console.error('Error fetching weather data:', error);
            }
        };

        fetchCurrentWeatherBasedOnLocation();
    }, [city]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget));
        setCity(formData.city as string);
    };

    return (
        <ComponentWrapper view="viewport" title="Weather forecast">
            <div className="weather-data">
                <form action="post" onSubmit={handleSubmit} className="weather-data__form">
                    <input name="city" placeholder="Enter city name" defaultValue={city} />
                    <button type="submit" className="weather-data__button">
                        Get Weather
                    </button>
                </form>
                {errorMsg == '' || !isLoading ? (
                    <>
                        {weather ? (
                            <div key={weather.id} className="weather-data__info">
                                <p>
                                    <span>City: </span> {weather.name}
                                </p>
                                <p>
                                    <span>Date: </span>
                                    {new Intl.DateTimeFormat('en-GB', {
                                        dateStyle: 'full',
                                        timeStyle: 'short',
                                        timeZone: 'Europe/Stockholm',
                                    }).format(weather.dt * 1000)}
                                </p>
                                <p>
                                    <span>Degrees: </span> {Math.round(weather.main.temp)}°C
                                </p>
                                <p>
                                    <span>Description: </span> {weather.weather[0].description}
                                </p>
                                <p>
                                    <span>Windspeed: </span> {weather.wind.speed}
                                </p>
                                <p>
                                    <span>Humidity: </span> {weather.main.humidity}
                                </p>
                            </div>
                        ) : (
                            <p>No data found</p>
                        )}
                    </>
                ) : (
                    <p>{errorMsg}</p>
                )}
            </div>
        </ComponentWrapper>
    );
};

export default WeatherApp;
