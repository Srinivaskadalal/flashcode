import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

const AskAQuestion = async () => {
  const session = await auth();

  if (!session) return redirect("/sign-in");
  return (
    <section>
      {/* <h2 className="font-pacifico text-2xl text-center text-blue-900 dark:text-yellow-400">
        It All Starts Here
      </h2> */}
      <div className="text-center">
        <h2 className="font-pacifico text-3xl text-blue-900 dark:text-white">
          It All Starts Here
        </h2>

        <div className="mt-3 w-16 border-b-4 border-blue-900 dark:border-yellow-400 mx-auto"></div>
      </div>
      <div className="mt-9">
        <QuestionForm />
      </div>
    </section>
  );
};

export default AskAQuestion;
