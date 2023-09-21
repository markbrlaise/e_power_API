require('../database/db');
const User = require('../models/user');
const ElecUnits = require('../models/electricityUnits');
const Wallet = require('../models/mobileWallet');
const jwt = require('jsonwebtoken');
const Token = require('../models/token');
const sendEmail = require('../middleware/sendEmail');
const crypto = require('crypto');
const { registerValidation, loginValidation } = require('../middleware/validation');
// const { json } = require('body-parser');
require('dotenv').config();


// async function signUp(req, res) {
//     try {

//     //   const { error, value } = registerValidation(req.body);
//     //   if (error) return res.status(400).send(error.details[0].message);
//       const { username, email, password, account_number, mobile_number } = req.body;
  
//       // check if user already exists
//       const user_1 = await User.findOne({ email });
//       if (user_1) {
//         return res.status(400).json({ message: "User already exists" });
//       }

//     //   const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

//       // Create a new user
//       try {
//         console.log('trying to create a user');
//           const user = new User({
//             username,
//             email,
//             password,
//             account_number,
//             mobile_number,
//           });

//           await user.save();
//           console.log("user created");

//         //   const newUser = {
//         //     _id: user._id,
//         //     username: user.username,
//         //     account_number: user.account_number,
//         //   };

//         const units = new ElecUnits({
//             userId : user._id
//         });

//         const wallet = new Wallet({
//             userId: user._id
//         });

//         // console.log(user);

//         await units.save();
//         await wallet.save();
      
//         return res.status(201).json({ message: "User registered successfully", user });
//         } catch (error) {
//         //   console.log(error)
//           res.status(400).json({ message: error });
//         }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   }

async function signUp(req, res) {
  try {
      const { username, email, password, account_number, mobile_number } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      }

      const user = new User({
          username,
          email,
          password,
          account_number,
          mobile_number
      });

      await user.save();

      const units = new ElecUnits({
          userId: user._id
      });

      const wallet = new Wallet({
          userId: user._id
      });

      await units.save();
      await wallet.save();

      const newUser = { ...user.toObject() };
      delete newUser.password;

      return res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
}


async function login(req, res) {
    try {
        const { email, password } = req.body;

        // find user by email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: "User with this email not found" });
        }

        // console.log(json(user));

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        // console.log(user.password);
        // console.log(hashedPassword);

        if (user.password !== hashedPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: process.env.EXPIRES_IN, }
        );

        // set the token as a cookie
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
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

  async function makeAdmin(req, res) {
    try {
        const { userId } = req.params;
        newAdmin = await User.findById(userId);

        if (!newAdmin) return res.status(404).json({ message: "User not found" });
        if (newAdmin.role !== 'admin') {
            newAdmin.role = 'admin';
            return res.status(200).json({ message: `${newAdmin.username} now an admin` });
        } else return res.status(201).json({ message: `${newAdmin.username} already an admin` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
  }
  
  async function resetPasswordLink(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("User with this email not found");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.status(201).send('password reset link sent to your email');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
  }

  async function resetPassword(req, res) {
    try {
        const user = await User.findById(req.params.userId).select('+password');
        if (!user) return res.status(404).json({ messsage: "User not found" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!token) return res.status(400).json({ message: "Invalid link or it expired" });

        const hashedPassword = crypto.createHash('sha256').update(req.params.password).digest('hex');
        user.password = hashedPassword;
        await user.save();
        await token.delete();

        res.status(201).json({ message: "Password reset successful." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
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
            _id: user._id,
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
    resetPasswordLink,
    resetPassword,
    makeAdmin,
    updateUser,
    deleteUser,
    userDetails,
};
