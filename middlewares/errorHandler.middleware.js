const ErrorHandler = (err, req, res, next) => {
  //   let isDEv = process.env.NODE_ENV === "DEV";
  res.status(err.status ?? 400).json({
    succes: "failed",
    message: err.message,
    //    ...{isDEv&&{stack:err.stack}}
  });
};
export default ErrorHandler;
