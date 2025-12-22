"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { logintime } from "@/lib/data";
import { getcollection } from "@/lib/db";

const JWT_SECRET = process.env.jwt_secret;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// ✅ Zod schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const generateToken = async (userdata) => {
  const token = jwt.sign(
    {
      email: userdata?.email,
      usertype: userdata?.usertype,
      storeid: userdata?.storeid || null,
    },
    JWT_SECRET,
    { expiresIn: logintime[1] }
  );

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    maxAge: logintime[0],
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

const findUserByEmail = async (email) => {
  const { userscollection } = await getcollection();
  return await userscollection.findOne({ email });
};

// ✅ LOGIN
export const login = async (userdata) => {
  try {
    // Validate input
    const parsed = loginSchema.safeParse(userdata);
    if (!parsed.success) {
      console.log(parsed.error);
      return { status: 400, message: "Invalid input" };
    }

    const { email, password } = parsed.data;

    const user = await findUserByEmail(email);
    if (!user) {
      return { status: 400, message: "Invalid email or password" };
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password || "");
    if (!isPasswordMatch) {
      return { status: 400, message: "Invalid email or password" };
    }

    await generateToken({
      email: user?.email,
      usertype: user?.usertype,
      storeid: user?.storeid || null,
    });

    return { status: 200, message: "Login successful", storeid: user?.storeid };
  } catch (error) {
    console.error("Login Error:", error);
    return { status: 500, message: "Server error!" };
  }
};

// ✅ SIGNUP
export const signup = async (userdata) => {
  try {
    // Validate input
    const parsed = signupSchema.safeParse(userdata);
    if (!parsed.success) {
      console.log(parsed.error);
      return { status: 400, message: "Invalid input" };
    }

    const { name, email, password } = parsed.data;

    const { userscollection } = await getcollection();

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return { status: 400, message: "Email already registered" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      name,
      email,
      usertype: "user",
      password: hashedPassword,
      createdAt: new Date(),
    };

    const insertedUser = await userscollection.insertOne(newUser);
    if (!insertedUser.acknowledged) {
      return { status: 500, message: "Failed to create user" };
    }

    await generateToken(newUser);

    return { status: 200, message: "Signup successful" };
  } catch (error) {
    console.error("Signup Error:", error);
    return { status: 500, message: "Server error!" };
  }
};

// ✅ LOGOUT
export const logout = async () => {
  try {
    const cookieStore = await cookies();
    const allCookies = ["token", "userdata", "cart", "next-auth.csrf-token"];
    allCookies.forEach((name) => cookieStore.delete(name));

    return { status: 200, message: "Logout successful" };
  } catch (error) {
    console.error("Logout Error:", error);
    return { status: 500, message: "Server error" };
  }
};
