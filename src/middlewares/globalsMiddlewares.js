exports.getSession = function (req, res, next) {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
};
