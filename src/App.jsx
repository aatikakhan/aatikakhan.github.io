import { useState, useRef } from 'react'
import { motion as Motion } from 'framer-motion'
import {
  navigation,
  hero,
  about,
  principles,
  specialties,
  experiences,
  projects,
  skills,
  volunteering,
  contact,
} from './content'
import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiTwitter,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
} from 'react-icons/fi'
import './App.css'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
}

const surfaceMotion = {
  whileHover: { y: -6, scale: 1.01 },
  transition: { type: 'spring', stiffness: 220, damping: 18 },
}

const SectionTitle = ({ kicker, title, description, align = 'left' }) => (
  <Motion.header className={`section-title section-title--${align}`} variants={fadeUp}>
    {kicker ? <span className="section-kicker">{kicker}</span> : null}
    <div className="section-title__heading">
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  </Motion.header>
)

const Pill = ({ children }) => <span className="pill">{children}</span>

function App() {
  const [expandedExperience, setExpandedExperience] = useState(null)
  const projectsTrackRef = useRef(null)

  const scrollProjects = (direction) => {
    if (!projectsTrackRef.current) return
    const container = projectsTrackRef.current
    const scrollAmount = container.clientWidth * 0.8 * direction
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const contactLinks = [
    {
      href: `mailto:${contact.email}`,
      label: 'Email',
      Icon: FiMail,
      external: false,
    },
    {
      href: contact.linkedin,
      label: 'LinkedIn',
      Icon: FiLinkedin,
      external: true,
    },
    {
      href: contact.github,
      label: 'GitHub',
      Icon: FiGithub,
      external: true,
    },
    {
      href: contact.twitter,
      label: 'Twitter',
      Icon: FiTwitter,
      external: true,
    },
  ]

  return (
    <div className="app-shell">
      <Motion.header
        className="top-nav"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <a className="brand" href="#hero">
          <span className="brand-name">Aatika Khan</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </Motion.header>

      <main>
        <section id="hero" className="section hero">
          <div className="hero__layout">
            <Motion.div
              className="hero__intro"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <Motion.span className="hero__eyebrow" variants={fadeUp}>
                Product-first · Mobile · UX
              </Motion.span>
              <Motion.h1 variants={fadeUp}>
                {hero.name}
                <span>{hero.title}</span>
              </Motion.h1>
              <Motion.p className="hero__statement" variants={fadeUp}>
                {hero.statement}
              </Motion.p>
              <Motion.div className="hero__actions" variants={fadeUp}>
                <a className="button button--primary" href={contact.resume} download="Aatika-Khan-Resume.pdf">
                  <FiDownload aria-hidden="true" /> Download résumé
                </a>
                <a className="button button--ghost" href="https://cal.com/aatikakhan/discovery" target="_blank" rel="noreferrer">
                  <FiArrowUpRight aria-hidden="true" /> Book a discovery call
                </a>
              </Motion.div>
              <Motion.div className="hero__insights" variants={fadeUp}>
                <Motion.div className="hero__highlights" variants={stagger}>
                  {hero.highlights.map((item) => (
                    <Motion.div key={item.label} className="hero-highlight" variants={fadeUp}>
                      <span className="hero-highlight__label">{item.label}</span>
                      <span className="hero-highlight__title">{item.value}</span>
                      {item.description ? <p className="hero-highlight__caption">{item.description}</p> : null}
                    </Motion.div>
                  ))}
                </Motion.div>
                <div className="hero__signals">
                  <div className="hero__signal">
                    <span className="hero__signal-label">Currently</span>
                    <p>Co-driving Treasure Fox marketplace scale-up with weekly product diaries and shipped Flutter releases.</p>
                  </div>
                  <div className="hero__signal hero__signal--availability">
                    <span className="hero__signal-label">Availability</span>
                    <p>Opening one new product partnership for Q1 2026 · Remote-friendly and async-first.</p>
                  </div>
                </div>
              </Motion.div>
            </Motion.div>
          </div>
        </section>

        <section id="approach" className="section section--accent">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <SectionTitle
              kicker="Working model"
              title="How an engagement moves from idea to live release"
              description={about.tagline}
            />
            <div className="about__grid">
              <Motion.div className="about__story" variants={fadeUp}>
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Motion.div>
              <Motion.div className="about__outline" variants={fadeUp}>
                <span className="about__outline-label">Engagement rituals</span>
                <ul>
                  <li>Kickoff briefs link user jobs, constraints, and success signals into one narrative.</li>
                  <li>Weekly Loom walkthroughs and async notes tie design choices to telemetry and code.</li>
                  <li>Launch checklists cover analytics dashboards, QA automation, and support follow-ups.</li>
                </ul>
              </Motion.div>
            </div>
          </Motion.div>
        </section>

        <section id="principles" className="section">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <SectionTitle
              kicker="Operating principles"
              title="Guardrails that keep momentum honest"
              description="These are the habits I rely on across marketplaces, mobility products, and AI-powered assistants."
            />
            <div className="principles-grid">
              {principles.map((principle) => (
                <Motion.article
                  key={principle.title}
                  className="principle-card"
                  variants={fadeUp}
                  whileHover={surfaceMotion.whileHover}
                  transition={surfaceMotion.transition}
                >
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                  <ul className="principle-signals">
                    {principle.signals.map((signal) => (
                      <li key={signal}>{signal}</li>
                    ))}
                  </ul>
                </Motion.article>
              ))}
            </div>
          </Motion.div>
        </section>

        <section id="expertise" className="section">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <SectionTitle
              kicker="Focus areas"
              title="Where I spend the most time inside your product"
              description="The mix of strategy, design, and engineering work I cycle through each week."
            />
            <div className="specialties-grid">
              {specialties.map((item) => (
                <Motion.article
                  key={item.title}
                  className="specialty-card"
                  variants={fadeUp}
                  whileHover={surfaceMotion.whileHover}
                  transition={surfaceMotion.transition}
                >
                  <h3>{item.title}</h3>
                  <p>{item.blurb}</p>
                  <div className="specialty-deliverables">
                    {item.deliverables.map((deliverable) => (
                      <Pill key={deliverable}>{deliverable}</Pill>
                    ))}
                  </div>
                </Motion.article>
              ))}
            </div>
          </Motion.div>
        </section>

        <section id="experience" className="section section--accent">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <SectionTitle
              kicker="Experience"
              title="Trusted by global teams to ship critical software products"
            />
            <div className="experience-timeline" role="list">
              {experiences.map((item, index) => {
                const isExpanded = expandedExperience === index
                const summaryText = isExpanded
                  ? item.summary
                  : `${item.summary.slice(0, 160)}${item.summary.length > 160 ? '…' : ''}`

                return (
                  <Motion.div
                    key={`${item.role}-${item.company}`}
                    className={`experience-item ${isExpanded ? 'is-expanded' : ''}`}
                    variants={fadeUp}
                    role="listitem"
                  >
                    <button
                      type="button"
                      className="experience-toggle"
                      onClick={() => setExpandedExperience(isExpanded ? null : index)}
                    >
                      <div className="experience-header">
                        <div className="experience-header__title">
                          <span className="experience-role">{item.role}</span>
                          {item.link ? (
                            <a href={item.link} className="experience-company" target="_blank" rel="noreferrer">
                              {item.company}
                            </a>
                          ) : (
                            <span className="experience-company">{item.company}</span>
                          )}
                        </div>
                        <div className="experience-header__meta">
                          <span className="experience-period">{item.period}</span>
                          <FiChevronDown className={`experience-chevron ${isExpanded ? 'is-open' : ''}`} aria-hidden="true" />
                        </div>
                      </div>
                      <p className={`experience-summary ${isExpanded ? 'is-open' : ''}`}>{summaryText}</p>
                      <div className="experience-tech">
                        {item.tech.map((tech) => (
                          <Pill key={tech}>{tech}</Pill>
                        ))}
                      </div>
                    </button>
                    {isExpanded ? (
                      <div className="experience-details">
                        <ul>
                          {item.contributions.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </Motion.div>
                )
              })}
            </div>
          </Motion.div>
        </section>

        <section id="projects" className="section">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <SectionTitle
              kicker="Projects"
              title="Curated projects illustrating principles or having trials"
              description="Crafting resilient Flutter products that align UX research, engineering quality, and measurable growth."
            />
            <div className="projects-scroll">
              <button
                type="button"
                className="projects-nav projects-nav--prev"
                onClick={() => scrollProjects(-1)}
                aria-label="Scroll projects left"
              >
                <FiChevronLeft aria-hidden="true" />
              </button>
              <div className="projects-track" ref={projectsTrackRef} role="list">
                {projects.map((project) => (
                  <Motion.article
                    key={project.name}
                    className="project-card"
                    variants={fadeUp}
                    transition={surfaceMotion.transition}
                    whileHover={surfaceMotion.whileHover}
                    role="listitem"
                  >
                    {project.url ? (
                      <a
                        href={project.url}
                        className="project-heading"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <h3>{project.name}</h3>
                        <FiArrowUpRight aria-hidden="true" />
                      </a>
                    ) : (
                      <div className="project-heading">
                        <h3>{project.name}</h3>
                        <FiArrowUpRight aria-hidden="true" />
                      </div>
                    )}
                    <p>{project.description}</p>
                    <p className="project-impact">{project.impact}</p>
                    <div className="project-stack">
                      {project.stack.map((item) => (
                        <Pill key={item}>{item}</Pill>
                      ))}
                    </div>
                  </Motion.article>
                ))}
              </div>
              <button
                type="button"
                className="projects-nav projects-nav--next"
                onClick={() => scrollProjects(1)}
                aria-label="Scroll projects right"
              >
                <FiChevronRight aria-hidden="true" />
              </button>
            </div>
          </Motion.div>
        </section>

        <section className="section" aria-labelledby="skills-heading">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <SectionTitle
              kicker="Toolbox"
              title="Platforms, SDKs, and playbooks I deploy"
              description="From mobile UI polish to backend resilience, I bring a full-stack toolkit tuned for speed and quality."
            />
            <dl className="skills-grid">
              {skills.map((group) => (
                <div key={group.category} className="skills-group">
                  <dt>{group.category}</dt>
                  <dd>
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Motion.div>
        </section>

        <section id="community" className="section section--accent">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <SectionTitle
              kicker="Community"
              title="Giving back to the ecosystems that fuel my craft"
            />
            <div className="community-layout">
              <div className="volunteering">
                <h3>Leadership & volunteering</h3>
                <ul>
                  {volunteering.map((item) => (
                    <li key={item.org}>
                      <div>
                        <span className="volunteering-role">{item.role}</span>
                        <span className="volunteering-org">{item.org}</span>
                      </div>
                      <span className="volunteering-period">{item.period}</span>
                      <p>{item.summary}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Motion.div>
        </section>

        <section id="contact" className="section contact-section">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <SectionTitle
              kicker="Let’s build"
              title="Ready for your next product sprint?"
              description="I consult with founders, product leaders, and agencies across time zones. Book a strategy session to explore how we can accelerate your roadmap."
              align="center"
            />
            <Motion.div className="contact-card" variants={fadeUp} whileHover={surfaceMotion.whileHover} transition={surfaceMotion.transition}>
              <div className="contact-details">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="contact-link"
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    download={link.download}
                  >
                    <link.Icon aria-hidden="true" />
                    {link.label}
                    <FiArrowUpRight aria-hidden="true" />
                  </a>
                ))}
      </div>
              <p className="contact-note">{contact.note}</p>
            </Motion.div>
          </Motion.div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Aatika Khan. Available for global consulting engagements.</span>
      </footer>
      </div>
  )
}

export default App
