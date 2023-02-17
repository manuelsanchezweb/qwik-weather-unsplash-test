import { VITE_WEATHERAPP } from "~/secret/fake";

export async function getWeather(
  cityName: string,
  controller?: AbortController
): Promise<string[]> {
  //   console.log(
  //     "FETCH",
  //     `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
  //       import.meta.env.VITE_WEATHERAPP
  //     }&units=metric`
  //   );
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${VITE_WEATHERAPP}&units=metric`,
    {
      signal: controller?.signal,
    }
  );
  const json = await resp.json();
  //   console.log(json);
  return json;
}
