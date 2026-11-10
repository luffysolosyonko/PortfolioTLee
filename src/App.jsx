import { useEffect, useRef, useState } from "react";
import { portfolio } from "./content";

const VERSION_RE = /\d+(\.\d+)+/;

function versionOf(p) {
  return (p.name && p.name.match(VERSION_RE)?.[0]) || "";
}

// Compare "1.10" vs "1.2" part by part, newest first.
function compareVersionsDesc(a, b) {
  const pa = versionOf(a).split(".").map(Number);
  const pb = versionOf(b).split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i += 1) {
    const diff = (pb[i] || 0) - (pa[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function ProjectDetails({ page }) {
  return (
    <>
      {page.notes && <p className="project-notes">{page.notes}</p>}

      {page.screenshots && page.screenshots.length > 0 && (
        <div className={`project-screenshots${page.portraitScreenshots ? " portrait" : ""}`}>
          {page.screenshots.map((screenshot) => (
            <img
              key={screenshot}
              src={screenshot}
              alt={`${page.name} screenshot`}
              className="project-screenshot"
            />
          ))}
        </div>
      )}

      {page.stack && page.stack.length > 0 && (
        <div className="stack-list">
          {page.stack.map((item) => (
            <span key={item} className="stack-pill">
              {item}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

function SourceLink({ page }) {
  return page.link ? (
    <a className="project-link" href={page.link} target="_blank" rel="noreferrer">
      Source
    </a>
  ) : (
    <span className="project-link muted">{page.linkLabel || "Private project"}</span>
  );
}

function VersionedProjectCard({ project }) {
  const versions = [project, ...project.pages].sort(compareVersionsDesc);
  const [activeIndex, setActiveIndex] = useState(0);
  const page = versions[activeIndex];
  const title = project.name.replace(VERSION_RE, "").trim();

  return (
    <article className="project-card versioned-card">
      <div className="versioned-header">
        <h3>{title}</h3>
      </div>

      <div className="version-tabs" role="tablist">
        {versions.map((v, i) => {
          const label = versionOf(v) ? `v${versionOf(v)}` : `#${i + 1}`;
          return (
            <button
              key={v.name || i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              className={`version-tab${i === activeIndex ? " active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              {i === 0 ? `Latest (${label})` : label}
            </button>
          );
        })}
      </div>

      <div className="version-panel" role="tabpanel">
        <div className="project-top">
          <div>
            <h4 className="version-title">
              {versionOf(page) ? `Version ${versionOf(page)}` : page.name}
            </h4>
            {page.summary && <p className="project-summary">{page.summary}</p>}
          </div>
          <SourceLink page={page} />
        </div>
        <ProjectDetails page={page} />
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  if (project.pages && project.pages.length > 0) {
    return <VersionedProjectCard project={project} />;
  }

  return (
    <article className="project-card">
      <div className="project-top">
        <div>
          <h3>{project.name}</h3>
          {project.summary && <p className="project-summary">{project.summary}</p>}
        </div>
        <SourceLink page={project} />
      </div>
      <ProjectDetails page={project} />
    </article>
  );
}

function App() {
  const [lightsOn, setLightsOn] = useState(true);
  const [showAltPhoto, setShowAltPhoto] = useState(false);
  const pointerPosition = useRef({ x: 0, y: 0 });

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
      pointerPosition.current = { x: event.clientX, y: event.clientY };
      schedule(event.clientX, event.clientY);
    };

    const handleTouch = (event) => {
      const touch = event.touches[0];
      if (touch) {
        pointerPosition.current = { x: touch.clientX, y: touch.clientY };
        schedule(touch.clientX, touch.clientY);
      }
    };

    const initialPosition = pointerPosition.current.x
      ? pointerPosition.current
      : { x: window.innerWidth * 0.5, y: window.innerHeight * 0.24 };
    setSpotlightPosition(initialPosition.x, initialPosition.y);
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
          onPointerDown={(event) => {
            pointerPosition.current = { x: event.clientX, y: event.clientY };
            document.documentElement.style.setProperty("--spotlight-x", `${event.clientX}px`);
            document.documentElement.style.setProperty("--spotlight-y", `${event.clientY}px`);
          }}
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
            I'm a passionate software engineer who likes to do judo, make short films, and do
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
            <ProjectCard key={project.name} project={project} />
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
            <h4>Frameworks</h4>
            <div className="stack-grid">
              {portfolio.skills.frameworks.map((item) => (
                <span key={item} className="stack-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h4>Data & DevOps</h4>
            <div className="stack-grid">
              {portfolio.skills.dataDevOps.map((item) => (
                <span key={item} className="stack-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h4>AI & Robotics</h4>
            <div className="stack-grid">
              {portfolio.skills.aiRobotics.map((item) => (
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
