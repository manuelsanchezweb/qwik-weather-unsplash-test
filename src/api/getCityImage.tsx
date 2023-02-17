import { VITE_UNSPLASH } from "~/secret/fake";

export async function getCityImage(
  cityName: string,
  controller?: AbortController
): Promise<string[]> {
  // console.log(
  //   "FETCH",
  //   `https://api.unsplash.com/photos/random?query=${cityName}&client_id=${
  //     import.meta.env.VITE_UNSPLASH
  //   }`
  // );
  const resp = await fetch(
    `https://api.unsplash.com/photos/random?query=${cityName}&client_id=${VITE_UNSPLASH}`,
    {
      signal: controller?.signal,
    }
  );
  const json = await resp.json();
  // console.log(json);
  return json;
}
