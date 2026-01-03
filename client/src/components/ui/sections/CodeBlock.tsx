import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import { useThemeStore } from "@/store/theme/useThemeStore";

import { CopyButton } from "../buttons/CopyButton";

import styles from "./styles/CodeBlock.module.css";

interface ICodeBlockProps {
  language: string;
  content: string;
}

export const CodeBlock = ({ language, content }: ICodeBlockProps) => {
  const normalizedLanguage = language.toLowerCase();
  const { isDarkTheme } = useThemeStore();

  const syntaxStyle = isDarkTheme ? oneDark : oneLight;

  return (
    <div className={styles.codeBlock}>
      <div className={styles.copyWrapper}>
        <CopyButton text={content} />
      </div>

      <SyntaxHighlighter
        language={normalizedLanguage}
        style={syntaxStyle}
        className={styles.code}
        codeTagProps={{ style: { fontFamily: "inherit" } }}
        customStyle={{
          margin: 0,
          lineHeight: "1.5",
        }}
        PreTag={({ children, ...props }) => (
          <pre {...props}>
            <div className={styles.codeToolbar}>
              <span className={styles.inlineLanguageLabel}>
                {normalizedLanguage.toUpperCase()}
              </span>
            </div>

            {children}
          </pre>
        )}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
};
