import { prisma } from "../../lib/prismaClient";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../utils/token";

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw { status: 404, message: "User does not exist" };
  }

  if (user.isBlocked) {
    throw { status: 403, message: "You have been blocked by admin" };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw { status: 401, message: "Invalid credentials" };
  }

  if (user.role === "user" || user.role === "closer") {
    throw { status: 403, message: "Access denied" };
  }

  const token = generateAuthToken({
    id: String(user.id),
    role: user.role,
  });

  const { password: _, ...userData } = user;

  return {
    token,
    user: userData,
  };
};