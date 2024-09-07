import { NextResponse } from 'next/server';
import { FileService } from '@services';

export async function GET() {
  try {
    const files = await FileService.readDir();
    return NextResponse.json({ files: files });
  } catch (error) {
    console.error(error);
    return new NextResponse('Oops! something went wrong.', { status: 500 });
  }
}
