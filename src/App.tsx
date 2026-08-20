/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SearchForm } from './components/SearchForm';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastCards } from './components/ForecastCards';
import { WeatherChart } from './components/WeatherChart';
import { PlanningInsights } from './components/PlanningInsights';
import { WeatherResponse, ProcessedDailyForecast } from './types';
import { formatDate } from './utils/weatherCodes';
import { CloudRain } from 'lucide-react';

export default function App() {
  const [cityName, setCityName] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ProcessedDailyForecast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default city on load
  useEffect(() => {
    handleSearch('London');
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Step A: Geocoding
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
      if (!geoRes.ok) throw new Error('Failed to fetch location data.');
      
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${query}" not found.`);
      }
      
      const location = geoData.results[0];
      setCityName(`${location.name}${location.country ? `, ${location.country}` : ''}`);

      // Step B: Forecast
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
      if (!weatherRes.ok) throw new Error('Failed to fetch weather data.');
      
      const weather = await weatherRes.json();
      setWeatherData(weather);

      // Process forecast data
      const processedForecast: ProcessedDailyForecast[] = weather.daily.time.map((timeStr: string, index: number) => {
        const { dayOfWeek, formattedDate } = formatDate(timeStr);
        return {
          date: timeStr,
          formattedDate,
          dayOfWeek,
          maxTemp: weather.daily.temperature_2m_max[index],
          minTemp: weather.daily.temperature_2m_min[index],
          weatherCode: weather.daily.weathercode[index]
        };
      });
      
      // Limit to 7 days if the API returns more
      setForecast(processedForecast.slice(0, 7));
      
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 h-20 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <CloudRain className="w-6 h-6 text-white" />
          </div>
          <h1 className="hidden sm:block text-xl font-bold tracking-tight text-slate-800 uppercase">Weather Intelligence</h1>
        </div>
        <div className="flex-1 max-w-xl mx-4 sm:mx-12">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Status</p>
            <p className="text-sm font-medium">Active</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center border border-white shadow-sm">
            <span className="text-xs font-bold text-slate-600">WI</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 grid grid-cols-12 gap-4 sm:gap-6 overflow-y-auto sm:overflow-hidden max-w-[1600px] mx-auto w-full">
        {error && (
          <div className="col-span-12 bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl shadow-sm mb-4">
            <p className="font-medium">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {weatherData && forecast.length > 0 && !error && (
          <>
            {/* Left Column: Current Weather & Chart */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 sm:gap-6 sm:overflow-y-auto custom-scrollbar pr-1">
              <CurrentWeather weather={weatherData} cityName={cityName} />
              <WeatherChart forecast={forecast} />
            </div>
            
            {/* Right Column: Forecast & Insights */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 sm:gap-6 overflow-hidden">
              <ForecastCards forecast={forecast} />
              <PlanningInsights forecast={forecast} />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="hidden sm:flex h-8 bg-white border-t border-slate-200 px-8 items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0 w-full">
        <span>Data Source: Open-Meteo Public API</span>
        <span>Engine v2.4.0</span>
        <span>System Status: Online</span>
      </footer>
    </div>
  );
}
