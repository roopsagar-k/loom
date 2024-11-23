import dotenv from "dotenv";
import mongoose, { Document, Schema } from "mongoose";
import bycryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  refreshToken: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = bycryptjs.hashSync(this.password, process.env.SALT_ROUND);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return bycryptjs.compareSync(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
    },
    (process.env.JWT_ACCESS_TOKEN_SECRET as string)!,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN }
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    (process.env.JWT_REFRESH_TOKEN_SECRET as string)!,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN }
  );
}

UserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email: email });
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
