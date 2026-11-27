const LETTERS = "WILLIAMS".split("");

export function Finale() {
  return (
    <section id="finale" data-chapter="finale">
      <div className="finale-inner">
        <p className="kicker">End of reel</p>
        <h2 className="credits" aria-label="Williams">
          {LETTERS.map((letter, index) => (
            <span className="mask" key={`${letter}-${index}`} aria-hidden="true">
              <span className="glyph">{letter}</span>
            </span>
          ))}
        </h2>
        <p className="finale-sub">Cut in Lagos</p>
        <div className="finale-rule" aria-hidden="true" />
        <p className="finale-note">The Cut Room</p>
      </div>
    </section>
  );
}
