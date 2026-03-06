const ErrorHandler = (err, req, res, next) => {
  //   let isDEv = process.env.NODE_ENV === "DEV";
  console.log(err.stack);

  res.status(err.status ?? 400).json({
    succes: "failed",
    message: err.message,
  });
};
export default ErrorHandler;
