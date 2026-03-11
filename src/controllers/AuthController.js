const RegisterModel = require("../models/RegisterModel");
const LoginModel = require("../models/LoginModel");

class AuthController {
  login(req, res) {
    res.render("login.handlebars");
  }

  async signIn(req, res) {
    if (!req.body) return res.status(400).send("Bad Request");

    try {
      const login = new LoginModel(req.body);
      await login.signIn();

      if (login.errors.length > 0) {
        req.flash("error", login.errors);
        return res.redirect("/login");
      }

      req.session.user = {
        id: login.user.id,
        name: login.user.name,
        email: login.user.email,
      };

      req.flash("success", login.success);
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.error("Critical Error:", err);
      req.flash("error", "Unexpected error.");
      return res.redirect("/login");
    }
  }

  logOut(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }

  registerPage(req, res) {
    res.render("register.handlebars");
  }

  async createUser(req, res) {
    if (!req.body) return res.status(400).send("Bad Request");
    try {
      const newUser = new RegisterModel(req.body);
      await newUser.register();

      if (newUser.errors.length > 0) {
        req.flash("error", newUser.errors);
        return res.redirect("/register");
      }

      req.session.user = {
        id: newUser.user.id,
        name: newUser.user.name,
        email: newUser.user.email,
      };

      req.flash("success", newUser.success);

      return req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.error("Critical Error:", err);
      req.flash("error", "Unexpected error.");
      return res.redirect("/register");
    }
  }
}

module.exports = new AuthController();
