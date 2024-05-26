import { FC } from "react";

type TxLinkProps = {
  txHash: string;
};

const TxLink: FC<TxLinkProps> = ({ txHash }) => {
  return (
    <a
      className="link link-success text-sm mt-2 flex items-center gap-1 no-underline"
      href={`https://sepolia.etherscan.io/tx/${txHash}`}
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
  );
};

export default TxLink;
