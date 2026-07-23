"use server";

import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/userModel";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export default async function register({
  name,
  email,
  password,
}: RegisterData) {
  try {
    await connectDB();

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return {
      success: true,
      message: "Account created successfully.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}