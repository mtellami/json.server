'use client';

import { Copy } from "lucide-react"
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Axios } from "../utils/axios";

export function DioalogBody({ endpoint }: { endpoint: string }) {
  const host = 'http://localhost:3000/';
  const [error, setError] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [json, setJson] = useState<string>(JSON.stringify({
    key: "value"
  }));
  const dataField = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setUrl(endpoint);
    const textarea = dataField.current;
    if (textarea) {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
    }
  }, [endpoint])

  const onJsonChange = (e: any) => {
    setJson(e.target.value);
    try {
      JSON.parse(e.target.value);
      setError('');
    } catch (err: any) {
      setError(err.message);
      if (e.target.value === '') {
        setError('');
      }
    }
  }
  const onUrlChange = (e: any) => {
    if (e.target.length < host.length) {
      setUrl('');
    }
    setUrl(e.target.value.substr(host.length));
  }
  const save = async () => {
    try {
      const response = await Axios.put(`/${url}`, JSON.parse(json));
      console.log(response);
      document.getElementById('dialog-close')?.click();
    } catch (err: any) {
      setError(err.message);
    }
  }
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-4">
        <div className="grow flex items-center justify-between p-1 border border-slate-300 rounded">
          <div className="flex items-center px-2 grow gap-2">
            <h3 className="font-bold">URL: </h3>
            <input 
              className="h-full p-2 grow outline-0 rounded "
              type="text"
              value={`${host}${url}`}
              onChange={onUrlChange}
            />
          </div>
          <Copy />
        </div>
        <Button
          className="m-0 bg-emerald-600 hover:bg-emerald-900 text-white"
          onClick={save}
          >save</Button>
      </div>
      <div className="border border-slate-300 rounded min-h-96">
        <textarea
          ref={dataField}
          className="resize-none w-full p-2 h-[500px] outline-0"
          value={json}
          onChange={onJsonChange} 
          />
      </div>
      <h1 className="text-red-400">{error}</h1>
    </div>
  )
}
