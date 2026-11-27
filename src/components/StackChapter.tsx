const LAYERS = ["Story", "Cut", "Motion", "Sound", "Color"];

export function StackChapter() {
  return (
    <section id="stack" data-chapter="stack">
      <div className="stack-sticky">
        <div className="stack-copy">
          <p className="kicker">05 — The edit stack</p>
          <h2>
            Five layers. <em>One picture.</em>
          </h2>
          <p className="lede">Story, cut, motion, sound, and color. Scroll and the stack opens so the build is visible.</p>
          <ol className="layers">
            {LAYERS.map((layer, index) => (
              <li key={layer} data-layer={index} className={index === 0 ? "is-active" : undefined}>
                <span>0{index + 1}</span>
                {layer}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
