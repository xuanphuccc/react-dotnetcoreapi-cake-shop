const { default: axiosClient } = require("./axiosClient");

const productApi = {
  getAll(
    params = {
      category: null,
      pageSize: null,
      page: null,
      sort: null,
      search: null,
    },
  ) {
    const url = "/products/filter";
    return axiosClient.get(url, {
      params: {
        ...params,
      },
    });
  },

  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  create(data) {
    const url = "/products";
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/products/${id}`;
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};
export default productApi;
