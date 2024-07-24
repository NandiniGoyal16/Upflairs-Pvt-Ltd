const express = require('express');
const {
  getAllUsers,
  addUser,
  getSingleUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const route = express.Router();

route.get('/', getAllUsers);
route.post('/', addUser);
route.get('/:id', getSingleUser);
route.put('/:id', updateUser);
route.delete('/:id', deleteUser);

module.exports = route
