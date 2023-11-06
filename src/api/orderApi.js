const { default: axiosClient } = require("./axiosClient");

const orderApi = {
  getAll(
    params = {
      status: null,
      pageSize: null,
      page: null,
      sort: null,
      search: null,
    },
  ) {
    const url = "/orders/filter";
    return axiosClient.get(url, {
      params: {
        ...params,
      },
    });
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
