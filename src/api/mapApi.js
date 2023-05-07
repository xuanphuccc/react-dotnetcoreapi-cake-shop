import axios from "axios";

const mapApi = {
    searchAutocomplete(query = "") {
        const baseLocation = process.env["REACT_APP_BASE_LOCATION"];
        const url =
            `https://api.radar.io/v1/search/autocomplete?query=${query}` +
            `&near=${baseLocation}&limit=5&country=vn`;

        return axios.get(url, {
            headers: {
                Authorization: process.env["REACT_APP_MAP_API"],
            },
        });
    },
    routeDistance(location = { latitude: "", longitude: "" }) {
        const baseLocation = process.env["REACT_APP_BASE_LOCATION"];
        const url =
            `https://api.radar.io/v1/route/distance?origin=${baseLocation}` +
            `&destination=${location.latitude},${location.longitude}&modes=car&units=metric`;

        return axios.get(url, {
            headers: {
                Authorization: process.env["REACT_APP_MAP_API"],
            },
        });
    },
};

export default mapApi;
