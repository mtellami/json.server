import { NextRequest, NextResponse } from "next/server";
import { FileService } from "@services";
import {
  HttpBadRequest,
  HttpInternalServerError,
  HttpNotFound
} from "@http";

function getDestination(request: NextRequest): string {
  const { pathname } = request.nextUrl;
  return pathname.slice("/api/json/".length) 
}

export async function GET(request: NextRequest) {
  try {
    const destination = getDestination(request);
    const fileContent = await FileService.readFile(destination);
    if (!fileContent) {
      return new HttpNotFound("File not found.");
    }

    return NextResponse.json(fileContent);
  } catch (error) {
    if (error instanceof Error) {
      return new HttpBadRequest(`Oops! failed to get file: ${error.message}.`);
    }
    return new HttpInternalServerError();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const destination = getDestination(request);
    const body = await request.json();
    await FileService.writeFile(destination, body);

    return NextResponse.json({ message: `Json data URL: '/api/json/${destination}'` });
  } catch (error) {
    if (error instanceof Error) {
      return new HttpBadRequest(`Oops! failed to create file: ${error.message}.`);
    }
    return new HttpInternalServerError();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const destination = getDestination(request);
    await FileService.deleteFile(destination);

    return new NextResponse('File deleted successfully', { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new HttpBadRequest(`Oops! Failed to delete file: ${error.message}.`);
    }
    return new HttpInternalServerError();
  }
}
