import React from 'react';
import { WeatherResponse } from '../types';
import { getWeatherInfo } from '../utils/weatherCodes';
import { Wind, MapPin } from 'lucide-react';

interface CurrentWeatherProps {
  weather: WeatherResponse;
  cityName: string;
}

export function CurrentWeather({ weather, cityName }: CurrentWeatherProps) {
  const { current_weather } = weather;
  const { icon: WeatherIcon, label } = getWeatherInfo(current_weather.weathercode);

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-200/50 shrink-0">
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0">
        <div>
          <h2 className="text-6xl sm:text-7xl font-light mb-1">{Math.round(current_weather.temperature)}°</h2>
          <p className="text-xl font-medium text-blue-100">{label}</p>
          <div className="flex gap-4 mt-6 text-xs sm:text-sm text-blue-100/80 uppercase tracking-wider font-semibold">
            <span className="flex items-center gap-1.5">
              <Wind className="w-4 h-4" /> Wind: {current_weather.windspeed} km/h
            </span>
          </div>
        </div>
        <div className="sm:text-right flex flex-col sm:items-end w-full sm:w-auto border-t border-white/20 sm:border-0 pt-4 sm:pt-0">
          <WeatherIcon className="w-16 h-16 sm:w-20 sm:h-20 text-white mb-2" strokeWidth={1.5} />
          <p className="text-lg font-medium flex items-center sm:justify-end gap-1.5"><MapPin className="w-4 h-4" /> {cityName}</p>
          <p className="text-sm opacity-70">Current Condition</p>
        </div>
      </div>
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
    </section>
  );
}
