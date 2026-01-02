import { useState } from "react";
import styles from "./styles/CopyButton.module.css";

interface CopyButtonProps {
  text: string;
}

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className={`${styles.copyButton} ${
        copied ? styles.copied : styles.notCopied
      }`}
      onClick={handleCopy}
      aria-label="Copy code"
    />
  );
};
