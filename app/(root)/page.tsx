import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <h1>Whereas recognition of the inherent dignity</h1>
        <form
          className="px-10 pt-[100px]"
          action={async () => {
            "use server";
            await signOut({ redirectTo: ROUTES.SIGN_IN });
          }}
        >
          <Button type="submit">logout</Button>
        </form>
      </div>
    </>
  );
}
