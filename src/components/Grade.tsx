"use client";

import { useState } from "react";

export function Grade() {
  const [value, setValue] = useState(58);
  const frames = Math.round((value / 100) * 240);
  const seconds = Math.floor(frames / 24);
  const frame = frames % 24;
  const label = `00:00:${seconds.toString().padStart(2, "0")}:${frame.toString().padStart(2, "0")}`;

  return (
    <section className="block" id="grade" data-chapter="grade">
      <header className="section-head">
        <p className="kicker">04 — Raw to master</p>
        <h2>
          Drag the <em>playhead.</em>
        </h2>
        <p className="lede">
          Placeholder frames. Left of the red line is a grade pass, right is the flat raw. Arrow keys move it once the line is focused.
        </p>
      </header>
      <div className="grade-frame">
        <img src="/work/raw.jpg" alt="Placeholder raw frame, flat and ungraded" />
        <img className="graded" src="/work/graded.jpg" alt="Placeholder graded frame" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }} />
        <div className="grade-tags">
          <span>Graded {value}</span>
          <span>Raw {100 - value}</span>
        </div>
        <div className="playhead" style={{ left: `${value}%` }}>
          <span>{label}</span>
        </div>
        <input
          className="grade-range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          aria-label="Wipe between graded and raw. Left of the playhead is graded."
          aria-valuetext={`${value} percent graded, ${100 - value} percent raw`}
          onChange={(event) => setValue(Number(event.target.value))}
        />
      </div>
    </section>
  );
}
