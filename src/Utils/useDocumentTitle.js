import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} | Real Color SRL`;
  }, [title]);
}