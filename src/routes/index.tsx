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
import AppWrapper from "~/components/app-wrapper";
import { WiSwitcher } from "~/components/icons/wi-switcher";
import Navigation from "~/components/navigation";

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
  const city = useSignal("Granada");

  const newCity = useSignal("");

  const weatherData = useResource$<any>(({ track, cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    track(() => city.value);
    // Fetch the data and return the promises.

    return getWeather(city.value);
  });

  const imageData = useResource$<any>(({ track, cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    track(() => city.value);
    // Fetch the data and return the promises.

    return getCityImage(city.value);
  });

  const handleSearch = $(() => {
    if (newCity.value.length > 0) city.value = newCity.value;
  });

  return (
    <AppWrapper>
      <Navigation />
      <h1>
        The weather in <span>{city.value}</span>
      </h1>

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

      <Resource
        value={imageData}
        onPending={() => <></>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(image) => {
          return (
            <figure>
              <picture>
                <img class="weather--city" src={image.urls.raw} alt="" />
              </picture>
              <figcaption>
                Copyright from{" "}
                <a target="_blank" href={image.user.social.portfolio_url}>
                  {image.user.username}
                </a>
              </figcaption>
            </figure>
          );
        }}
      />
    </AppWrapper>
  );
});

export const head: DocumentHead = {
  title: "Aplicación del tiempo con Qwik",
  meta: [
    {
      name: "description",
      content:
        "Con esta aplicación podrás ver en tiempo real cuál es el tiempo de la ciudad que quieras.",
    },
    {
      name: "keywords",
      content:
        "aplicación del tiempo, pronósticos precisos, ubicación actual, ciudades del mundo, planificar tu día, Qwik",
    },
    {
      name: "author",
      content: "Manuel Sanchez",
    },
    {
      property: "og:title",
      content: "☀️ Aplicación del tiempo con Qwik",
    },
    {
      property: "og:description",
      content:
        "Qwik es una aplicación del tiempo que te ofrece pronósticos precisos y actualizados para tu ubicación actual y otras ciudades del mundo. ¡Descubre cómo Qwik puede ayudarte a planificar tu día de manera efectiva!",
    },
    {
      property: "og:image",
      content:
        "https://qwik-weather-unsplash-testchen.netlify.app/thumbnail.png", // replace with actual image URL from Unsplash
    },
    {
      property: "og:url",
      content: "https://example.com/", // replace with actual URL of the Qwik site
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:site",
      content: "@manuelsandoble", // replace with your Twitter handle
    },
    {
      name: "twitter:title",
      content: "☀️ Aplicación del tiempo con Qwik",
    },
    {
      name: "twitter:description",
      content:
        "Con esta aplicación podrás ver en tiempo real cuál es el tiempo de la ciudad que quieras.",
    },
    {
      name: "twitter:image",
      content:
        "https://qwik-weather-unsplash-testchen.netlify.app/thumbnail.png", // replace with actual image URL from Unsplash
    },
  ],
};
