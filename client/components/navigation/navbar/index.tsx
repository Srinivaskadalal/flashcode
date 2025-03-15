import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "@/components/navigation/navbar/Theme";
import MobileNavigation from "./MobileNavigation";
import UserAvatar from "@/components/UserAvatar";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  console.log(session?.user?.image);
  return (
    <nav className="flex-between navbackground-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/images/test.svg"
          alt="Flashcode Logo"
          width={23}
          height={23}
        />
        <p className="h2-bold font-space-grotesk max-sm:hidden">
          <span className="text-[#DAA520] dark:text-[#DAA520] font-pacifico">
            Flash
          </span>
          <span className="text-[#1E3A8A] dark:text-[#ffffff] font-pacifico">
            Code
          </span>
        </p>
      </Link>
      <p>SEARCH COMPONENT</p>

      <div className="flex-between gap-5">
        <Theme />
        {session?.user?.id && (
          <UserAvatar
            id={session.user.id}
            name={session.user.name!}
            imageUrl={session.user?.image}
          />
        )}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
