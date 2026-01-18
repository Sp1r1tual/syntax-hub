import { useEffect, useRef } from "react";
import hljs from "highlight.js/lib/core";

import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import css from "highlight.js/lib/languages/css";
import sql from "highlight.js/lib/languages/sql";
import java from "highlight.js/lib/languages/java";

import { CopyButton } from "../buttons/CopyButton";

import styles from "./styles/CodeBlock.module.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("java", java);
hljs.registerLanguage("python", python);
hljs.registerLanguage("css", css);
hljs.registerLanguage("sql", sql);

interface ICodeBlockProps {
  language: string | undefined;
  code: string;
}

export const CodeBlock = ({ language, code }: ICodeBlockProps) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = codeRef.current;
    if (!el) return;

    el.removeAttribute("data-highlighted");
    el.textContent = code;
    el.className = language ? `language-${language}` : "";

    hljs.highlightElement(el);
  }, [code, language]);

  return (
    <div className={styles.codeBlockWrapper}>
      <div className={styles.codeHeader}>
        {language && <span className={styles.languageLabel}>{language}</span>}
        <CopyButton text={code} />
      </div>

      <pre className={styles.pre}>
        <code ref={codeRef} />
      </pre>
    </div>
  );
};
