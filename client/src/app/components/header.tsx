import Link from "next/link";
import React from "react";
import { ButtonLogout } from "~/components/button-logout";
import { ModeToggle } from "~/components/mode-toggle";

export default function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link href={"/products/add"}>Add product</Link>
        </li>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/register"}>Register</Link>
        </li>
        <li>
          <ModeToggle />
        </li>
        <li>
          <ButtonLogout />
        </li>
      </ul>
    </div>
  );
}
