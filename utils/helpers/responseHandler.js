module.exports = responseHandler = (res, status, message) => {
    const response = res.status(status).send(message);
    return response;
  };
  