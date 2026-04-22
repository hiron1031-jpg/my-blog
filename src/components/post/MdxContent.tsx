import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { JSX } from "react";
import AmazonLink from "./AmazonLink";
import CalloutBox from "./CalloutBox";
import SchoolCard from "./SchoolCard";

const components = {
  h2: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h2
      id={id}
      className="text-2xl font-bold text-heading mt-10 mb-4 border-l-4 border-primary pl-3"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h3
      id={id}
      className="text-xl font-bold text-primary-dark mt-8 mb-3 border-l-4 border-accent pl-3"
    >
      {children}
    </h3>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-accent bg-surface px-4 py-3 my-6 rounded-r-lg text-secondary italic">
      {children}
    </blockquote>
  ),
  a: ({
    href,
    children,
    className,
    ...rest
  }: {
    href?: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    const isHeadingAnchor = className?.includes("heading-anchor");
    return (
      <a
        href={href}
        className={
          isHeadingAnchor
            ? "ml-2 text-secondary/40 no-underline hover:text-primary text-sm font-normal"
            : "text-blue-600 underline underline-offset-2 hover:text-blue-800"
        }
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      className="block mx-auto my-8 max-w-full md:max-w-lg w-auto h-auto rounded-xl"
      loading="lazy"
    />
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="bg-primary/10 text-heading font-semibold px-4 py-2 border border-border text-left">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-2 border border-border text-secondary">{children}</td>
  ),
  AmazonLink,
  CalloutBox,
  SchoolCard,
};

interface MdxContentProps {
  content: string;
}

export default function MdxContent({ content }: MdxContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote
        source={content}
        components={components as Record<string, (props: JSX.IntrinsicElements[keyof JSX.IntrinsicElements]) => JSX.Element>}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "append",
                  properties: {
                    className: ["heading-anchor"],
                    ariaLabel: "このセクションへのリンク",
                  },
                  content: {
                    type: "text",
                    value: " #",
                  },
                },
              ],
              [rehypePrettyCode, { theme: "github-light" }],
            ],
          },
        }}
      />
    </div>
  );
}
