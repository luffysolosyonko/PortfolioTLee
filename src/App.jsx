import { useEffect, useState } from "react";
import { portfolio } from "./content";

function App() {
  const [lightsOn, setLightsOn] = useState(true);
  const [showAltPhoto, setShowAltPhoto] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("lights-on-body", lightsOn);
    document.body.classList.toggle("lights-off-body", !lightsOn);

    return () => {
      document.body.classList.remove("lights-on-body");
      document.body.classList.remove("lights-off-body");
    };
  }, [lightsOn]);

  useEffect(() => {
    let frameId = 0;
    let nextX = window.innerWidth * 0.5;
    let nextY = window.innerHeight * 0.24;

    const setSpotlightPosition = (x, y) => {
      const root = document.documentElement;
      root.style.setProperty("--spotlight-x", `${x}px`);
      root.style.setProperty("--spotlight-y", `${y}px`);
    };

    const flush = () => {
      frameId = 0;
      setSpotlightPosition(nextX, nextY);
    };

    const schedule = (x, y) => {
      nextX = x;
      nextY = y;
      if (lightsOn || !frameId) {
        if (lightsOn) return;
        frameId = window.requestAnimationFrame(flush);
      }
    };

    const handleMove = (event) => {
      schedule(event.clientX, event.clientY);
    };

    const handleTouch = (event) => {
      const touch = event.touches[0];
      if (touch) {
        schedule(touch.clientX, touch.clientY);
      }
    };

    setSpotlightPosition(window.innerWidth * 0.5, window.innerHeight * 0.24);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, [lightsOn]);

  return (
    <main className={`page ${lightsOn ? "lights-on" : "lights-off"}`}>
      <div className="mode-switch-wrap">
        <button
          type="button"
          className={`mode-switch ${lightsOn ? "is-on" : "is-off"}`}
          onClick={() => setLightsOn((value) => !value)}
          aria-pressed={lightsOn}
        >
          <span className="mode-switch-track">
            <span className="mode-switch-thumb" />
          </span>
          <span className="mode-switch-label">{lightsOn ? "Lights On" : "Lights Off"}</span>
        </button>
      </div>
      {!lightsOn ? <div className="spotlight" aria-hidden="true" /> : null}

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio</p>
          <h1>{portfolio.name}</h1>
          <p className="hero-title">{portfolio.title}</p>
          <p className="hero-meta">
            {portfolio.location}
            <span className="dot">|</span>
            <a href={portfolio.email.startsWith("mailto:") ? portfolio.email : `mailto:${portfolio.email}`}>
              {portfolio.email}
            </a>
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Projects
            </a>
            <a className="button button-secondary" href="#experience">
              Work Experience
            </a>
          </div>
        </div>

        <div className="hero-image-wrap">
          <button
            type="button"
            className="hero-image-button"
            onClick={() => setShowAltPhoto((value) => !value)}
            aria-label="Toggle profile photo"
          >
            <img
              className={`hero-image hero-image-primary${showAltPhoto ? " is-hidden" : ""}`}
              src={portfolio.headshot}
              alt="Thomas Lee headshot"
            />
            <img
              className={`hero-image hero-image-secondary${showAltPhoto ? " is-visible" : ""}`}
              src="/thomas-lee-alt.jpg"
              alt="Thomas Lee alternate headshot"
            />
          </button>
        </div>
      </section>

      <section className="section two-column">
        <div>
          <p className="section-label">About</p>
          <h2>
            I'm a passionate software engineer, who likes to do judo, make short films, and do
            photography and editing in my free time. I love using technology to expand upon my
            creative and technical capabilities.
          </h2>
        </div>
        <div className="info-card education-card">
          <h3>Education</h3>
          <div className="education-list">
            {portfolio.education.map((item) => (
              <div key={item.school} className="education-item">
                <div className="education-header">
                  <img className="education-logo" src={item.logo} alt={`${item.school} logo`} />
                  <div className="education-text">
                    <p className="education-school">{item.school}</p>
                    <p className="education-date">{item.period}</p>
                    <p className="education-degree">{item.degree}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="link-row">
            <a href={portfolio.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={portfolio.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="section-heading">
          <div>
            <h2>Work Experience</h2>
          </div>
        </div>

        <div className="experience-list">
          {portfolio.experience.map((item) => (
            <article key={`${item.role}-${item.company}`} className="experience-card">
              <div className="experience-top">
                <div>
                  <h3>{item.role}</h3>
                  <p className="experience-company">{item.company}</p>
                </div>
                <span className="experience-period">{item.period}</span>
              </div>

              <ul className="detail-list experience-details">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <div>
            <h2>Projects</h2>
          </div>
        </div>

        <div className="project-list">
          {portfolio.projects.map((project) => (
            <article key={project.name} className="project-card">
              <div className="project-top">
                <div>
                  <h3>{project.name}</h3>
                  <p className="project-summary">{project.summary}</p>
                </div>
                {project.link ? (
                  <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                    Source
                  </a>
                ) : (
                  <span className="project-link muted">{project.linkLabel || "Private project"}</span>
                )}
              </div>

              <p className="project-notes">{project.notes}</p>

              {project.screenshots && project.screenshots.length > 0 && (
                <div className="project-screenshots">
                  {project.screenshots.map((screenshot) => (
                    <img
                      key={screenshot}
                      src={screenshot}
                      alt={`${project.name} screenshot`}
                      className="project-screenshot"
                    />
                  ))}
                </div>
              )}

              <div className="stack-list">
                {project.stack.map((item) => (
                  <span key={item} className="stack-pill">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section two-column">
        <div>
          <p className="section-label">Skills</p>
          <h2>Tools I use</h2>
        </div>
        <div className="skills-grid">
          <div className="skill-category">
            <h4>Languages</h4>
            <div className="stack-grid">
              {portfolio.skills.languages.map((item) => (
                <span key={item} className="stack-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h4>Web</h4>
            <div className="stack-grid">
              {portfolio.skills.web.map((item) => (
                <span key={item} className="stack-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h4>Tools & DevOps</h4>
            <div className="stack-grid">
              {portfolio.skills.toolsDevOps.map((item) => (
                <span key={item} className="stack-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h4>Specialized</h4>
            <div className="stack-grid">
              {portfolio.skills.specialized.map((item) => (
                <span key={item} className="stack-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section two-column">
        <div>
          <p className="section-label">Awards & Extracurriculars</p>
          <h2>Recognition and involvement</h2>
        </div>
        <div className="awards-layout">
          <div className="info-card">
            <h3>Awards</h3>
            <ul className="detail-list">
              {portfolio.awards.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="info-card">
            <h3>Extracurriculars</h3>
            <ul className="detail-list">
              {portfolio.extracurriculars.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </main>
  );
}

export default App;
