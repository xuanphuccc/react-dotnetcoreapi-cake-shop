const { default: axiosClient } = require("./axiosClient");

const shippingMethodApi = {
  getAll() {
    const url = "/shippingmethods";
    return axiosClient.get(url);
  },

  get(id) {
    const url = `/shippingmethods/${id}`;
    return axiosClient.get(url);
  },

  getDefault() {
    const url = `/shippingmethods/default`;
    return axiosClient.get(url);
  },

  create(data) {
    const url = "/shippingmethods";
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/shippingmethods/${id}`;
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/shippingmethods/${id}`;
    return axiosClient.delete(url);
  },
};
export default shippingMethodApi;
