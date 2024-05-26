import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "min-w-[80%] lg:min-w-[60%] flex flex-col items-center gap-2 absolute top-[10%] md:top-[12.5%]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
