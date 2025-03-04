"use client";
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { z } from "zod";
import TagCard from "../cards/TagCard";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
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
        form.setValue("tags", [...field.value, tagInput], {
          shouldValidate: true,
        });
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tags should be less than 15 characters",
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
    form.setValue("tags", newTags, { shouldValidate: true });

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "At least one tag is required",
      });
    } else {
      form.clearErrors("tags");
    }
  };

  const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8 w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        {/* Question Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Question Title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Write a clear and concise question title..."
                  className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </FormControl>
              <FormDescription className="text-gray-500 dark:text-gray-400">
                Be specific when asking your question so others can understand
                it quickly.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Detailed Explanation */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Detailed Explanation <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  editorRef={editorRef}
                  value={field.value}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="text-gray-500 dark:text-gray-400">
                Provide detailed context and background to make your question
                clear.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags Section */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Tags <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Type a tag and press Enter..."
                  onKeyDown={(e) => handleInputKeyDown(e, field)}
                />
              </FormControl>
              {field.value.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
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
              <FormDescription className="text-gray-500 dark:text-gray-400">
                Add up to three tags that describe your question. Press Enter to
                add each tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="primary-gradient2 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg"
          >
            Submit Your Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
