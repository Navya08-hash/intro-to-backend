import { User } from "../models/user.model.js"; // Correct default import

const registerUser = async(req, res) => {
    try {
        const { username, password, email } = req.body;

        // Validate fields
        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Create new user
        const user = await User.create({
            username,
            password,
            email: email.toLowerCase(),
            loggedIn: false,
        });

        // Response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message || error
        });
    }
};

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",

        })
    }
}

const logoutUser = async(req, res) => {
    try {
        const { email } = req.body;

        // Validate email provided
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return success response
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message || error });
    }
};
export {
    registerUser,
    loginUser,
    logoutUser
};