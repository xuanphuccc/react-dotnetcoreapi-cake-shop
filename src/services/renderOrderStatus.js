const renderOrderStatus = (status = { name: "", status: "" }) => {
  const result = {
    ...status,
    color: "blue",
    step: 0,
  };

  switch (status.status) {
    case "created":
      result.color = "orange";
      result.step = 0;
      break;

    case "delivery":
      result.color = "blue";
      result.step = 1;
      break;

    case "completed":
      result.color = "cyan";
      result.step = 2;
      break;

    case "cancelled":
      result.color = "default";
      break;

    default:
      break;
  }

  return result;
};

export default renderOrderStatus;
