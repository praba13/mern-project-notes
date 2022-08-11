const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

//@desc Get all users
//@route GET /users
//@acesss Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean();
  if (!users) {
    return res.status.json({ message: 'No users found' });
  }
  res.json(users);
});

//@desc Create new user
//@route POST /users
//@acesss Private
const createNewUser = asyncHandler(async (req, res) => {});

//@desc Update a users
//@route PATCH /users
//@acesss Private
const updateUser = asyncHandler(async (req, res) => {});

//@desc Delete users
//@route DELETE /users
//@acesss Private
const deleteUser = asyncHandler(async (req, res) => {});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
