import { NextResponse } from 'next/server';
import { FileService } from '@services';
import { HttpInternalServerError } from '@http';

export async function GET() {
  try {
    const files = await FileService.readDir();
    return NextResponse.json({ files: files });
  } catch (error) {
    console.error(error);
    return new HttpInternalServerError();
  }
}
