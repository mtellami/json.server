import { Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Axios } from "@/utils/axios";
import { useContext } from "react";
import { JsonListContext } from "@/context/jsonList";

export function Records({
  endpoints,
  preview,
}: {
  endpoints: string[];
  preview: (endpoint: string) => void;
}) {
  const { getJsonList } = useContext(JsonListContext);

  const removeJsonFile = async (endpoint: string) => {
    await Axios.delete(endpoint);
    await getJsonList();
  };

  return (
    <Table>
      <TableBody>
        {endpoints.map((endpoint, index) => (
          <TableRow key={index} className="flex justify-between cursor-pointer">
            <TableCell
              className="font-semibold italic grow"
              onClick={() => preview(endpoint)}
            >
              {endpoint}
            </TableCell>
            <TableCell className="flex items-center gap-1">
              <Button
                className="bg-red-400 text-white"
                variant="outline"
                size="icon"
              >
                <Trash
                  className="h-4 w-4"
                  onClick={() => removeJsonFile(endpoint)}
                />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
