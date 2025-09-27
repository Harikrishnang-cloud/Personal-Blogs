const User = require("../db/userSchema");

async function register(req, res) {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).send("Name and Email are required");
    }
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }
    // Save minimal auth state in session
    req.session.userId = user._id.toString();
    req.session.userName = user.name;
    return res.redirect("/new");
  } catch (err) {
    console.error("Failed to register", err);
    return res.status(500).send("Failed to register");
  }
}

module.exports = { 
    register,
};
