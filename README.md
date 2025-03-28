# 🌤️ WeatherPulse 🌦️

Welcome to **WeatherPulse**, the ultimate weather dashboard that provides real-time weather data with location filters and interactive elements! 🌍☀️ Whether you want to check the current temperature, see the weather forecast, or explore your favorite locations on a map, this app has everything you need. 🌡️🌧️

Try it out now: [WeatherPulse](https://dsaikiran01.github.io/WeatherPulse)

⭐️ **If you like this project, don't forget to give it a star!** ⭐️  
Your support helps us improve the project and keep adding cool features!

## 🚀 Features

- **Interactive Dashboard** 📊: View key weather metrics like temperature, humidity, pressure, and more in a sleek and interactive interface.
- **Responsive Design** 📱💻: The app adapts to all screen sizes, offering a seamless experience on mobile and desktop.
- **Map Integration** 🗺️: Visualize the weather of different locations using an interactive map.
- **Weather Forecast Graph** 📈: Get future weather predictions with an interactive graph showing the forecast for the next days.
- **API Key Integration** 🔑: Fetch real-time weather data with a personal API key stored in a secure `.env` file.

<!-- ## 🎬 Demo

Check out WeatherPulse in action! 🎉

<p align="center">
    <img src="https://your-demo-image-link.com" alt="WeatherPulse Demo">
</p> -->

## 🛠️ Installation

Want to try it out on your local machine? Here's how you can set it up:

1. **Clone this repository**:

   ```bash
   git clone https://github.com/dsaikiran01/WeatherPulse.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd WeatherPulse
   ```

3. **Create a `.env` file** in the root directory:

   ```env
   VITE_OPEN_API_KEY=your-api-key-here
   ```

4. **Install the required dependencies**:

   ```bash
   npm install
   ```

5. **Run the app locally**:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`. 🌍

## 📡 API Endpoints

You can use the following two endpoints to fetch the weather data:

- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}`
- **Weather Forecast**: `https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}`

Replace `{city}` with the desired city and `{API_KEY}` with your API key.

## 🔧 Technologies Used

- **React** ⚛️: A JavaScript library for building user interfaces.
- **Vite** ⚡: A fast build tool that offers an optimized development experience.
- **TypeScript** 🖥️: Type-safe JavaScript for enhanced productivity and bug prevention.
- **Material UI** 🎨: A popular React component library for fast and responsive design.
- **OpenWeather API** 🌦️: The weather data provider.
- **Leaflet.js** 🌍: A JavaScript library for interactive maps.

## 📂 Project Structure

Here’s a breakdown of the project’s structure:

```
weatherpulse/
├── src/                  # Source files for the app
│   ├── components/       # Reusable UI components
│   ├── hooks/           
│   ├── App.tsx           # Main app component
│   └── App.css           # Styling for the app
├── .env                  # Your environment variables (API Key)
├── index.html            # The main page of the app
├── package.json          # Project configuration and dependencies
└── README.md             # This document you're reading 😊
```

## 🙌 Contributing

We’d love for you to contribute to **WeatherPulse**! Fork it, improve it, and send us a pull request. Let’s make this weather dashboard even better together! ❤️

Feel free to create issues for bugs, improvements, or feature requests. Let’s build the best weather dashboard! 🌈

## 🚀 Future Improvements

1. **Hourly Forecast** 🌤️: Add a more detailed hourly weather forecast display.
2. **User Authentication** 🔐: Allow users to save their favorite locations and preferences.
3. **Dark Mode** 🌙: Implement a toggle for dark and light mode based on user preference.
4. **Extended Map Features** 🗺️: Add more map interactions like weather layers and geolocation.

---

Stay up to date with the weather, and let **WeatherPulse** guide you through every stormy or sunny day! 🌧️🌞
