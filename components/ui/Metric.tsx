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

      <p className={`${textStyles} flex items-center gap-1`}>{value}</p>
      <span
        className={`small-regular line-clamp-1 ${
          isAuthor ? "max-sm:hidden" : ""
        }`}
      >
        {title}
      </span>
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
