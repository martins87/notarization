"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";

import Card from "./Card";
import { register } from "@/lib/register";
import SHA256Hash from "./SHA256Hash";
import TxLink from "./TxLink";

const INITIAL_HASH =
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

const File = () => {
  const [calculating, setCalculating] = useState<boolean>(false);
  const [fileHash, setFileHash] = useState<string>(INITIAL_HASH);
  const [loaded, setLoaded] = useState<number>(0);
  const [txHash, setTxHash] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const callbackRead = (
    reader,
    file,
    event,
    callbackProgress,
    callbackFinal
  ) => {
    callbackProgress(event.target.result);
    if (reader.offset + reader.size >= file.size) {
      callbackFinal();
    }
  };

  const loadingFile = (file, callbackProgress, callbackFinal) => {
    var chunkSize = 1024 * 1024; // bytes
    var offset = 0;
    var size = chunkSize;
    var partial;
    var index = 0;

    if (file.size === 0) {
      callbackFinal();
    }
    while (offset < file.size) {
      partial = file.slice(offset, offset + size);
      var reader = new FileReader();
      reader.size = chunkSize;
      reader.offset = offset;
      reader.index = index;
      reader.onload = function (evt) {
        callbackRead(this, file, evt, callbackProgress, callbackFinal);
      };
      reader.readAsArrayBuffer(partial);
      offset += chunkSize;
      index += 1;
    }
  };

  const handleFileSelected = (e: any) => {
    setLoaded(0);
    setCalculating(true);

    const file = e.target.files![0];
    const SHA256 = CryptoJS.algo.SHA256.create();
    let counter = 0;

    loadingFile(
      file,
      (data) => {
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
    console.log("loading:", loading);
    setLoading(true);
    let hash: string = await register(fileHash);
    setTxHash(hash);
    setLoading(false);
    console.log("loading:", loading);
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
        fileHash !== INITIAL_HASH && <SHA256Hash data={fileHash} />
      )}
      <button
        className="w-fit btn btn-neutral btn-sm text-white mt-4 ml-1"
        onClick={handleRegisterFile}
        disabled={fileHash === INITIAL_HASH}
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
