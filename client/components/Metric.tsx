import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imgUrl?: string;
  alt: string;
  value: number | string;
  title: string;
  href?: string;
  textStyles: string;
  imgStyles?: string;
  isAuthor?: boolean;
  titleStyles?: string;
}
const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  imgStyles,
  isAuthor,
  titleStyles,
}: Props) => {
  const metricContent = (
    <>
      {imgUrl ? ( // Only render Image if imgUrl is not empty
        <Image
          src={imgUrl}
          width={16}
          height={16}
          alt={alt || "Metric_image"}
          className={`rounded-full object-contain ${imgStyles}`}
        />
      ) : null}

      <p className={`${textStyles} flex items-center gap-1`}>
        {value}

        {title ? (
          <span className={cn(`small-regular line-clamp-1`, titleStyles)}>
            {title}
          </span>
        ) : null}
      </p>
    </>
  );
  return href ? (
    <Link className="flex-center gap-1" href={href}>
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};

export default Metric;
