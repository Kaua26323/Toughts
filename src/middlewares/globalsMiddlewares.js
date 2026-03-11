exports.globalMiddleware = function (req, res, next) {
  res.locals.errors = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.session = req.session;
  next();
};

exports.notFoundHandler = function (req, res) {
  res.render("404.handlebars");
};

exports.errorHandler = function (err, req, res, next) {
  console.error("Stack do Erro:", err.stack);

  const message = err.message || "An unexpected error occurred.";
  const status = err.status || 500;

  res.status(status).render("error.handlebars", {
    errorMessage: message,
    status: status,
  });
};
