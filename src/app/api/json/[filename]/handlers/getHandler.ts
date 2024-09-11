import { NextResponse } from 'next/server';
import { FileService } from '@services';
import { JsonRequestContext } from '@interfaces';
import { HttpBadRequest, HttpInternalServerError } from '@http';

export async function getHandler(_: Request, { params }: JsonRequestContext) {
  try {
    const { filename } = params;
    const fileContent = await FileService.readFile(filename);

    return NextResponse.json(fileContent);
  } catch (error) {
    if (error instanceof Error) {
      return new HttpBadRequest(`Oops! failed to get file: ${error.message}.`);
    }
    return new HttpInternalServerError();
  }
}
