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
        "min-w-[80%] lg:min-w-[60%] flex flex-col justify-center gap-2 absolute top-10 md:top-[25vh]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
