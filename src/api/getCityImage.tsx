import { CityProps } from "~/types/types";

export async function getCityImage(cityName: string): Promise<CityProps> {
  try {
    const url = `https://api.unsplash.com/photos/random?query=${cityName}&orientation=landscape&client_id=${
      import.meta.env.VITE_UNSPLASH
    }`;
    const resp = await fetch(url);

    const json = await resp.json();
    return json;
  } catch (error) {
    console.error("Error while fetching city image:", error);
    throw error;
  }
}
