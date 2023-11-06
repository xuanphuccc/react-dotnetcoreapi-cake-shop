const { default: axiosClient } = require("./axiosClient");

const categoryApi = {
  getAll(limit) {
    const url = "/categories/filter";
    return axiosClient.get(url, {
      params: {
        limit,
      },
    });
  },

  get(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },

  create(data) {
    const url = "/categories";
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/categories/${id}`;
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
