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
          Open a card and it expands into the player. The picture is a placeholder reel until the masters are online.
        </p>
      </header>
      <div className="theater">
        <div className="theater-bar">
          <span>Screen 01</span>
          <span>Placeholder picture</span>
          <span>24 fps</span>
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
