'use client';

import { Copy } from "lucide-react"
import { Button } from "./ui/button";
import { useContext, useEffect, useRef, useState } from "react";
import { Axios } from "../utils/axios";
import { Spinner } from "./ui/spinner";
import { JsonListContext } from "@/context/jsonList";

export function DioalogBody({ endpoint }: { endpoint: string }) {
  const host = 'http://localhost:3000/api/json/';
  const [error, setError] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [json, setJson] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { getJsonList  } = useContext(JsonListContext);

  useEffect(() => {
    (async () => {
      if (endpoint !== '') {
        const { data } = await Axios.get(`/${endpoint}`);
        setJson(JSON.stringify(data));
      } else {
        setJson('{}');
      }
    })();
  }, [])

  useEffect(() => {
    setUrl(endpoint);
    inputRef.current?.focus();
  }, [endpoint])

  const onJsonChange = (e: any) => {
    try {
      setJson(e.target.value);
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
      await Axios.put(`/${url}`, JSON.parse(json));
      await getJsonList();
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
              ref={inputRef}
              className="h-full p-2 grow outline-0 rounded"
              type="text"
              value={`${host}${url}`}
              onChange={onUrlChange}
            />
          </div>
          <Copy
            onClick={() => {navigator.clipboard.writeText(`${inputRef.current?.value}`)}}
            className="cursor-pointer active:text-green-500"
            />
        </div>
        <Button disabled={error !== '' || url === ''}
          className="m-0 bg-emerald-600 hover:bg-emerald-900 text-white"
          onClick={save}
          >save</Button>
      </div>
      <div className="border border-slate-300 rounded min-h-96 flex items-center justify-center">
        {json === '' ? 
          <Spinner size="medium" /> : 
          <textarea
            className="resize-none w-full p-2 h-[500px] outline-0"
            value={json}
            onChange={onJsonChange} 
          />}
      </div>
      <h1 className="text-red-400">{error}</h1>
    </div>
  )
}
