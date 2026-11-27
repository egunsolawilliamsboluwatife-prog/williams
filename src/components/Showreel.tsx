import { featured } from "@/data/work";
import { FilmCard } from "@/components/FilmCard";

export function Showreel() {
  return (
    <section className="block" id="showreel" data-chapter="showreel">
      <header className="section-head">
        <p className="kicker">02 — Showreel</p>
        <h2>
          A theater, <em>not a tab.</em>
        </h2>
        <p className="lede">
          Three spec cuts. The Drift plays first. Open any card to switch the picture.
        </p>
      </header>
      <div className="theater">
        <div className="theater-bar">
          <span>Spec cuts</span>
          <span>The Drift · 45s</span>
          <span>1080p</span>
        </div>
        <div className="reel-row">
          {featured.map((item) => (
            <FilmCard key={item.id} item={item} variant="reel" />
          ))}
        </div>
      </div>
    </section>
  );
}
