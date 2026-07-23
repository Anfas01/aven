"use server";

import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/userModel";
import { cookies } from "next/headers";
import { createToken } from "@/lib/jwt";

type LoginData = {
  email: string;
  password: string;
};

export default async function login({
  email,
  password,
}: LoginData) {
  try {
    await connectDB();

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const token = await createToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      message: "Login successful.",
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