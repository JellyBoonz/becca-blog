import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-serif text-dark-ink font-bold mt-12 mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-serif text-dark-ink font-bold mt-10 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-serif text-dark-ink font-semibold mt-8 mb-3 leading-tight">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-lg font-body text-dark-ink/90 mb-6 leading-relaxed">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-botanical-green hover:text-sepia underline transition-colors"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-2 font-body text-dark-ink/90">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 font-body text-dark-ink/90">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-sepia pl-6 py-2 my-6 italic text-dark-ink/80 font-body text-lg">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-charcoal/10 text-dark-ink px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-charcoal/10 rounded-lg p-4 overflow-x-auto mb-6">
        {children}
      </pre>
    ),
    hr: () => (
      <hr className="border-0 border-t border-sepia/30 my-8" />
    ),
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt}
        className="rounded-lg my-8 w-full h-auto shadow-lg"
      />
    ),
    ...components,
  };
}

