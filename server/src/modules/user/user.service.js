const ApiError = require("../../utils/ApiError.js");
const User = require("./user.model.js");

//function to create new users after signup
const createUser = async (user) => {
  const updatedUserInfo = Object.assign(user, {
    borrows: [],
    overdueBooks: [],
    history: [],
  });

  const newUser = new User(updatedUserInfo);

  if (!newUser) throw new ApiError(400, "Could not save user");

  await newUser.save();

  return newUser;
};

const queryUsers = async (filter, limit) => {
  const users = await User.find(filter).limit(limit).select("-password");

  if (!users) throw new ApiError(404, "Users not found");

  return users;
};

const getUserByEmail = async (userEmail) => {
  const user = await User.findOne({ email: userEmail }).select("-password");

  if (!user) throw new ApiError(404, "User not found");

  return user;
};

const getUserById = async (userId) => {
  const user = await User.findById({ _id: userId }).select("-password");

  if (!user) throw new ApiError(404, "User not found");

  return user;
};

const assignUserRole = async (userId, role) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await User.updateOne({ _id: userId }, { role }, { upsert: true });

  return "Success";
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  assignUserRole,
};
