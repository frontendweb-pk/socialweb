import { BadRequestError } from "@/lib/errors/bad-request-error";
import { CustomError } from "@/lib/errors/custom-error";
import { errorHandler } from "@/lib/middlewares/error-handler";
import { Role } from "@/lib/models";
import { NextResponse } from "next/server";
import { z } from "zod";
/**
 * Get all roles
 * @returns
 */
export async function GET() {
  try {
    // Get all roles
    const roles = await Role.findAll();
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Create a new role
 * @returns
 */

const roleSchema = z.object({ role_name: z.string().nonempty() });
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the request body
    const parse = roleSchema.safeParse(body);
    if (!parse.success) {
      throw new BadRequestError("Invalid data", "role_name");
    }

    // Create a new role
    const role = await Role.create(body);
    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
