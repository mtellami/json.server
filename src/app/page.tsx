"use client";

import { Popup } from "@/components/popup";
import { useEffect, useState } from "react";
import { Records } from "@/components/records";
import { Button } from "@/components/ui/button";
import { FileJson } from "lucide-react";
import { Axios } from "../utils/axios";
import { JsonListContext } from "../context/jsonList";

export default function Home() {
  const [list, setList] = useState<string[]>([]);
  const [endpoint, setEndpoint] = useState<string>("");

  useEffect(() => {
    getJsonList();
  }, []);

  const getJsonList = async () => {
    const { data } = await Axios.get("");
    setList(data.files);
  };

  const showPopup = (endpoint: string) => {
    setEndpoint(endpoint);
    document.getElementById("dialog-trigger")?.click();
  };

  return (
    <JsonListContext.Provider value={{ getJsonList }}>
      <div className="w-full h-full flex flex-col gap-8 justify-center items-center bg-slate-50">
        <div className="flex items-center gap-2 text-2xl font-bold uppercase">
          <FileJson />
          <h1>Json Server</h1>
        </div>
        <div className="w-3/4 p-4 rounded-xl shadow shadow-slate-200 bg-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold mb-8">Records:</h1>
            <Button
              variant="outline"
              className="capitalize bg-cyan-500 text-white"
              onClick={() => showPopup("")}
            >
              new
            </Button>
          </div>
          <Records endpoints={list} preview={showPopup} />
          <Popup endpoint={endpoint} />
        </div>
      </div>
    </JsonListContext.Provider>
  );
}
