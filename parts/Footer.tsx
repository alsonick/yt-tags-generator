import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer
      className="text-sm text-center text-gray-500 pb-5 dark:text-gray-500"
      style={{ margin: "2rem" }}
    >
      Made with ❤️ by{" "}
      <FooterLink link="https://github.com/alsonick">Nicholas</FooterLink>{" "}
      <br /> &{" "}
      <FooterLink link="https://github.com/alsonick/yt-tags-generator/graphs/contributors">
        contributors
      </FooterLink>
      .
    </footer>
  );
};

const FooterLink = ({
  link,
  children,
}: {
  link: string;
  children?: React.ReactNode;
}) => {
  return (
    <Link href={link}>
      <a className="font-bold text-black" title={link} target="_blank">
        {children}
      </a>
    </Link>
  );
};
