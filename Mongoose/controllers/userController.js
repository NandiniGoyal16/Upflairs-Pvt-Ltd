const { User } = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      status: 'success',
      users: users
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message
    });
  }
};

exports.addUser = async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    let newUser =new User()
    newUser.userName= userName
    newUser.password= password
    newUser.email= email
    await newUser.save() 
    res.status(201).json({
      status: 'success',
      message: 'User added successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message
    });
  }
};

exports.getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found'
      });
    }
    res.json({
      status: 'success',
      user: user
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { userName, password, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { userName, password, email }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found'
      });
    }
    res.json({
      status: 'success',
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message
    });
  }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message
    });
  }
};
