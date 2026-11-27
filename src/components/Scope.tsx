"use client";

import { useEffect, useMemo, useState } from "react";
import { useExperience } from "@/components/player-context";

const TYPES = ["Documentary", "Map story", "Business explainer", "Biography", "Talking-head", "Shorts & motion"];
const LENGTHS = ["Under 5 min", "5–12 min", "12–25 min", "25 min+"];
const TURNS = ["5 days", "10 days", "3 weeks", "Flexible"];
const ADDONS = ["Motion graphics", "Maps", "Sound design", "Captions", "Color", "Thumbnail stills"];
const MAIL = "placeholder@thecutroom.local";

export function Scope() {
  const { chapter } = useExperience();
  const [type, setType] = useState<string | null>(null);
  const [length, setLength] = useState<string | null>(null);
  const [turnaround, setTurnaround] = useState<string | null>(null);
  const [addons, setAddons] = useState<string[]>([]);

  const started = Boolean(type || length || turnaround || addons.length);
  const showPill = started && chapter === "scope";

  useEffect(() => {
    document.body.classList.toggle("has-pill", showPill);
    return () => document.body.classList.remove("has-pill");
  }, [showPill]);

  const mailto = useMemo(() => {
    const body = [
      "Cut brief",
      "",
      `Type: ${type ?? "—"}`,
      `Length: ${length ?? "—"}`,
      `Turnaround: ${turnaround ?? "—"}`,
      `Add-ons: ${addons.length ? addons.join(", ") : "None"}`,
    ].join("\n");
    const params = new URLSearchParams({
      subject: "Cut brief — The Cut Room",
      body,
    });
    return `mailto:${MAIL}?${params.toString()}`;
  }, [addons, length, turnaround, type]);

  const scopeLine = [type, length, addons.length ? addons.join(" + ") : null].filter(Boolean).join(" · ");

  const toggle = (addon: string) => {
    setAddons((current) => (current.includes(addon) ? current.filter((item) => item !== addon) : [...current, addon]));
  };

  return (
    <section className="block scope" id="scope" data-chapter="scope">
      <header className="section-head">
        <p className="kicker">07 — Build your cut</p>
        <h2>
          Tell me the <em>shape</em> of the edit.
        </h2>
        <p className="lede">Type, length, turnaround, add-ons. The bar keeps the scope and the turnaround.</p>
      </header>
      <div className="scope-grid">
        <fieldset className="full">
          <legend>Video type</legend>
          <div className="choices">
            {TYPES.map((option) => (
              <button key={option} type="button" className="choice" aria-pressed={type === option} onClick={() => setType(option)}>
                {option}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Length</legend>
          <div className="choices">
            {LENGTHS.map((option) => (
              <button key={option} type="button" className="choice" aria-pressed={length === option} onClick={() => setLength(option)}>
                {option}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Turnaround</legend>
          <div className="choices">
            {TURNS.map((option) => (
              <button key={option} type="button" className="choice" aria-pressed={turnaround === option} onClick={() => setTurnaround(option)}>
                {option}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="full">
          <legend>Add-ons</legend>
          <div className="choices">
            {ADDONS.map((option) => (
              <button key={option} type="button" className="choice" aria-pressed={addons.includes(option)} onClick={() => toggle(option)}>
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="send">
        <div>
          <h3>Send the brief.</h3>
          <p>Placeholder inbox at {MAIL}. Swap the address before this goes live.</p>
        </div>
        <a className="btn solid" href={mailto}>
          Email this cut
        </a>
      </div>
      {showPill ? (
        <div className="pill" aria-live="polite">
          <p>
            <b>Scope</b>
            <span>{scopeLine || "Not set"}</span>
          </p>
          <p>
            <b>Turnaround</b>
            <span>{turnaround ?? "Not set"}</span>
          </p>
        </div>
      ) : null}
    </section>
  );
}
