import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import AppWrapper from "~/components/app-wrapper";
import { CityInfo } from "~/components/city-info";
import Navigation from "~/components/navigation";
import { WeatherInfo } from "~/components/weather-info";

export default component$(() => {
  // So we are reading from the server in SSR mode and SSR true
  // console.log(import.meta.env);

  // So we are reading from the client but in SSR mode but SSR false
  // useBrowserVisibleTask$(() => {
  //   const env = import.meta.env;
  //   console.log(env);
  // });
  const city = useSignal("Granada");

  return (
    <AppWrapper>
      <Navigation />
      <h1>
        The weather in <span>{city.value}</span>
      </h1>

      <WeatherInfo city={city} />
      <CityInfo city={city} />
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
