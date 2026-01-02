import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CopyButton } from "../buttons/CopyButton";

import styles from "./styles/CodeBlock.module.css";

interface CodeBlockProps {
  language: string;
  content: string;
}

export const CodeBlock = ({ language, content }: CodeBlockProps) => {
  const normalizedLanguage = language.toLowerCase();

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span className={styles.language}>{normalizedLanguage}</span>
        <CopyButton text={content} />
      </div>

      <SyntaxHighlighter
        language={normalizedLanguage}
        style={oneDark}
        className={styles.code}
        codeTagProps={{ style: { fontFamily: "inherit" } }}
        customStyle={{ margin: 0, lineHeight: "1.5" }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
};
