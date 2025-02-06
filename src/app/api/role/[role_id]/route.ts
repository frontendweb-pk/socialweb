import { CustomError } from "@/lib/errors/custom-error";
import { NotFoundError } from "@/lib/errors/not-found-error";
import { errorHandler } from "@/lib/middlewares/error-handler";
import { Role } from "@/lib/models";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ role_id: string }>;
};

/**
 * Update role
 * @param req
 * @param param1
 */
export async function PUT(req: Request, { params }: Props) {
  try {
    const { role_id } = await params;

    // get role
    const role = await Role.findByPk(role_id);
    if (!role) throw new NotFoundError("Role not found");

    // update role
    await role.update(await req.json());
    return NextResponse.json(role, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Delete role
 * @param req
 * @param param1
 */
export async function DELETE(req: Request, { params }: Props) {
  try {
    const { role_id } = await params;

    // get role
    const role = await Role.findByPk(role_id);
    if (!role) throw new NotFoundError("Role not found");

    // delete role
    await role.destroy();
    return NextResponse.json({ role_id }, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
