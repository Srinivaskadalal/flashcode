// import { auth, signOut } from "@/auth";
// import { Button } from "@/components/ui/button";
// import ROUTES from "@/constants/routes";
// import Image from "next/image";

// export default async function Home() {
//   const session = await auth();
//   console.log(session);
//   return (
//     <>
//       <div className="flex flex-col h-screen items-center justify-center">
//         <h1>CONTENT GOES HERE</h1>
//         <h2>YET TO DEVELOP </h2>
//         <form
//           className="px-10 pt-[100px]"
//           action={async () => {
//             "use server";
//             await signOut({ redirectTo: ROUTES.SIGN_IN });
//           }}
//         >
//           {/* <Button type="submit">logout</Button> */}
//         </form>
//       </div>
//     </>
//   );
// }
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-lg animate-fade-in">
        CONTENT GOES HERE
      </h1>
      <h2 className="text-2xl font-medium text-gray-300 uppercase tracking-widest mt-4 animate-pulse">
        YET TO DEVELOP - End Of Week 2
      </h2>

      <Image
        src="/images/spidey.svg"
        alt="spider_man_svg"
        width={200}
        height={200}
        className="mt-6 rounded-lg shadow-lg"
      />

      <form
        className="mt-10 flex flex-col items-center space-y-4"
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Logout
        </Button>
      </form>
    </div>
  );
}
