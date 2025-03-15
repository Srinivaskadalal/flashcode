import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { cn, getDeviconClassName, getTechDescription } from "@/lib/utils";
import Image from "next/image";

interface CardInterface {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  inline?:boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  inline,
  remove,
  isButton,
  handleRemove,
}: CardInterface) => {
  const iconClass = getDeviconClassName(name);
  const iconDescription = getTechDescription(name);

  // Ensure valid image path
  const imagePath = iconClass.startsWith("IMAGE:")
    ? iconClass.replace("IMAGE:", "")
    : null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const Content = (
    <>
      <Badge className="background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase flex flex-row gap-2">
        <div className="flex-center space-x-2">
          {imagePath ? (
            <Image
              src={imagePath}
              alt={name}
              className="h-4 w-4 inline-block object-contain"
              width={16}
              height={16}
              priority
              unoptimized
            />
          ) : (
            <i className={`${iconClass} text-sm`} aria-hidden="true" />
          )}
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            src="/icons/close.svg"
            width={12}
            height={12}
            alt="close icon"
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
            priority
            unoptimized
          />
        )}
      </Badge>
      {showCount ? (
        <p className="small-medium text-dark500_light700">{questions}</p>
      ) : null}
    </>
  );

  // Compact Layout
  if (compact) {
    return isButton ? (
      <button className="flex justify-between gap-2" onClick={handleClick}>
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAG(_id)} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }
  // Compact Layout
  if (inline) {
    return isButton ? (
      <button className="flex justify-between gap-2" onClick={handleClick}>
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAG(_id)} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }

  // Non-Compact Layout
  return (
    <Link href={ROUTES.TAG(_id)} className="shadow-light-100_darknone">
      <article className="background-light900_dark200 light-border flex w-full flex-col rounded-xl border px-6 py-8 sm:w-[240px] transition-transform duration-300 hover:scale-105">
        <div className="flex items-center justify-between gap-3">
          <div className="background-light800_dark400 w-fit rounded-sm px-4 py-1.5">
            <p className="paragraph-semibold text-dark300_light900">{name}</p>
          </div>
          {imagePath ? (
            <Image
              src={imagePath}
              alt={name}
              className="h-5 w-5"
              width={20}
              height={20}
              priority
              unoptimized
            />
          ) : (
            <i className={cn(iconClass, "text-2xl")} aria-hidden="true" />
          )}
        </div>

        <p className="small-regular text-dark500_light700 mt-5 line-clamp-3 w-full">
          {iconDescription}
        </p>

        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className="body-semibold text-blue-900 dark:text-yellow-500 mr-2.5">
            {questions}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
