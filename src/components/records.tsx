'use client';

import { Trash } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function Records({ endpoints, preview }: { endpoints: string[], preview: Function }) {

  return (
    <Table>
      <TableBody>
      {endpoints.map((endpoint, index) => (
        <TableRow key={index} className="flex justify-between cursor-pointer">
          <TableCell className="font-semibold italic grow" onClick={() => preview(endpoint)}>
            {endpoint}
          </TableCell>
          <TableCell className="flex items-center gap-1">
            <Button className="bg-red-400 text-white" variant="outline" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
  )
}
