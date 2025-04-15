const register_user = async (req, res) => {
  try {
    const { email, password } = req.body;
console.log(email, password);

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const newUser = await User.create({ email, password });
    const token = generateToken(newUser._id);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};