import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Toggle } from "../components/Toggle";

export const Navbar = () => {
  return (
    <nav
      className="flex items-center justify-between w-full px-14 top-0 h-20"
      style={{ height: "5rem", paddingLeft: "3.5rem", paddingRight: "3.5rem" }}
    >
      <h1 className="font-bold text-xl text-black dark:text-white tracking-tight">
        YouTube Tags Generator
      </h1>
      <div className="flex items-center justify-center">
        <Toggle />
        <Link href="">
          <a
            className="text-3xl text-black dark:text-white"
            target="_blank"
            style={{ marginLeft: "1.5rem" }}
          >
            <FaGithub />
          </a>
        </Link>
      </div>
    </nav>
  );
};

//
//
