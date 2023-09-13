const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { registerValidation, loginValidation } = require('../middleware/validation');

async function signUp(req, res) {
    try {

    //   const { error, value } = registerValidation(req.body);
    //   if (error) return res.status(400).send(error.details[0].message);
      const { username, email, password, account_number, mobile_number } = req.body;
  
      // check if user already exists
      const user_1 = await User.findOne({ email });
      if (user_1) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

      // Create a new user
      const user = new User({
        username,
        email,
        password: hashedPassword,
        account_number,
        mobile_number,
      });
  
      await user.save();
  
      return res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User with this email not found" });
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        if (user.password !== hashedPassword) {
            return res.status.json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '2h', }
        );

        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function resetPassword(req, res) {
    try {
        const { email } = req.body;

        // find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User with this email not found" });
        }

        // generate a temp reset token

        // send update link to user...
    } catch (error) {
        
    }
}

async function updateUser(req, res) {
    try {
        const { userId } = req.params; // Extract the user ID from the request parameters
        const updates = req.body; // New user information to update
    
        // Use Mongoose's findByIdAndUpdate to update the user by ID
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
    
        return res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }  
  }
  
  async function deleteUser(req, res) {
    try {
        const { userId } = req.params; // Extract the user ID from the request parameters
    
        // Use Mongoose's findByIdAndDelete to remove the user by ID
        const deletedUser = await User.findByIdAndDelete(userId);
    
        if (!deletedUser) {
          return res.status(404).json({ message: "User not found" });
        }
    
        return res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }  
  }
  
  async function resetPassword(req, res) {

  }

  async function userDetails(req, res) {
    try {
        const { userId } = req.params; // Extract the user ID from the request parameters
    
        // Use Mongoose's findById to fetch user details by ID
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const userDetails = {
            username: user.username,
            email: user.email,
            account_number: user.account_number,
            mobile_number: user.mobile_number,
        };
    
        return res.status(200).json({ message: "User details retrieved successfully", userDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }  
  }
  

module.exports = {
    signUp,
    login,
    resetPassword,
    updateUser,
    deleteUser,
    userDetails,
};
