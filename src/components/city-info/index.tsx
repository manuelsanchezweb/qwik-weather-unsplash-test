import { Resource, Signal, component$, useResource$ } from "@builder.io/qwik";
import { getCityImage } from "~/api/getCityImage";
import { CityProps } from "~/types/types";

export const CityInfo = component$(({ city }: { city: Signal<string> }) => {
  const cityImageData = useResource$<CityProps>(({ track, cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    track(() => city.value);

    return getCityImage(city.value);
  });

  return (
    <Resource
      value={cityImageData}
      onPending={() => <></>}
      onRejected={(error) => <>Error: {error.message}</>}
      onResolved={(city) => {
        return (
          <figure>
            <picture>
              <img class="weather--city" src={city.urls.raw} alt="" />
            </picture>
            <figcaption>
              Copyright from{" "}
              <a target="_blank" href={city.user.social.portfolio_url}>
                {city.user.username}
              </a>
            </figcaption>
          </figure>
        );
      }}
    />
  );
});
