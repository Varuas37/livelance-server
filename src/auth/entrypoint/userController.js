
const UserSchema = require("../data/models/UserModel")






module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserSchema.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};





