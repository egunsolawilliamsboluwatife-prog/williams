import { styles, work } from "@/data/work";
import { FilmCard } from "@/components/FilmCard";

export function WorkSection() {
  return (
    <section className="block" id="work" data-chapter="work">
      <header className="section-head">
        <p className="kicker">03 — Work</p>
        <h2>
          The cuts, <em>by style.</em>
        </h2>
        <p className="lede">
          Placeholder case studies. Every title stays “Placeholder” until a real piece replaces it. No invented clients, counts, or quotes.
        </p>
      </header>
      <div className="work-groups">
        {styles.map((style, index) => (
          <div className="work-group" key={style}>
            <header>
              <p className="kicker">0{index + 1}</p>
              <h3>{style}</h3>
            </header>
            <div className="work-cards">
              {work
                .filter((item) => item.style === style)
                .map((item) => (
                  <FilmCard key={item.id} item={item} variant="case" />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
