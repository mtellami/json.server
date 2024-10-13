'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { DioalogBody } from "./dialogBody";

export function Popup({ endpoint }: { endpoint: string }) {
  return (
    <Dialog>
      <DialogTrigger id="dialog-trigger" className="hidden" />
      <DialogClose id="dialog-close" className="hidden" />

      <DialogContent className="min-w-[60%]">
        <DialogHeader>
          <DialogTitle>{ endpoint === '' ? 'New Endpoint' : 'Endpoint preview' }</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DioalogBody endpoint={endpoint} />
      </DialogContent>
    </Dialog>
  )
}
