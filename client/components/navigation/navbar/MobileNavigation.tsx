import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { auth, signOut } from "@/auth";
import { LogOut } from "lucide-react";

export default async function MobileNavigation() {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          alt="side_menubar_icon"
          width={36}
          height={36}
          className=" rounded-2 bg-black p-2 sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>

        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/test.svg"
            alt="logo_of_flashcode"
            width={23}
            height={23}
          />
          <p className="h2-bold font-space-grotesk ">
            <span className="!text-[#DAA520] dark:text-[#FF8C00]">Flash</span>
            <span className="!text-[#1E3A8A] dark:text-[#00C8FF]">Code</span>
          </p>
        </Link>
        <div className=" no-scrollbar flex h-full flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3 py-6 ">
            {" "}
            {userId ? (
              <SheetClose asChild>
                <form
                  action={async () => {
                    "use server";

                    await signOut();
                  }}
                >
                  <Button
                    type="submit"
                    className="base-medium w-fit !bg-transparent px-4 py-3"
                  >
                    <LogOut className="size-5 text-black dark:text-white" />
                    <span className="text-dark300_light900">Logout</span>
                  </Button>
                </form>
              </SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_IN}>
                    <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                      <span className="primary-text-gradient">Log In</span>
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_UP}>
                    <Button
                      className="small-medium 
                light-border-2 btn-tertiary
                text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
