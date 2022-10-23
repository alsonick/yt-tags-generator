import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav
      className="flex items-center justify-between w-full px-14 top-0 h-20"
      style={{ height: "5rem", paddingLeft: "3.5rem", paddingRight: "3.5rem" }}
    >
      <h1 className="font-bold text-xl tracking-tight text-black">
        YouTube Tags Generator
      </h1>
      <Link href="">
        <a
          className="text-3xl text-black"
          target="_blank"
          style={{ marginLeft: "1.5rem" }}
        >
          <FaGithub />
        </a>
      </Link>
    </nav>
  );
};

//
//
