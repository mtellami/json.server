import { NextResponse } from 'next/server';
import { FileService } from '@services';
import { JsonRequestContext } from '@interfaces';
import { HttpBadRequest, HttpInternalServerError } from '@http';

export async function postHandler(req: Request, { params }: JsonRequestContext) {
  try {
    const { filename } = params;
    const body = await req.json();
    await FileService.writeFile(filename, body);

    return NextResponse.json({ message: `Json data URL: '/api/json/${filename}'` });
  } catch (error) {
    if (error instanceof Error) {
      return new HttpBadRequest(`Oops! failed to create file: ${error.message}.`);
    }

    return new HttpInternalServerError();
  }
}
