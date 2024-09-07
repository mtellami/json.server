import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const jsonDirectory = path.join(process.cwd(), 'public/json');

export async function POST(req: Request, { params }: { params: { filename: string } }) {
  try {
    const { filename } = params;
    if (!filename || /[^a-zA-Z0-9_-]/.test(filename)) {
      return new NextResponse('Invalid dataname alias', { status: 400 });
    }

    const body = await req.json();
    const filePath = path.join(jsonDirectory, `${filename}.json`);
    if (fs.existsSync(filePath)) {
      return new NextResponse('Dataname alias already exists', { status: 409 });
    }

    await fs.promises.writeFile(filePath, JSON.stringify(body, null, 2), 'utf8');
    return NextResponse.json({ message: `Json data URL: "/api/json/${filename}"` });
  } catch (error) {
    console.error(error);
    return new NextResponse('Oops! something went wrong.', { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { filename: string } }) {
  try {
    const filePath = path.join(jsonDirectory, `${params.filename}.json`);
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Json data not found', { status: 404 });
    }

    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    console.error(error);
    return new NextResponse('Oops! something went wrong.', { status: 500 });
  }
}
