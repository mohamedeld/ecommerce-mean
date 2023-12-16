module.exports = catchAsync = (fn) => {
  return (request, response, next) => {
    return fn(request, response, next).catch(next);
  };
};
