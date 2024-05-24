import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col justify-center gap-4 py-8 px-6 lg:px-10 rounded-2xl shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
