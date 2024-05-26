import React, { FC } from "react";
import sha256 from "crypto-js/sha256";

type SHA256Hash = {
  data: string;
};

const SHA256Hash: FC<SHA256Hash> = ({ data }) => {
  const truncatedHash = (hash: string) => {
    return hash.substring(0, 7) + "..." + hash.slice(-7);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">SHA256 hash:</span>
      <span className="w-fit text-sm bg-gray-100 p-2 rounded-lg text-clip md:hidden">
        {truncatedHash(sha256(data).toString())}
      </span>
      <span className="w-fit text-sm bg-gray-100 p-2 rounded-lg text-clip hidden md:flex">
        {sha256(data).toString()}
      </span>
    </div>
  );
};

export default SHA256Hash;
