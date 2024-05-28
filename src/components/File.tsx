// "use client";

// import { useState } from "react";
// import sha256 from "crypto-js/sha256";

import Card from "./Card";
// import { register } from "@/lib/register";

const File = () => {
  // const [data, setData] = useState("");

  // const handleRegister = () => register(sha256(data).toString());

  return (
    <Card>
      <span className="text-xl">File</span>
      <p className="text-sm">Soon...</p>
      {/* <span className="text-sm">SHA256 digest: {sha256(data).toString()}</span> */}
      {/* <button
        className="w-fit btn btn-sm text-black mt-10"
        onClick={handleRegister}
      >
        Register
      </button> */}
    </Card>
  );
};

export default File;
