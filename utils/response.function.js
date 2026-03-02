let response = function (res, status, data, message) {
  let countObj = Array.isArray(data) ? { count: data.length } : {};
  res.status(status ?? 200).json({
    status: status >= 400 ? "Failed" : "Succes",
    message: message ?? "Default message",
    ...countObj,
    data: data,
  });
};

export default response;
