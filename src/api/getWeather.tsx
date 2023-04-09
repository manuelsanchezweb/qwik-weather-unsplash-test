import { WeatherDataProps } from "~/types/types";

export async function getWeather(cityName: string): Promise<WeatherDataProps> {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
      import.meta.env.VITE_WEATHERAPP
    }&units=metric`
  );
  const json = await resp.json();
  //   console.log(json);
  return json;
}
