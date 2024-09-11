import { NextResponse } from 'next/server';
import { FileService } from '@services';
import { JsonRequestContext } from '@interfaces';
import { HttpBadRequest, HttpInternalServerError } from '@http';

export async function deleteHandler(_: Request, { params }: JsonRequestContext) {
  try {
    const { filename } = params;
    await FileService.deleteFile(filename);

    return new NextResponse('File deleted successfully', { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new HttpBadRequest(`Oops! Failed to delete file: ${error.message}.`);
    }
    return new HttpInternalServerError();
  }
}
