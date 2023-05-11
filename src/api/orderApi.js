const { default: axiosClient } = require("./axiosClient");

const orderApi = {
  getAll() {
    const url = "/orders";
    return axiosClient.get(url);
  },

  get(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },

  create(data) {
    const url = "/orders";
    return axiosClient.post(url, data);
  },

  delivery(id) {
    const url = `/orders/delivery/${id}`;
    return axiosClient.put(url);
  },

  complete(id) {
    const url = `/orders/complete/${id}`;
    return axiosClient.put(url);
  },

  cancel(id) {
    const url = `/orders/cancel/${id}`;
    return axiosClient.put(url);
  },
};

export default orderApi;
