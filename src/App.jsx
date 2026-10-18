import { useState, useRef, useEffect } from 'react'
import Journal from './Journal'
import { motion as Motion } from 'framer-motion'
import {
  navigation,
  hero,
  about,
  specialties,
  experiences,
  projects,
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
  FiMoon,
  FiSun,
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

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const root = window.document.documentElement
  const stored = window.localStorage.getItem('aatika-theme')
  if (stored === 'light' || stored === 'dark') {
    root.dataset.theme = stored
    return stored
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const initial = prefersDark ? 'dark' : 'light'
  root.dataset.theme = initial
  return initial
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
  const [theme, setTheme] = useState(getInitialTheme)
  const [isManual, setIsManual] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    const stored = window.localStorage.getItem('aatika-theme')
    return stored === 'light' || stored === 'dark'
  })
  const [expandedExperience, setExpandedExperience] = useState(null)
  const [hash, setHash] = useState(() => (typeof window === 'undefined' ? '' : window.location.hash))
  const [showAllExperiences, setShowAllExperiences] = useState(false)
  const projectsTrackRef = useRef(null)

  const scrollProjects = (direction) => {
    if (!projectsTrackRef.current) return
    const container = projectsTrackRef.current
    const scrollAmount = container.clientWidth * 0.8 * direction
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const syncHash = () => setHash(window.location.hash || '')
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!hash || hash === '#home' || hash === '#blog' || hash.startsWith('#blog/')) {
      window.scrollTo(0, 0)
      return
    }
    const id = hash.slice(1)
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [hash])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const root = window.document.documentElement
    root.dataset.theme = theme

    if (isManual) {
      window.localStorage.setItem('aatika-theme', theme)
    } else {
      window.localStorage.removeItem('aatika-theme')
    }
  }, [theme, isManual])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event) => {
      if (!isManual) {
        setTheme(event.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [isManual])

  const toggleTheme = () => {
    setIsManual(true)
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const toggleExperienceLength = () => {
    setShowAllExperiences((prev) => {
      const next = !prev
      if (!next && expandedExperience !== null && expandedExperience >= 2) {
        setExpandedExperience(null)
      }
      return next
    })
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

  const page = hash === '#blog' || hash.startsWith('#blog/') ? 'blog' : 'home'

  return (
    <div className="app-shell">
      <Motion.header
        className="top-nav"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav className="nav-links" aria-label="Primary navigation">
          {navigation.map((item) => {
            const current = item.href === '#home'
              ? hash === '' || hash === '#home'
              : item.href === '#blog'
                ? hash === '#blog' || hash.startsWith('#blog/')
                : hash === item.href
            return (
              <a key={item.href} href={item.href} aria-current={current ? 'page' : undefined}>
                {item.label}
              </a>
            )
          })}
        </nav>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </button>
      </Motion.header>

      {page === 'blog' ? (
        <Journal hash={hash} />
      ) : (
      <main>
        {page === 'home' ? (
        <>
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
                <a className="button button--primary" href={contact.resume}>
                  <FiDownload /> Download Resume
                </a>
                <a className="button button--ghost" href="https://cal.com/aatikakhan/30min">
                  <FiArrowUpRight /> Book a discovery call
                </a>
              </Motion.div>
              <div className="trust-line">
                Built production systems for founders across US, UK, UAE, Singapore and Europe — specializing in AI-first product infrastructure and marketplaces.
              </div>
              <Motion.div className="hero__insights" variants={stagger}>
                <Motion.section className="hero-notes" variants={fadeUp}>
                  <span className="hero-notes__label">Highlights</span>
                  <dl>
                    {hero.highlights.map((item) => (
                      <div key={item.label} className="hero-note">
                        <dt>{item.value}</dt>
                        <dd>{item.description}</dd>
                      </div>
                    ))}
                  </dl>
                </Motion.section>
                <Motion.section className="hero-notes" variants={fadeUp}>
                  <span className="hero-notes__label">How I work</span>
                  <ul>
                    {about.paragraphs.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Motion.section>
                <Motion.section className="hero-notes hero-notes--availability" variants={fadeUp}>
                  <span className="hero-notes__label">Availability</span>
                  <div className="hero-availability">
                    <div>
                      <span className="hero-availability__label">Current</span>
                      <p>{hero.status.current}</p>
                    </div>
                    <div>
                      <span className="hero-availability__label">Consulting</span>
                      <p>{hero.status.availability}</p>
                    </div>
                  </div>
                </Motion.section>
              </Motion.div>
            </Motion.div>
          </div>
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
                <Motion.article key={item.title} className="specialty-card" variants={fadeUp}>
                  <h3>{item.title}</h3>
                  <p>{item.blurb}</p>
                </Motion.article>
              ))}
            </div>
          </Motion.div>
        </section>

        <section id="experience" className="section">
          <Motion.div initial="hidden" animate="visible" variants={stagger}>
            <SectionTitle
              kicker="Experience"
              title="Experience across global product teams"
            />
            <div className="experience-timeline" role="list">
              {experiences.map((item, index) => {
                if (!showAllExperiences && index >= 2) {
                  return null
                }
                const isExpanded = expandedExperience === index
                const summaryText = isExpanded
                  ? item.summary
                  : `${item.summary.slice(0, 160)}${item.summary.length > 160 ? '…' : ''}`

                return (
                  <Motion.div
                    key={`${item.role}-${item.company}`}
                    className={`experience-item ${isExpanded ? 'is-expanded' : ''}`}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
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
            {experiences.length > 2 ? (
              <button
                type="button"
                className="experience-load"
                onClick={toggleExperienceLength}
              >
                {showAllExperiences ? 'Show fewer engagements' : 'Show all experiences'}
              </button>
            ) : null}
            <div className="volunteering volunteering--page">
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
          </Motion.div>
        </section>

        <section id="projects" className="section">
          <Motion.div initial="hidden" animate="visible" variants={stagger}>
            <SectionTitle
              kicker="Projects"
              title="Selected work"
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
                      </a>
                    ) : (
                      <div className="project-heading">
                        <h3>{project.name}</h3>
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

        <section id="contact" className="section contact-section">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <SectionTitle
              kicker="Let’s build"
              title="Ready for your next product sprint?"
              description={contact.description}
              align="center"
            />
            <Motion.div className="contact-card" variants={fadeUp}>
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
                  </a>
                ))}
              </div>
              <p className="contact-note">{contact.note}</p>
            </Motion.div>
          </Motion.div>
        </section>
        </>
        ) : null}
      </main>
      )}

      <footer className="footer">
        <span>© {new Date().getFullYear()} Aatika Khan. Available for global consulting engagements.</span>
      </footer>
    </div>
  )
}

export default App
