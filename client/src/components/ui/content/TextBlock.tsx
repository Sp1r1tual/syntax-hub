import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { HTMLAttributes } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import { useThemeStore } from "@/store/theme/useThemeStore";

import { CopyButton } from "../buttons/CopyButton";
import { MarkdownImage } from "./MarkdownImage";

import styles from "./styles/TextBlock.module.css";

interface ITextBlockProps {
  content: string;
}

export const TextBlock = ({ content }: ITextBlockProps) => {
  const { isDarkTheme } = useThemeStore();

  const components: Components = {
    table: ({ ...props }) => (
      <div className={styles.tableWrapper}>
        <table {...props} />
      </div>
    ),
    img: ({ src, alt }) => <MarkdownImage src={src} alt={alt} />,
    code: ({ className, children, ...props }: HTMLAttributes<HTMLElement>) => {
      const inline = !className?.startsWith("language-");
      const codeString = String(children).replace(/\n$/, "");
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";

      if (inline) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      return (
        <div className={styles.codeBlockWrapper}>
          <div className={styles.codeHeader}>
            {language && (
              <span className={styles.languageLabel}>{language}</span>
            )}
            <CopyButton text={codeString} />
          </div>
          <SyntaxHighlighter
            language={language || "text"}
            style={isDarkTheme ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.95rem",
            }}
            codeTagProps={{
              style: {
                fontFamily: "inherit",
              },
            }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      );
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
