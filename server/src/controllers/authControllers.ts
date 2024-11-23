import User from "../models/User";
import asyncHandler from "../services/asyncHandler";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !password) {
        throw new Error("Username and password are required");
    }

    const existingUser = await User.exists({ username, email });
    if (existingUser) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: user,
    })

})

export default { registerUser }

