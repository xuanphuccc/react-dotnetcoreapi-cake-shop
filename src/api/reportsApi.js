const { default: axiosClient } = require("./axiosClient");

const reportsApi = {
  getTotalOrders(id) {
    const url = `/Reports/TotalOrders`;
    return axiosClient.get(url);
  },
  getTotalRevenue(id) {
    const url = `/Reports/TotalRevenue`;
    return axiosClient.get(url);
  },
  getTotalCustomers(id) {
    const url = `/Reports/TotalCustomers`;
    return axiosClient.get(url);
  },
};

export default reportsApi;
