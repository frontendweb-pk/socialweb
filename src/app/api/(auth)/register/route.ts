import { BadRequestError, CustomError, ValidationError } from "@/lib/errors";
import { errorHandler } from "@/lib/middlewares/error-handler";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Register new user
 * @returns
 */
const registerSchema = z.object({
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(8),
  mobile: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("BODY", body);

    // Validate the request body
    const parse = registerSchema.safeParse(body);
    if (!parse.success) {
      console.log(parse.error.errors);
      throw new ValidationError(parse.error.errors);
    }

    // check user exists
    const hasUser = await User.findOne({ where: { email: body.email } });
    if (hasUser) {
      throw new BadRequestError("User already exists", "email");
    }

    // Create a new user
    body.role_id = body.role_id ?? 2;
    const user = await User.create(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log(error);
    return errorHandler(error as CustomError);
  }
}
