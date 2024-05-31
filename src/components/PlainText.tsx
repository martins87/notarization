"use client";

import { useState } from "react";
import sha256 from "crypto-js/sha256";

import Card from "./Card";
import { register } from "@/lib/register";
import TxLink from "./TxLink";
import SHA256Hash from "./SHA256Hash";

const PlainText = () => {
  const [data, setData] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleReset = () => setData("");

  // TODO make useRegister hook
  const handleRegister = async () => {
    setLoading(true);
    let hash: string = await register(sha256(data).toString());
    setTxHash(hash);
    setLoading(false);
  };

  return (
    <Card>
      <span className="text-xl">Plain text</span>
      <textarea
        className="textarea textarea-bordered min-h-36 focus:border-none"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="type here..."
      ></textarea>
      <SHA256Hash data={data} toHash />
      <div className="inline">
        <button className="btn btn-sm" onClick={handleReset}>
          Reset
        </button>
        <button
          className="w-fit btn btn-neutral btn-sm text-white mt-10 ml-1"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
      {loading && (
        <div className="flex items-center gap-3">
          <span className="text-sm mt-2">Registering data...</span>
          <span className="loading loading-bars loading-sm text-green-700 mt-2"></span>
        </div>
      )}
      {txHash && <TxLink txHash={txHash} />}
    </Card>
  );
};

export default PlainText;
