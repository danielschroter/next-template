import React from "react";
import Link from "next/link";
import Login from "./Login";

import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

import Logged from "./Logged";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="text-lg tracking-widest">YourLogo.</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user ? <Login /> : null}
        {session?.user && <Logged image={session.user?.image || ""} />}
      </ul>
    </nav>
  );
}
