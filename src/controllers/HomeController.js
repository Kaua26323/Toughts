const ThoughtManager = require("../models/thoughtModels/ThoughtManager");

exports.index = async (req, res, next) => {
  try {
    const data = {
      search: req.query.search || "",
      order: req.query.order === "old" ? "ASC" : "DESC",
    };

    console.log("Datas:", data);

    const allThoughts = await ThoughtManager.getAllThoughts(data);

    const thoughtsQty = allThoughts.length > 0 ? allThoughts.length : false;

    return res.render("home.handlebars", {
      allThoughts,
      search: data.search,
      thoughtsQty,
    });
  } catch (err) {
    next(err);
  }
};
