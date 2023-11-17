import axios from "axios";

const mapApi = {
  searchAutocomplete(query = "") {
    const defaultLocation = process.env["REACT_APP_DEFAULT_LOCATION"];
    const url = `https://api.radar.io/v1/search/autocomplete?query=${query}&near=${defaultLocation}&limit=5&country=VN`;

    return axios.get(url, {
      headers: {
        Authorization: process.env["REACT_APP_MAP_API_KEY"],
      },
    });
  },

  routeDistance(location = { latitude: "", longitude: "" }) {
    const defaultLocation = process.env["REACT_APP_DEFAULT_LOCATION"];
    const url =
      `https://api.radar.io/v1/route/distance?origin=${defaultLocation}` +
      `&destination=${location.latitude},${location.longitude}&modes=motorbike&units=metric`;

    return axios.get(url, {
      headers: {
        Authorization: process.env["REACT_APP_MAP_API_KEY"],
      },
    });
  },
};

export default mapApi;
