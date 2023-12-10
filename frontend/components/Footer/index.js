import Image from "next/image";
import Logo from "../Logo";


const Footer = () => {
  return (
    <footer className="max-w-[1440px] mx-auto flex items-center justify-center p-[100px]">
      <div className="flex items-center justify-center">
        Powered by{" "}
        <span className="ml-[20px]">
        <Logo scale={1} />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
