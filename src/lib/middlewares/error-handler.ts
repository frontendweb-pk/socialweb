import { NextResponse } from "next/server";
import { CustomError } from "../errors/custom-error";

export function errorHandler(error: CustomError) {
  console.log(error);
  if (error instanceof CustomError) {
    return NextResponse.json(
      { errors: error.serializeErrors() },
      { status: error.statusCode }
    );
  }

  return NextResponse.json(
    { errors: [{ message: "Something went wrong" }] },
    { status: 500 }
  );
}
