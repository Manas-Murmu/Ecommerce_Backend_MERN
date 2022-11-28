import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/index";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      maxLength: [50, "Name must be less than 50 Chars"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minLength: [8, "Password shoud be atleast 8 Character"],
      select: false,
    },
    roles: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
);

//Encrypt Password
userSchema.pre("save", async function (next) {
  if (!this.modified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Add Features to Schema
userSchema.methods = {
  //Compare Password
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  //Generate JWT TOKEN
  getJwtToken: async function () {
    return JWT.sign(
      {
        _id: this._id,
        role: this.role,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRY,
      }
    );
  },
};

export default mongoose.model("User", userSchema);
