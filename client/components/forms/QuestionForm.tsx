//2
"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tag, FileText, List, XCircle } from "lucide-react";

import ROUTES from "@/constants/routes";
import { toast } from "@/hooks/use-toast";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { AskQuestionSchema } from "@/lib/validations";

import TagCard from "../cards/TagCard";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

interface Params {
  question?: Question;
  isEdit?: boolean;
}

const QuestionForm = ({ question, isEdit = false }: Params) => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags.map((tag) => tag.name) || [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Tags are required",
      });
    }
  };

  const handleCreateQuestion = async (
    data: z.infer<typeof AskQuestionSchema>
  ) => {
    startTransition(async () => {
      if (isEdit && question) {
        const result = await editQuestion({
          questionId: question?._id,
          ...data,
        });

        if (result.success) {
          toast({
            title: "Success",
            description: "Question updated successfully",
          });

          if (result.data) router.push(ROUTES.QUESTION(result.data._id));
        } else {
          toast({
            title: `Error ${result.status}`,
            description: result.error?.message || "Something went wrong",
            variant: "destructive",
          });
        }
        return;
      }

      const result = await createQuestion(data);

      if (result.success) {
        toast({
          title: "Success",
          description: "Question created successfully",
        });

        if (result.data) router.push(ROUTES.QUESTION(result.data._id));
      } else {
        toast({
          title: `Error ${result.status}`,
          description: result.error?.message || "Something went wrong",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 dark:text-gray-100 flex items-center gap-2 font-semibold">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Question Title
                <Tooltip.Provider delayDuration={100}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <span className="flex items-center justify-center w-5 h-5 border border-gray-400 dark:border-gray-500 dark:text-red-700 rounded-full hover:border-gray-600 dark:hover:border-gray-300 transition-all cursor-pointer text-red-700">
                        ?
                      </span>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="top"
                        align="center"
                        className="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-300 px-4 py-2 rounded-lg shadow-lg text-sm border border-gray-700 dark:border-gray-600 animate-fade-in"
                      >
                        <span className="block font-semibold text-gray-100 dark:text-white">
                          How to Add Question
                        </span>
                        <span className="text-gray-300 dark:text-gray-400">
                          Be specific and imagine you're asking a question to
                          another person.
                        </span>
                        <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </FormLabel>
              <FormControl>
                <Input
                  className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription className="text-gray-600 dark:text-gray-400">
                Be specific and imagine you're asking a question to another
                person.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 dark:text-gray-100 flex items-center gap-2 font-semibold">
                <List className="w-5 h-5 text-green-600 dark:text-green-400" />
                Detailed Explanation
                <Tooltip.Provider delayDuration={100}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <span className="flex items-center justify-center w-5 h-5 border border-gray-400 dark:border-gray-500 dark:text-red-700 rounded-full hover:border-gray-600 dark:hover:border-gray-300 transition-all cursor-pointer text-red-700">
                        ?
                      </span>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="top"
                        align="center"
                        className="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-300 px-4 py-2 rounded-lg shadow-lg text-sm border border-gray-700 dark:border-gray-600 animate-fade-in"
                      >
                        <span className="block font-semibold text-gray-100 dark:text-white">
                          How to add Detaied Explanation
                        </span>
                        <span className="text-gray-300 dark:text-gray-400">
                          Introduce the problem and expand on what you've put in
                          the title.
                        </span>
                        <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </FormLabel>
              <FormControl>
                <Editor
                  value={field.value as string}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
              </FormControl>
              {/* <FormDescription className="text-gray-600 dark:text-gray-400">
                Introduce the problem and expand on what you've put in the
                title.
              </FormDescription> */}

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel className="text-gray-900 dark:text-gray-100 flex items-center gap-2 font-semibold">
                <Tag className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                Tags <span className="text-primary-500">*</span>
                <Tooltip.Provider delayDuration={100}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <span className="flex items-center justify-center w-5 h-5 border border-gray-400 dark:border-gray-500 dark:text-red-700 rounded-full hover:border-gray-600 dark:hover:border-gray-300 transition-all cursor-pointer text-red-700">
                        ?
                      </span>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="top"
                        align="center"
                        className="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-300 px-4 py-2 rounded-lg shadow-lg text-sm border border-gray-700 dark:border-gray-600 animate-fade-in"
                      >
                        <span className="block font-semibold text-gray-100 dark:text-white">
                          How to use tags?
                        </span>
                        <span className="text-gray-300 dark:text-gray-400">
                          Add up to <b>3 tags</b> to describe your question.
                          Press <b>Enter</b> to add a tag.
                        </span>
                        <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </FormLabel>

              <FormControl>
                <div>
                  <Input
                    className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex flex-wrap mt-2.5 gap-2.5">
                      {field.value.map((tag: string) => (
                        <TagCard
                          key={tag}
                          _id={tag}
                          name={tag}
                          compact
                          remove
                          isButton
                          handleRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 rounded-lg  dark:text-white text-white primary-gradient2 flex items-center gap-2"
          >
            {isPending ? (
              <>
                <ReloadIcon className="w-5 h-5 animate-spin" />
                <span>Submitting</span>
              </>
            ) : isEdit ? (
              "Edit"
            ) : (
              "Ask a Question"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { MDXEditorMethods } from "@mdxeditor/editor";
// import { ReloadIcon } from "@radix-ui/react-icons";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import React, { useRef, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Tag, FileText, List } from "lucide-react";

// import ROUTES from "@/constants/routes";
// import { toast } from "@/hooks/use-toast";
// import { createQuestion, editQuestion } from "@/lib/actions/question.action";
// import { AskQuestionSchema } from "@/lib/validations";

// import TagCard from "../cards/TagCard";
// import { Button } from "../ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { Input } from "../ui/input";

// const Editor = dynamic(() => import("@/components/editor"), {
//   ssr: false,
// });

// interface Params {
//   question?: any;
//   isEdit?: boolean;
// }

// const QuestionForm = ({ question, isEdit = false }: Params) => {
//   const router = useRouter();
//   const editorRef = useRef<MDXEditorMethods>(null);
//   const [isPending, startTransition] = useTransition();

//   // const form = useForm<z.infer<typeof AskQuestionSchema>>({
//   //   resolver: zodResolver(AskQuestionSchema),
//   //   defaultValues: {
//   //     title: question?.title || "",
//   //     content: question?.content || "",
//   //     tags: question?.tags.map((tag) => tag.name) || [],
//   //   },
//   // });

//   const form = useForm<z.infer<typeof AskQuestionSchema>>({
//     resolver: zodResolver(AskQuestionSchema),
//     defaultValues: {
//       title: question?.title || "",
//       content: question?.content || "",
//       tags: question?.tags.map((tag) => tag.name) || [],
//     },
//   });
//   const handleInputKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     field: { value: string[] }
//   ) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const tagInput = e.currentTarget.value.trim();

//       if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
//         form.setValue("tags", [...field.value, tagInput]);
//         e.currentTarget.value = "";
//         form.clearErrors("tags");
//       } else if (tagInput.length > 15) {
//         form.setError("tags", {
//           type: "manual",
//           message: "Tag should be less than 15 characters",
//         });
//       } else if (field.value.includes(tagInput)) {
//         form.setError("tags", {
//           type: "manual",
//           message: "Tag already exists",
//         });
//       }
//     }
//   };

//   const handleTagRemove = (tag: string, field: { value: string[] }) => {
//     const newTags = field.value.filter((t) => t !== tag);
//     form.setValue("tags", newTags);
//   };

//   return (
//     <Form {...form}>
//       <form
//         className="flex w-full flex-col gap-6 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700"
//         onSubmit={form.handleSubmit(async (data) => {
//           startTransition(async () => {
//             if (isEdit && question) {
//               const result = await editQuestion({
//                 questionId: question?._id,
//                 ...data,
//               });

//               if (result.success) {
//                 toast({
//                   title: "Success",
//                   description: "Question updated successfully",
//                 });
//                 if (result.data) router.push(ROUTES.QUESTION(result.data._id));
//               } else {
//                 toast({
//                   title: `Error ${result.status}`,
//                   description: result.error?.message || "Something went wrong",
//                   variant: "destructive",
//                 });
//               }
//               return;
//             }

//             const result = await createQuestion(data);

//             if (result.success) {
//               toast({
//                 title: "Success",
//                 description: "Question created successfully",
//               });
//               if (result.data) router.push(ROUTES.QUESTION(result.data._id));
//             } else {
//               toast({
//                 title: `Error ${result.status}`,
//                 description: result.error?.message || "Something went wrong",
//                 variant: "destructive",
//               });
//             }
//           });
//         })}
//       >
//         {/* Title Field */}
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-2">
//               <FormLabel className="text-gray-900 dark:text-gray-100 flex items-center gap-2 font-semibold">
//                 <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                 Question Title
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   className="border border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2"
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription className="text-gray-600 dark:text-gray-400">
//                 Be specific and imagine you're asking a question to another
//                 person.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Content Field */}
//         <FormField
//           control={form.control}
//           name="content"
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-2">
//               <FormLabel className="text-gray-900 dark:text-gray-100 flex items-center gap-2 font-semibold">
//                 <List className="w-5 h-5 text-green-600 dark:text-green-400" />
//                 Detailed Explanation
//               </FormLabel>
//               <FormControl>
//                 <Editor
//                   value={field.value as string}
//                   editorRef={editorRef}
//                   fieldChange={field.onChange}
//                 />
//               </FormControl>
//               <FormDescription className="text-gray-600 dark:text-gray-400">
//                 Introduce the problem and expand on what you've put in the
//                 title.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Tags Field */}
//         <FormField
//           control={form.control}
//           name="tags"
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-2">
//               <FormLabel className="text-gray-900 dark:text-gray-100 flex items-center gap-2 font-semibold">
//                 <Tag className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
//                 Tags
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   className="border border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2"
//                   placeholder="Add tags..."
//                   onKeyDown={(e) => handleInputKeyDown(e, field)}
//                 />
//               </FormControl>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {field.value.map((tag: string) => (
//                   <TagCard
//                     key={tag}
//                     _id={tag}
//                     name={tag}
//                     compact
//                     remove
//                     isButton
//                     handleRemove={() => handleTagRemove(tag, field)}
//                   />
//                 ))}
//               </div>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Submit Button */}
//         <div className="mt-4 flex justify-end">
//           <Button
//             type="submit"
//             disabled={isPending}
//             className="px-6 py-3 rounded-lg text-white bg-blue-600 dark:bg-blue-500 flex items-center gap-2"
//           >
//             {isPending ? (
//               <ReloadIcon className="w-5 h-5 animate-spin" />
//             ) : isEdit ? (
//               "Edit"
//             ) : (
//               "Ask a Question"
//             )}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default QuestionForm;
