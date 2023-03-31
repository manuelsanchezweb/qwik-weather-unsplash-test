export async function getCityImage(cityName: string): Promise<any> {
  try {
    const resp = await fetch(
      `https://api.unsplash.com/photos/random?query=${cityName}&orientation=landscape&client_id=${
        import.meta.env.VITE_UNSPLASH
      }`
    );

    const json = await resp.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.error("Error while fetching city image:", error);
    throw error;
  }
}
