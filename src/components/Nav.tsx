"use client";

import { useEffect, useState } from "react";
import { CHAPTERS } from "@/lib/chapters";
import { lenisRef, scrollToId } from "@/lib/state";

export function Nav({ chapter }: { chapter: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;
      const id = href.slice(1);
      if (!id || !document.getElementById(id)) return;
      event.preventDefault();
      setOpen(false);
      scrollToId(id);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    lenisRef.current?.stop();
    return () => {
      lenisRef.current?.start();
    };
  }, [open]);

  return (
    <>
      <div className="topbar">
        <a className="wordmark" href="#hero">
          <i />
          The Cut Room
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="chapter-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Index"}
        </button>
      </div>
      <nav className="rail" aria-label="Chapters">
        {CHAPTERS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={chapter === item.id ? "is-active" : undefined}
            aria-current={chapter === item.id ? "true" : undefined}
          >
            <span>
              {item.index} {item.label}
            </span>
            <i />
          </a>
        ))}
      </nav>
      {open ? (
        <div className="menu" id="chapter-menu" role="dialog" aria-label="Chapters">
          <ol>
            {CHAPTERS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} aria-current={chapter === item.id ? "true" : undefined}>
                  <span>{item.index}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </>
  );
}
