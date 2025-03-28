import { useState, useCallback, Suspense, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRainbow, FaMapPin, FaSun, FaWind, FaTint, FaEye, FaCloud, FaThermometerHalf, FaCloudRain, FaSnowflake } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { WeatherSkeleton } from '@/components/WeatherSkeleton';
import 'leaflet/dist/leaflet.css';
import { Input, Typography, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<string>(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const API_KEY = import.meta.env.VITE_OPEN_API_KEY;

    // ... [previous fetchWeather and fetchForecast functions remain the same]

    const fetchWeather = useCallback(async () => {
        if (!city.trim()) {
            toast({
                title: "Error",
                description: "Please enter a city name",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${API_KEY}`
            );
            const data = await response.json();

            if (data.cod === '404') {
                throw new Error('City not found');
            }

            setWeather(data);
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to fetch weather data",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    }, [city, toast]);

    // Fetch weather forecast for the next 6 days
    const fetchForecast = useCallback(async () => {
        if (!city.trim()) return;
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city.trim()}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();

            if (data.cod !== '200') {
                throw new Error('Failed to fetch forecast data');
            }

            setForecast(data);
        } catch (error) {
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to fetch forecast data',
                variant: 'destructive',
            });
        }
    }, [city, toast]);

    // ... [previous utility functions remain the same]

    useEffect(() => {
        fetchForecast();
    }, [city]);


    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Prepare chart data for next 6 days
    const chartData = forecast
        ? {
            labels: forecast.list.slice(0, 6).map((item) => {
                return new Date(item.dt * 1000).toLocaleDateString(); // Get the date
            }),
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: forecast.list.slice(0, 6).map((item) => item.main.temp), // Temperature data
                    fill: true,
                    borderColor: '#8884d8',
                    backgroundColor: 'rgba(136, 132, 216, 0.3)',
                    tension: 0.3,
                },
            ],
        }
        : {};

    // Function to determine the icon based on weather description
    const getWeatherIcon = (description: string) => {
        if (description.includes('cloud')) {
            return <FaCloud />;
        } else if (description.includes('rain')) {
            return <FaCloudRain />;
        } else if (description.includes('snow')) {
            return <FaSnowflake />;
        } else if (description.includes('clear')) {
            return <FaSun />;
        } else if (description.includes('wind')) {
            return <FaWind />;
        } else {
            return <FaCloud />;
        }
    };

    function WeatherIconWithTemperature({ weather }) {
        const icon = getWeatherIcon(weather.weather[0].description);
        const temperature = Math.round(weather.main.temp);

        return (
            <div className="flex flex-col items-center">
                {/* Animated weather icon */}
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    className="text-6xl text-yellow-500 mb-2"
                >
                    {icon}
                </motion.div>

                {/* Temperature */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-3xl font-bold text-white mb-1"
                >
                    {temperature}°C
                </motion.div>

                {/* Weather description */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-lg text-white capitalize"
                >
                    {weather.weather[0].description}
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-400 to-blue-500 text-white">
            <div className="max-w-6xl mx-auto py-8 px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="flex text-4xl font-semibold"> <FaRainbow /> WeatherPulse</h1>
                        <div className="max-w-md w-full">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex space-x-4">
                                    <Input
                                        placeholder="Enter city name..."
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
                                        className="w-full p-3 bg-white text-black rounded-lg shadow-md focus:outline-none"
                                    />
                                    <Button
                                        onClick={fetchWeather}
                                        disabled={loading}
                                        className="bg-blue-500 text-white p-7 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        {loading ? 'Loading...' : 'Search'}
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <WeatherSkeleton />
                    ) : weather && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="main-card-body gap-6"
                        >
                            {/* Left Column - Weather Information Cards */}
                            <div className="w-full md:w-1/2 flex flex-col gap-6">

                                <div className='flex flex-col sm:flex-row gap-6 card-pair'>
                                {/* Location Card */}
                                <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-lg p-6 card">
                                    <div className="flex flex-col gap-3 md:flex-row justify-center items-center">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white flex items-center ">
                                                <FaMapPin /> {weather.name}, {weather.sys.country}
                                            </h3>
                                            <p className="text-lg text-white capitalize font-medium text-center">{weather.weather[0].description}</p>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <h2 className="text-4xl text-white font-bold">{Math.round(weather.main.temp)}°C</h2>
                                            <p className='text-4xl text-yellow-400'>
                                                {getWeatherIcon(weather.weather[0].description)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Temperature Details Card */}
                                <div className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-lg shadow-lg p-6 card">
                                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <FaThermometerHalf /> Temperature Details
                                    </h3>
                                    <div className='flex flex-col items-center space-y-2 font-medium'>
                                        <p className='text-white text-lg font-medium'>Feels like: {Math.round(weather.main.feels_like)}°C</p>
                                        <p className='text-white text-lg font-medium'>Min: {Math.round(weather.main.temp_min)}°C</p>
                                        <p className='text-white text-lg font-medium'>Max: {Math.round(weather.main.temp_max)}°C</p>
                                    </div>
                                </div>
                                </div>

                                <div className='flex flex-col sm:flex-row gap-6 card-pair'>
                                {/* Wind Information Card */}
                                <div className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 rounded-lg shadow-lg p-6 card">
                                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <FaWind /> Wind Information
                                    </h3>
                                    <div className='flex flex-col items-center font-medium'>
                                        <p className='text-white'>Speed: {weather.wind.speed} m/s</p>
                                        <p className='text-white'>Direction: {weather.wind.deg}°</p>
                                        <p className='text-white'>Gusts: {weather.wind.gust || 'N/A'} m/s</p>
                                    </div>
                                </div>

                                {/* Humidity & Pressure Card */}
                                <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-lg shadow-lg p-6 card">
                                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <FaTint /> Humidity & Pressure
                                    </h3>
                                    <div className='flex flex-col items-center font-medium'>
                                        <p className='text-white'>Humidity: {weather.main.humidity}%</p>
                                        <p className='text-white'>Pressure: {weather.main.pressure} hPa</p>
                                        <p className='text-white'>Sea Level: {weather.main.sea_level || 'N/A'} hPa</p>
                                    </div>
                                </div>
                                </div>

                                <div className='flex flex-col sm:flex-row gap-6 card-pair'>
                                {/* Visibility & Clouds Card */}
                                <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 h-full card">
                                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <FaEye /> Visibility & Clouds
                                    </h3>
                                    <div className='flex flex-col items-center font-medium'>
                                        <p className='text-white'>Visibility: {weather.visibility / 1000} km</p>
                                        <p className="text-white flex items-center gap-2">
                                            <FaCloud color='white' /> Cloud Cover: {weather.clouds.all}%
                                        </p>
                                    </div>
                                </div>

                                {/* Sunrise/Sunset Card */}
                                <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-lg shadow-lg p-6 card">
                                    <h3 className="text-xl font-semibold text-white flex flex-col items-center gap-2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaSun color="yellow" />
                                            Sunrise: {formatTime(weather.sys.sunrise)}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaSun color="yellow" />
                                            Sunset: {formatTime(weather.sys.sunset)}
                                        </div>
                                    </h3>
                                </div>
                                </div>

                            </div>

                            {/* Right Column - Graph and Map */}
                            <div className="w-full md:w-1/2 flex flex-col gap-6">

                                {/* Temperature Forecast Graph */}
                                {forecast && (
                                    <div className="bg-white rounded-lg shadow-lg p-6">
                                        <Typography variant="h6" color="primary" mb={2}>
                                            Temperature Forecast
                                        </Typography>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <LineChart data={forecast.list}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis
                                                    dataKey="dt_txt"
                                                    tickFormatter={(value) => {
                                                        const date = new Date(value);
                                                        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                                    }}
                                                    angle={0}
                                                    textAnchor="end"
                                                />
                                                <YAxis />
                                                <Tooltip
                                                    labelFormatter={(value) => {
                                                        const date = new Date(value);
                                                        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                                                    }}
                                                    formatter={(value) => [`${value}°C`, 'Temperature']}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="main.temp"
                                                    stroke="#8884d8"
                                                    fill="rgba(136, 132, 216, 0.3)"
                                                    strokeWidth={2}
                                                    dot={false}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}

                                {/* Location Map */}
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h3 className="text-xl font-semibold text-purple-600 mb-4">Location on Map</h3>
                                    <div className="h-96 rounded-lg overflow-hidden">
                                        <Suspense fallback={<div className="h-full bg-gray-200"></div>}>
                                            <MapContainer
                                                center={[weather.coord.lat, weather.coord.lon]}
                                                zoom={13}
                                                style={{ height: '100%', width: '100%' }}
                                            >
                                                <TileLayer
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                />
                                                <Marker position={[weather.coord.lat, weather.coord.lon]}>
                                                    <Popup>
                                                        {weather.name}, {weather.sys.country}
                                                    </Popup>
                                                </Marker>
                                            </MapContainer>
                                        </Suspense>
                                    </div>
                                </div>

                            </div>
                        </motion.div>


                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default App;