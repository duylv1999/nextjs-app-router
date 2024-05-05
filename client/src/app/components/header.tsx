import Link from "next/link";
import React from "react";
import { ModeToggle } from "~/components/mode-toggle";

export default function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/register"}>Register</Link>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </div>
  );
}
