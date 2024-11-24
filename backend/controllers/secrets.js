import Secret from '../model/Secret.js';
import User from '../model/User.js';

// @desc    POST secret
// @route   POST /api/secret/
// @access  Private
const addSecret = async (req, res) => {
  try {
    const { userId, title, content } = req.body;

    const user = await User.findById(userId);

    const secret = new Secret({
      userId,
      title,
      content,
    });

    await secret.save();

    res.status(201).json({ msg: 'Secret added successfully', secret: secret });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

// @desc    GET secrets
// @route   GET /api/secret/
// @access  Private
const getSecrets = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const limitInt = parseInt(limit);
    const pageInt = parseInt(page);

    const totalSecrets = await Secret.find().countDocuments();
    const totalPages = Math.ceil(totalSecrets / limitInt);
    const secrets = await Secret.find()
      .sort({ createdAt: -1 })
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt);

    res.status(200).json({ secrets, totalPages, currentPage: pageInt });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// @desc    DELETE secret
// @route   DELETE /api/secret/:id
// @access  Private
const deleteSecret = async (req, res) => {
  try {
    const { id } = req.params;

    const secret = await Secret.findByIdAndDelete(id);

    if (!secret) {
      return res.status(404).json({ msg: 'Secret not found' });
    }

    res.status(200).json({ msg: 'Secret deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc    GET user secret
// @route   GET /api/secret/:id
// @access  Private
const getUserSecret = async (req, res) => {
  try {
    const { id } = req.params;
    const secret = await Secret.findById(id);
    if (!secret) {
      return res.status(404).json({ msg: 'Secret not found' });
    }
    res.status(200).json(secret);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// @desc    UPDATE user secret
// @route   PUT /api/secret/:id
// @access  Private
const updateSecret = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const secret = await Secret.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!secret) {
      return res.status(404).json({ msg: 'Secret not found' });
    }
    res.status(200).json(secret);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export { addSecret, getSecrets, deleteSecret, getUserSecret, updateSecret };
