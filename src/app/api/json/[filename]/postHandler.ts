import { NextResponse } from 'next/server';
import { FileService } from '@services';
import { RegexService } from '@services';

export async function postHandler(req: Request, { params }: { params: { filename: string } }) {
  try {
    const { filename } = params;
    if (!RegexService.isFilename(filename)) {
      return new NextResponse('Invalid filename', { status: 400 });
    }

    const body = await req.json();
    await FileService.writeFile(filename, body);

    return NextResponse.json({ message: `Json data URL: "/api/json/${filename}"` });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(`Oops! failed to create file: ${error.message}.`, { status: 400 });
    }
    return new NextResponse('Oops! something went wrong.', { status: 500 });
  }
}
