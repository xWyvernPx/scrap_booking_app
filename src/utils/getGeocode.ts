import axios from "axios";

export const getGeoCode = async (address: string) => {
  const BASE_URL = "https://geocode.search.hereapi.com/v1/geocode";
  const API_KEY = "7h1jyg35V5JfNIgPA8m1XEN39K9giRbtrfNj8nJ5kd4";
  const response = await axios.get(BASE_URL, {
    params: {
      apiKey: API_KEY,
      q: address,
    },
  });
  console.log(response.data);
  return response.data?.items[0];
};
