module.exports = handler => async (req, res, next) => {
  try {
    await handler(req, res);
  } catch (exp) {
    next(exp);
  }
};
