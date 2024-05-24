"use client";

import { useState } from "react";
import sha256 from "crypto-js/sha256";

import Card from "./Card";
import { register } from "@/lib/register";

const PlainText = () => {
  const [data, setData] = useState<string>("");
  const [txURL, setTxURL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    console.log(`registering the hash ${sha256(data).toString()}...`);
    setLoading(true);
    let txHash: string = await register(sha256(data).toString());
    console.log("tx id:", txHash);
    setTxURL(txHash);
    setLoading(false);
  };

  const handleReset = () => setData("");

  const truncatedHash = (hash: string) => {
    return hash.substring(0, 7) + "..." + hash.slice(-7);
  };

  return (
    <Card>
      <span className="text-xl">Plain text</span>
      <textarea
        className="textarea textarea-bordered min-h-44 focus:border-none"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="type here..."
      ></textarea>
      <div className="flex items-center gap-2">
        <span className="text-sm">SHA256 hash:</span>
        <span className="w-fit text-sm bg-gray-100 p-2 rounded-lg text-clip md:hidden">
          {truncatedHash(sha256(data).toString())}
        </span>
        <span className="w-fit text-sm bg-gray-100 p-2 rounded-lg text-clip hidden md:flex">
          {sha256(data).toString()}
        </span>
      </div>
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
      {txURL && (
        <a
          className="link link-success text-sm mt-2 flex items-center gap-1 no-underline"
          href={`https://sepolia.etherscan.io/tx/${txURL}`}
          target="_blank"
        >
          Check the transaction on Sepolia testnet
          <svg
            className="lucide lucide-external-link"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
        </a>
      )}
      {loading && (
        <div className="flex items-center gap-3">
          <span className="text-sm mt-2">Registering data...</span>
          <span className="loading loading-bars loading-sm text-green-700 mt-2"></span>
        </div>
      )}
    </Card>
  );
};

export default PlainText;
