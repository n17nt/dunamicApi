class MyError extends Error {
  constructor(status, message, stack) {
    super(message, stack);
    this.status = status;
  }
}
export default MyError;
