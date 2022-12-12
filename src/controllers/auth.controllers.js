const authServices = require('../services/auth.services');

// login user
const login = async (req, res) => {
  try {
    const token = await authServices.login(req.body);
    req.session = { token: token };
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// logout user
const logoutAuth = async (req, res) => {
  req.session = null;
  return res.status(200).json({ message: 'User logged out successful!' });
};

// active user
const activeAuth = async (req, res) => {
  try {
    const token = req.session.token;
    const user = await authServices.active(token);
    return res.status(200).json({
      message: 'User retrieved successfully!',
      user: user,
    });
  } catch (errer) {
    return res.status(500).json({ error: errer.message });
  }
};

// export all the functions
module.exports = {
  login,
  logoutAuth,
  activeAuth,
};