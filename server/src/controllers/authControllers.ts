import User from "../models/User";
import asyncHandler from "../services/asyncHandler";
import ApiError from "../services/ApiError";
import ApiResponse from "../services/ApiResponse";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  console.log("registeration details sent: ", username, email, password);

  if (!username || !password) {
    throw new ApiError(400, "Username and password are required");
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    res.status(400);
    throw new ApiError(409, "User with email or username already exists.");
  }

  const user = await User.create({ username, email, password });

  if (!user) {
    throw new ApiError(500, "Something went wrong while registering the user.");
  }

  res
    .status(201)
    .json(
        new ApiResponse<{ username: string; email: string; }>(
        201,
        { username: user.username, email: user.email },
        "Successfully registered the user."
      )
    );
});

export { registerUser };
