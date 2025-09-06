import { text } from "@styled-system/recipes";
import Link from "next/link";
import Image from "next/image";
import { css, cx } from "@styled-system/css";

export type BlogPostCardProps = {
  href: string;
  thumbnailSrc: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
};

export const BlogPostCard = ({
  href,
  thumbnailSrc,
  title,
  subtitle,
  date,
  author,
}: BlogPostCardProps) => {
  const parsedDate = new Date(date);
  return (
    <Link
      href={href}
      className={cx(
        css({
          display: "block",
          width: "[100%]",
        }),
        "group"
      )}
    >
      <div
        className={css({
          overflow: "hidden",
          borderRadius: "2",
          width: "[100%]",
        })}
      >
        <Image
          src={thumbnailSrc}
          alt={title}
          width={300}
          height={200}
          className={css({
            width: "[100%]",
            transition: "transform",
            transitionTimingFunction: "ease-in-out",
            transitionDuration: "200ms",
            _groupHover: {
              transform: "scale(1.05)",
            },
          })}
        />
      </div>
      <h2
        className={cx(
          text({ textStyle: "headingSm" }),
          css({
            paddingBlockStart: "2",
            _groupHover: {
              textDecoration: "underline",
              textDecorationThickness: "1px",
            },
          })
        )}
      >
        {title}
      </h2>
      <p className={text({ textStyle: "body" })}>{subtitle}</p>
      <p className={text({ textStyle: "body" })}>{`${Intl.DateTimeFormat(
        "en-GB",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ).format(parsedDate)}`}</p>
      <p className={text({ textStyle: "body" })}>{author}</p>
    </Link>
  );
};
