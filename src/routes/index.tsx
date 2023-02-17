import {
  $,
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { getCityImage } from "~/api/getCityImage";
import { getWeather } from "~/api/getWeather";
import { WiSwitcher } from "~/components/icons/wi-switcher";

interface WeatherDataProps {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

export default component$(() => {
  // So we are reading from the server in SSR mode and SSR true
  // console.log(import.meta.env);

  // So we are reading from the client but in SSR mode but SSR false
  // useBrowserVisibleTask$(() => {
  //   const env = import.meta.env;
  //   console.log(env);
  // });
  const city = useSignal("Barcelona");
  const newCity = useSignal("");

  const weatherData = useResource$<any>(({ track, cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    track(() => city.value);
    // Fetch the data and return the promises.

    return getWeather(city.value, controller);
  });

  const imageData = useResource$<any>(({ track, cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    track(() => city.value);
    // Fetch the data and return the promises.

    return getCityImage(city.value, controller);
  });

  const handleSearch = $(() => {
    if (newCity.value.length > 0) city.value = newCity.value;
  });

  return (
    <div>
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
      <button onClick$={() => handleSearch()}>Search</button>

      <Resource
        value={weatherData}
        onPending={() => <>Cargando...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(weather: WeatherDataProps) => {
          return (
            <div>
              <div class="weather-header">
                <h2>
                  {weather.name}, {weather.sys.country}
                </h2>
                <div class="weather-icon">
                  <WiSwitcher code={weather.weather[0].icon} />
                </div>

                <div class="weather-info">
                  <div class="weather-temp">
                    <span class="temp">{Math.round(weather.main.temp)}</span>
                    <span class="unit">°C</span>
                  </div>
                  <div class="weather-description">
                    {weather.weather[0].description}
                  </div>
                  <div class="weather-details">
                    <div class="weather-detail">
                      <span class="label">Feels like</span>
                      <span class="value">
                        {Math.round(weather.main.feels_like)} °C
                      </span>
                    </div>
                    <div class="weather-detail">
                      <span class="label">Humidity</span>
                      <span class="value">{weather.main.humidity}%</span>
                    </div>
                    <div class="weather-detail">
                      <span class="label">Wind</span>
                      <span class="value">
                        {Math.round(weather.wind.speed)} km/h
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      />

      <Resource
        value={imageData}
        onPending={() => <></>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(image) => {
          return (
            <figure>
              <img class="weather-city" src={image.urls.raw} alt="" />
              <figcaption>copyright from...</figcaption>
            </figure>
          );
        }}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "☀️ Aplicación del tiempo con Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
