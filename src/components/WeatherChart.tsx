import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProcessedDailyForecast } from '../types';

interface WeatherChartProps {
  forecast: ProcessedDailyForecast[];
}

export function WeatherChart({ forecast }: WeatherChartProps) {
  const data = forecast.map(day => ({
    name: day.dayOfWeek,
    High: Math.round(day.maxTemp),
    Low: Math.round(day.minTemp),
  }));

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 flex-1 flex flex-col min-h-[250px]">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">7-Day Temperature Trend</h3>
      <div className="flex-1 relative w-full h-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area type="monotone" dataKey="High" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHigh)" />
            <Area type="monotone" dataKey="Low" stroke="#94a3b8" strokeWidth={3} fillOpacity={1} fill="url(#colorLow)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
