import {
  AuthenticationError,
  CustomError,
  ValidationError,
} from "@/lib/errors";
import { Jwt } from "@/lib/jwt";
import { errorHandler } from "@/lib/middlewares/error-handler";
import { User } from "@/lib/models";
import { Password } from "@/lib/password";
import { NextResponse } from "next/server";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the request body
    const parse = loginSchema.safeParse(body);
    if (!parse.success) {
      throw new ValidationError(parse.error.errors);
    }

    // check user exists
    const user = await User.findOne({ where: { email: body.email } });
    if (!user) {
      throw new AuthenticationError("Invalid credentials", "email");
    }

    // check password
    const isMatch = await Password.compare(body.password, user.password);
    if (!isMatch) {
      throw new AuthenticationError("Invalid password", "password");
    }

    // return user
    user.access_token = Jwt.sign({
      id: user.user_id,
      email: user.email,
    });

    const { password: _, ...userData } = user.toJSON();
    return NextResponse.json({ ...userData, expireIn: 3600 }, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
