import { useState, useRef } from "react";

interface IImageItem {
  id: string;
  file: File;
  preview: string;
  name: string;
}

const MAX_TEXTAREA_HEIGHT = 300;
const MAX_IMAGES = 2;

export const useCommentInput = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState<IImageItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const codeBlockStartRef = useRef<number | null>(null);
  const dragCounterRef = useRef(0);

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const height = Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT);
    textarea.style.height = `${height}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
  };

  const handleImageFiles = (files: File[] | FileList) => {
    const availableSlots = MAX_IMAGES - images.length;

    if (availableSlots <= 0) return;
    const validFiles = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, availableSlots);

    if (!validFiles.length) return;

    validFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            file,
            preview: event.target?.result as string,
            name: file.name,
          },
        ]);
      };

      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleImageFiles(event.target.files);
    }
    event.target.value = "";
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = event.clipboardData.items;
    const imageFiles: File[] = [];

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        event.preventDefault();

        const file = item.getAsFile();

        if (file) imageFiles.push(file);
      }
    }

    if (imageFiles.length) handleImageFiles(imageFiles);
  };

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    dragCounterRef.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    dragCounterRef.current -= 1;

    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();

    dragCounterRef.current = 0;
    setIsDragging(false);

    if (event.dataTransfer.files.length) {
      handleImageFiles(event.dataTransfer.files);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCodeClick = () => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const cursor = textarea.selectionStart;

    const before = text.slice(0, cursor);
    const after = text.slice(cursor);

    const prefix = before.trim() ? "\n\n" : "";
    const suffix = after.trim() ? "\n" : "";

    const insert = `${prefix}\`\`\`\n\n\`\`\`${suffix}`;
    const newText = before + insert + after;

    const newCursor = before.length + prefix.length + 4;

    setText(newText);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursor, newCursor);
      autoResizeTextarea();

      const lineHeight = parseInt(
        getComputedStyle(textarea).lineHeight || "20",
      );
      const cursorRow = textarea.value.substr(0, newCursor).split("\n").length;
      const scrollPos = lineHeight * cursorRow - textarea.clientHeight / 2;

      textarea.scrollTop = scrollPos > 0 ? scrollPos : 0;
    });
  };

  const resetInput = () => {
    setText("");
    setImages([]);
    codeBlockStartRef.current = null;

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.overflowY = "hidden";
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    text,
    autoResizeTextarea,
    setText,
    images,
    isDragging,
    textareaRef,
    fileInputRef,
    removeImage,
    handleImageClick,
    handleFileChange,
    handlePaste,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleCodeClick,
    resetInput,
  };
};
