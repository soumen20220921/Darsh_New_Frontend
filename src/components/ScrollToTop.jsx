// src/components/ScrollToTop.jsx
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";


function findScrollableContainer() {
  const selectors = [
    '[data-app-scroll]', 
    '.app-scroll',
    '#root',
    'main',
    'body'
  ];
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el && el.scrollHeight > el.clientHeight) return el;
  }
  return document.scrollingElement || document.documentElement || document.body;
}

export default function ScrollToTop({ behavior = "auto" }) {
  const location = useLocation();

  useLayoutEffect(() => {
    const container = findScrollableContainer();
    if (!container) return;

    // try scrollTo with behavior, fallback to setting scrollTop
    try {
      container.scrollTo?.({ top: 0, left: 0, behavior });
      // also ensure body/document are reset (covers weird layouts)
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } catch (err) {
      container.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, location.hash]);

  return null;
}
