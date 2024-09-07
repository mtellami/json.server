import { NextResponse } from 'next/server';
import { FileService } from '@services';
import { RegexService } from '@services';

export async function getHandler(_: Request, { params }: { params: { filename: string } }) {
  try {
    const { filename } = params;
    if (!RegexService.isFilename(filename)) {
      return new NextResponse('Invalid filename', { status: 400 });
    }
    const fileContent = await FileService.readFile(filename);

    return NextResponse.json(fileContent);
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(`Oops! failed to get file: ${error.message}.`, { status: 400 });
    }
    return new NextResponse('Oops! something went wrong.', { status: 500 });
  }
}
