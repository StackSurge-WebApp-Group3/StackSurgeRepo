import User from "./user.model.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "firstName lastName email interests enrolledEvents volunteerTime givenReviews"
    );

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status("400").json({
        error: "User not found",
      });
    }

    // Setting the user to the request profile
    req.profile = user;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "firstName lastName email interests enrolledEvents volunteerTime givenReviews"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the current logged in user
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id)
      .select(
        "firstName lastName email interests enrolledEvents volunteerTime givenReviews"
      )
      .populate({
        path: "enrolledEvents",
        select:
          "title description coverImage category address city state datetime duration sponsors totalAvailableSlots status avg_rating reviews",
      });

    if (!user) return res.status(404).json({ message: "Profile not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new user
export const addUser = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password) {
      updateData.password = password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select(
      "firstName lastName email interests enrolledEvents volunteerTime givenReviews"
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
export const removeUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all users
export const removeAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.json({ message: "All users deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
