import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import bcrypt from 'bcrypt';
// @desc    Signup new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exist
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(409).json({ msg: 'User already exists' });
    }

    // New User added to Database
    const newUser = await new User({
      name,
      email,
      password,
    }).save();

    res.status(201).json({ msg: 'Signup Successful', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User does not found' });
    }

    // Match user password
    const matchPassword = await user.checkPassword(password);

    if (!matchPassword) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    // jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    GET User
// @route   POST /api/auth/:id
// @access  Private
const getUser = async (req, res) => {
  try {
    // Getting id from request parameter
    const { id } = req.params;

    // Finding user for given id
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User does not found' });
    }

    res.status(200).json({ msg: 'Redirected to reset password', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id, password } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { password: bcrypt.hashSync(password, 10) },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: 'User does not found' });
    }

    res.status(200).json({ msg: 'Password reset successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { login, signup, getUser, forgetPassword, resetPassword };
