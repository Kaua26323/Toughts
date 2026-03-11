const Thought = require("./ThoughtModel");
const Users = require("../UserModel");

const { Op } = require("sequelize");

class ThoughtManager {
  static async getAllThoughts({ search, order }) {
    const thoughts = await Thought.findAll({
      include: [
        {
          model: Users,
          attributes: ["name"],
        },
      ],
      where: { text: { [Op.like]: `%${search}%` } },
      order: [["createdAt", order]],
    });

    return thoughts.map((thought) => thought.get({ plain: true }));
  }

  static async getAllThoughtsByUserId(userId) {
    if (!userId) throw new Error("ID is invalid, Please sign in.");

    return Thought.findAll({
      where: { userId: userId },
      raw: true,
    });
  }

  static async getThoughtById(thoughtId) {
    if (!thoughtId) throw new Error("ThoughtID is invalid!");

    return Thought.findByPk(thoughtId, { raw: true });
  }

  static async updateThought({ thoughtId, text, userId }) {
    if (!userId) throw new Error("ID is invalid, Please sign in.");
    if (!thoughtId) throw new Error("Thought not found!");
    if (!text || text.trim().length === 0) throw new Error("Text is invalid!");

    return Thought.update({ text }, { where: { id: thoughtId, userId } });
  }

  static async create({ userId, text }) {
    if (!userId) throw new Error("ID is invalid, Please sign in.");
    if (!text || text.trim().length === 0) throw new Error("Text is invalid!");

    return Thought.create({
      userId,
      text,
    });
  }

  static async remove({ thoughtId, userId }) {
    if (!userId) throw new Error("ID is invalid, Please sign in.");
    if (!thoughtId) throw new Error("Thought not found!");

    return Thought.destroy({
      where: { id: thoughtId, userId },
    });
  }
}

module.exports = ThoughtManager;
