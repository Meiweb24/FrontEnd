export default function Hero() {
  return (
    <section className="hero" aria-label="Featured promotion">
      <div className="container hero__grid">
        <article className="hero__main">
          <p className="eyebrow">Special offers for high-performance setups</p>
          <h1>Upgrade Your Desk With Precision Tech</h1>
          <p>
            Discover premium keyboards, low-latency mice, immersive headsets, and
            displays engineered for creators and gamers.
          </p>
          <div className="hero__actions">
            <a href="#products" className="btn btn--primary btn--lg">
              Shop Now
            </a>
            <a href="#deals" className="btn btn--secondary btn--lg">
              View Deals
            </a>
          </div>
        </article>
        <aside className="hero__spotlight">
          <span className="hero__badge">Black Friday Early Access</span>
          <h2>Save up to 40%</h2>
          <p>Tech Hub drops new bundles every week with priority stock alerts.</p>
        </aside>
      </div>
    </section>
  )
}
