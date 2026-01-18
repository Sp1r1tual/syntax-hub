import { useEffect } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { useThemeStore } from "@/store/theme/useThemeStore";

import { CodeBlock } from "./CodeBlock";

import { MarkdownImage } from "./MarkdownImage";

import styles from "./styles/TextBlock.module.css";

interface ITextBlockProps {
  content: string;
}

export const TextBlock = ({ content }: ITextBlockProps) => {
  const { isDarkTheme } = useThemeStore();

  useEffect(() => {
    const existing = document.querySelectorAll("link[data-highlight-theme]");
    existing.forEach((l) => l.remove());

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.setAttribute("data-highlight-theme", "true");
    link.href = isDarkTheme
      ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
      : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css";

    document.head.appendChild(link);

    return () => link.remove();
  }, [isDarkTheme]);

  const components: Components = {
    table: (props) => (
      <div className={styles.tableWrapper}>
        <table {...props} />
      </div>
    ),

    img: ({ src, alt }) => <MarkdownImage src={src} alt={alt} />,

    code: ({ className, children, ...props }) => {
      const codeString = String(children).replace(/\n$/, "");
      const match = /language-([^\s]+)/.exec(className ?? "");
      const language = match?.[1];

      const isInline = !className || !className.includes("language-");

      if (isInline) {
        return (
          <code className={className} {...props}>
            {codeString}
          </code>
        );
      }

      return <CodeBlock language={language} code={codeString} />;
    },
  };

  return (
    <div className={styles.textBlock}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
