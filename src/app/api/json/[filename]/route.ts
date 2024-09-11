import { JsonRequestContext } from "@interfaces";
import { getHandler, postHandler, deleteHandler } from "./handlers";
import { RegexService } from "@services";
import { HttpBadRequest } from "@http";

export async function GET(request: Request, context: JsonRequestContext) {
  if (!RegexService.isFilename(context.params.filename)) {
    return new HttpBadRequest('Invalid filename');
  }
  return getHandler(request, context);
}

export async function POST(request: Request, context: JsonRequestContext) {
  if (!RegexService.isFilename(context.params.filename)) {
    return new HttpBadRequest('Invalid filename');
  }
  return postHandler(request, context);
}

export async function DELETE(request: Request, context: JsonRequestContext) {
  if (!RegexService.isFilename(context.params.filename)) {
    return new HttpBadRequest('Invalid filename');
  }
  return deleteHandler(request, context);
}
