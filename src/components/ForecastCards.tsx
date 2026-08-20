import React from 'react';
import { ProcessedDailyForecast } from '../types';
import { getWeatherInfo } from '../utils/weatherCodes';

interface ForecastCardsProps {
  forecast: ProcessedDailyForecast[];
}

export function ForecastCards({ forecast }: ForecastCardsProps) {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col flex-1 sm:max-h-[50%] min-h-[300px]">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 shrink-0">7-Day Forecast</h3>
      <div className="flex-1 overflow-y-auto pr-2 space-y-2 sm:space-y-3 custom-scrollbar">
        {forecast.map((day) => {
          const { icon: WeatherIcon, label } = getWeatherInfo(day.weatherCode);
          return (
            <div 
              key={day.date} 
              className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-4 w-1/3">
                 <span className="w-10 font-semibold text-slate-600 text-sm">{day.dayOfWeek.toUpperCase()}</span>
                 <span className="text-xs text-slate-400 hidden xl:block">{day.formattedDate}</span>
              </div>
              <div className="flex items-center justify-center w-1/3 text-blue-500" title={label}>
                 <WeatherIcon className="w-6 h-6" strokeWidth={2} />
              </div>
              <div className="text-right w-1/3">
                <span className="font-bold text-slate-800">{Math.round(day.maxTemp)}°</span>
                <span className="text-slate-400 ml-2">{Math.round(day.minTemp)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
