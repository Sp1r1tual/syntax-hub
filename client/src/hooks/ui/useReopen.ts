import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

interface IUseReopenModalOptions {
  storageKey: string;
  onReopen: () => void;
  excludePaths?: string[];
  delay?: number;
}

export const useReopen = ({
  storageKey,
  onReopen,
  excludePaths = [],
  delay = 150,
}: IUseReopenModalOptions) => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (excludePaths.includes(location.pathname)) {
      return;
    }

    const checkTimer = setTimeout(() => {
      const shouldReopen = sessionStorage.getItem(storageKey);

      if (shouldReopen === "true") {
        onReopen();
        sessionStorage.removeItem(storageKey);
      }
    }, delay);

    return () => clearTimeout(checkTimer);
  }, [location.pathname, storageKey, onReopen, excludePaths, delay]);
};
