import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Snowflake,
} from 'lucide-react';

export function getWeatherInfo(code: number) {
  if (code === 0) return { label: 'Clear Sky', icon: Sun };
  if (code === 1) return { label: 'Mainly Clear', icon: CloudSun };
  if (code === 2) return { label: 'Partly Cloudy', icon: CloudSun };
  if (code === 3) return { label: 'Overcast', icon: Cloud };
  if (code === 45 || code === 48) return { label: 'Fog', icon: CloudFog };
  if (code >= 51 && code <= 57) return { label: 'Drizzle', icon: CloudDrizzle };
  if (code >= 61 && code <= 65) return { label: 'Rain', icon: CloudRain };
  if (code === 66 || code === 67) return { label: 'Freezing Rain', icon: CloudRain };
  if (code >= 71 && code <= 77) return { label: 'Snow', icon: CloudSnow };
  if (code >= 80 && code <= 82) return { label: 'Rain Showers', icon: CloudRain };
  if (code === 85 || code === 86) return { label: 'Snow Showers', icon: Snowflake };
  if (code >= 95 && code <= 99) return { label: 'Thunderstorm', icon: CloudLightning };

  return { label: 'Unknown', icon: Cloud };
}

export function formatDate(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  return {
    dayOfWeek: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
    formattedDate: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date),
  };
}
