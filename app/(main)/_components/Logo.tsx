import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex justify-center items-center gap-1">
      <Image src={"/logo.png"} width={44} height={44} alt="logo" className="w-10  h-10"/>
      <h4 className="text-base md:text-2xl font-bold gradient-logo tracking-wide">FileFlux</h4>
    </Link>
  );
};

export default Logo;
