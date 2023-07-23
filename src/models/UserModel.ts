import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,

  verifyToken: String,

  verifyTokenExpiry: Date,

  // createdAt: new Date(),
});

const User = mongoose.models.users || mongoose.model("users", UserSchema);

export default User;
