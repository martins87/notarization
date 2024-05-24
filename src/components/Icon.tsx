import { FC, ReactNode } from "react";
import Image from "next/image";

type IconProps = {
  icon: any;
  onClick: () => void;
};

const Icon: FC<IconProps> = ({ icon, onClick }) => {
  return (
    <div
      className="transition ease-in-out hover:cursor-pointer hover:scale-125 hover:duration-200"
      onClick={onClick}
    >
      <Image src={icon} alt="icon" />
    </div>
  );
};

export default Icon;
