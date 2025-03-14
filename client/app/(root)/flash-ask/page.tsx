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
    <>
      <h2 className="font-pacifico text-2xl text-center text-blue-900">
        It All Starts Here
      </h2>
      <div className="mt-9">
        <QuestionForm />
      </div>
    </>
  );
};

export default AskAQuestion;
