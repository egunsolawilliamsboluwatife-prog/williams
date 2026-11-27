"use client";

import type { WorkItem } from "@/data/work";
import { useExperience } from "@/components/player-context";

export function FilmCard({ item, variant }: { item: WorkItem; variant: "reel" | "case" }) {
  const { openId, open, close } = useExperience();
  const isOpen = openId === item.id;

  return (
    <div className={variant === "reel" ? "slot slot-reel" : "slot slot-case"}>
      <article
        className={`film-card${variant === "case" ? " case" : ""}${isOpen ? " is-open" : ""}`}
        data-film={item.id}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? true : undefined}
        aria-label={isOpen ? `${item.style} placeholder` : undefined}
      >
        <div className="poster-wrap">
          <div className="poster" style={{ backgroundImage: `url("${item.poster}")` }} />
          <video src={item.src} poster={item.poster} playsInline preload="none" controls={isOpen} muted />
          <span className="play-mark">Play</span>
          <div className="meta">
            <span>{item.style}</span>
            <strong>{item.title}</strong>
          </div>
          <button className="hit" type="button" onClick={() => open(item.id)} aria-label={`Play placeholder reel, ${item.style}`} />
        </div>
        {variant === "case" ? (
          <div className="case-copy">
            <p className="role">{item.role}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ) : null}
        <button className="close" type="button" onClick={close}>
          Close
        </button>
      </article>
    </div>
  );
}
