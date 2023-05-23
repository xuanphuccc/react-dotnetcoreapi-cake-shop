import axiosClient from "./axiosClient";

const orderStatusApi = {
  getAll() {
    const url = "/orderStatuses";
    return axiosClient.get(url);
  },
};

export default orderStatusApi;
