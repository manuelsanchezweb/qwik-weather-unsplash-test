import {
  $,
  Resource,
  Signal,
  component$,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { getWeather } from "~/api/getWeather";
import { WeatherDataProps } from "~/types/types";
import { WiSwitcher } from "../icons/wi-switcher";

export const WeatherInfo = component$(({ city }: { city: Signal<string> }) => {
  const newCity = useSignal("");

  const weatherData = useResource$<WeatherDataProps>(({ track, cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    track(() => city.value);
    // Fetch the data and return the promises.

    return getWeather(city.value);
  });

  const handleSearch = $(() => {
    if (newCity.value.length > 0) city.value = newCity.value;
  });

  return (
    <Resource
      value={weatherData}
      onPending={() => <>Cargando...</>}
      onRejected={(error) => <>Error: {error.message}</>}
      onResolved={(weather: WeatherDataProps) => {
        return (
          <div class="weather">
            <div class="weather__current">
              <div class="weather__current__temperature">
                {Math.round(weather.main.temp)}°C
              </div>

              <WiSwitcher code={weather.weather[0].icon} />

              <div>{weather.weather[0].description}</div>
            </div>
            <div class="weather__search">
              <input
                type="text"
                name="city"
                placeholder={city.value}
                value={newCity.value}
                onInput$={(ev) =>
                  (newCity.value = (ev.target as HTMLInputElement).value)
                }
                // onBlur$={(ev) => (city.value = (ev.target as HTMLInputElement).value)}
              />
              <button class="btn" onClick$={() => handleSearch()}>
                Search
              </button>
            </div>

            <div class="weather__extra">
              <div class="weather__extra__detail">
                <div class="weather__extra__detail__label">Feels like</div>
                <div class="weather__extra__detail__value">
                  {Math.round(weather.main.feels_like)}°C
                </div>
              </div>
              <div class="weather__extra__detail">
                <div class="weather__extra__detail__label">Humidity</div>
                <div class="weather__extra__detail__value">
                  {weather.main.humidity}%
                </div>
              </div>
              <div class="weather__extra__detail">
                <div class="weather__extra__detail__label">Wind</div>
                <div class="weather__extra__detail__value">
                  {Math.round(weather.wind.speed)} km/h
                </div>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
});
