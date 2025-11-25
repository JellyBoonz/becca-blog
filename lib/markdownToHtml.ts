import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export async function markdownToHtml(
  markdown: string
): Promise<MDXRemoteSerializeResult> {
  const mdxSource = await serialize(markdown, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  return mdxSource;
}

