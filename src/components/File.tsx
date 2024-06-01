"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";

import { register } from "@/lib/register";
import { loadFile } from "@/lib/load-file";
import Card from "./Card";
import SHA256Hash from "./SHA256Hash";
import TxLink from "./TxLink";

const EMPTY_DATA_HASH =
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

const File = () => {
  const [calculating, setCalculating] = useState<boolean>(false);
  const [fileHash, setFileHash] = useState<string>(EMPTY_DATA_HASH);
  const [loaded, setLoaded] = useState<number>(0);
  const [txHash, setTxHash] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileSelected = (e: any) => {
    setLoaded(0);
    setCalculating(true);

    const file = e.target.files![0];
    const SHA256 = CryptoJS.algo.SHA256.create();
    let counter = 0;

    loadFile(
      file,
      (data: any) => {
        var wordBuffer = CryptoJS.lib.WordArray.create(data);
        SHA256.update(wordBuffer);
        counter += data.byteLength;
        setLoaded(+((counter / file.size) * 100).toFixed(0));
      },
      () => {
        var encrypted = SHA256.finalize().toString();
        setFileHash(encrypted);
        setCalculating(false);
      }
    );
  };

  const handleRegisterFile = async () => {
    setLoading(true);
    let hash: string = await register(fileHash);
    setTxHash(hash);
    setLoading(false);
  };

  return (
    <Card>
      <span className="text-xl">File</span>
      <label className="form-control w-full">
        <input
          type="file"
          className="file-input w-full"
          onChange={handleFileSelected}
        />
      </label>
      {calculating ? (
        <div className="mt-4">
          <span>Calculating hash...</span>
          <progress
            className="progress w-full"
            value={loaded}
            max="100"
          ></progress>
        </div>
      ) : (
        fileHash !== EMPTY_DATA_HASH && <SHA256Hash data={fileHash} />
      )}
      <button
        className="w-fit btn btn-neutral btn-sm text-white mt-4 ml-1"
        onClick={handleRegisterFile}
        disabled={fileHash === EMPTY_DATA_HASH}
      >
        Register
      </button>
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

export default File;
