class Error {
  constructor(status, message='') {
    this.status = status;
    this.message = message ? message : `Error: ${status}`;
  }
}

export const errorHandler = (response) => {
  if (!response.ok) {
    return Promise.reject(new Error(response.status));
  }
  return Promise.resolve(response);
};

export default {
  errorHandler
};
