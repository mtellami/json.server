import { getHandler } from "./getHandler";
import { postHandler } from './postHandler';
import { deleteHandler } from './deleteHandler';

export async function POST(req: Request, context: { params: { filename: string } }) {
  return postHandler(req, context);
}

export async function GET(req: Request, context: { params: { filename: string } }) {
  return getHandler(req, context);
}

export async function DELETE(req: Request, context: { params: { filename: string } }) {
  return deleteHandler(req, context);
}
