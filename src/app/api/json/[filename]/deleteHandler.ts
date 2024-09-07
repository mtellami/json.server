import { NextResponse } from 'next/server';
import { FileService } from '@services';
import { RegexService } from '@services';

export async function deleteHandler(_: Request, { params }: { params: { filename: string } }) {
  try {
    const { filename } = params;
    if (!RegexService.isFilename(filename)) {
      return new NextResponse('Invalid filename', { status: 400 });
    }

    await FileService.deleteFile(filename);
    return new NextResponse('File deleted successfully', { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(`Oops! Failed to delete file: ${error.message}.`, { status: 400 });
    }
    return new NextResponse('Oops! something went wrong.', { status: 500 });
  }
}
