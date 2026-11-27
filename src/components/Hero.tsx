export function Hero() {
  return (
    <section className="hero" id="hero" data-chapter="hero">
      <p className="hero-word" aria-hidden="true">
        <span>Hold</span>
      </p>
      <div className="hero-scrim" />
      <div className="hero-copy">
        <p className="kicker">Williams · Lagos · YouTube editor</p>
        <h1>
          Edits that
          <br />
          <em>hold attention.</em>
        </h1>
        <p className="lede">
          Documentary, map, business explainer, biography, and motion-graphics edits. Cut in Lagos.
        </p>
        <div className="hero-actions">
          <a className="btn solid" href="#showreel">
            Play the reel
          </a>
          <a className="btn" href="#scope">
            Build a cut
          </a>
        </div>
        <ul className="disciplines">
          <li>Documentary</li>
          <li>Maps</li>
          <li>Explainers</li>
          <li>Biography</li>
          <li>Motion</li>
        </ul>
      </div>
      <p className="scroll-hint" aria-hidden="true">
        <span />
        Scroll
      </p>
    </section>
  );
}
