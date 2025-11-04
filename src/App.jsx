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
  articles,
  contact,
} from './content'
import {
  FiArrowUpRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhoneCall,
  FiTwitter,
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
  const contactLinks = [
    {
      href: `mailto:${contact.email}`,
      label: contact.email,
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
    {
      href: contact.resume,
      label: 'Résumé (PDF)',
      Icon: FiDownload,
      external: false,
      download: 'Aatika-Khan-Resume.pdf',
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
                <a className="button button--ghost" href="#contact">
                  <FiPhoneCall aria-hidden="true" /> Book a discovery call
                </a>
              </Motion.div>
              <Motion.ul className="hero__metrics" variants={stagger}>
                {hero.highlights.map((item) => (
                  <Motion.li key={item.label} className="hero__metric" variants={fadeUp}>
                    <span className="hero__metric-value">{item.value}</span>
                    <span className="hero__metric-label">{item.label}</span>
                  </Motion.li>
                ))}
              </Motion.ul>
            </Motion.div>

            <Motion.aside
              className="hero__sidebar"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div className="hero__sidebar-block">
                <span className="hero__sidebar-label">Currently</span>
                <p>Partnering with founding teams on outcome framing, UX research loops, and Flutter delivery that ships faster.</p>
              </div>
              <div className="hero__sidebar-block">
                <span className="hero__sidebar-label">Why clients choose me</span>
                <p>{about.paragraphs[1]}</p>
              </div>
              <div className="hero__sidebar-block">
                <span className="hero__sidebar-label">Availability</span>
                <p>Accepting new product partnerships worldwide · Remote-first</p>
              </div>
            </Motion.aside>
          </div>
        </section>

        <section id="approach" className="section section--accent">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <SectionTitle
              kicker="Product approach"
              title="Partnering with you from problem framing to measurable outcomes"
              description={about.tagline}
            />
            <div className="about__grid">
              <Motion.div className="about__story" variants={fadeUp}>
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Motion.div>
              <Motion.div className="about__outline" variants={fadeUp}>
                <span className="about__outline-label">Product levers</span>
                <ul>
                  <li>North-star alignment with measurable success metrics and decision narratives.</li>
                  <li>Experiment loops that blend research, prototyping, and instrumentation.</li>
                  <li>Delivery rituals and runbooks that enable teams to scale independently.</li>
                </ul>
              </Motion.div>
            </div>
          </Motion.div>
        </section>

        <section id="principles" className="section">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <SectionTitle
              kicker="Product principles"
              title="Guiding beliefs that keep shipping disciplined and outcome-led"
              description="These principles shape every engagement — from discovery workshops to post-launch iteration — so teams stay aligned and confident."
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
              kicker="Product playbooks"
              title="Repeatable systems that move ideas from insight to impact"
              description="Execution frameworks tuned for velocity, learning, and resilience — honed across marketplaces, mobility, and AI-led experiences."
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
              kicker="Engagement history"
              title="Trusted by global teams to ship critical mobile products"
            />
            <ol className="experience-timeline">
              {experiences.map((item) => (
                <Motion.li key={`${item.role}-${item.company}`} className="experience-card" variants={fadeUp}>
                  <div className="experience-meta">
                    <span className="experience-period">{item.period}</span>
                    <h3>
                      {item.role} ·{' '}
                      {item.link ? (
                        <a
                          href={item.link}
                          className="experience-company"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.company}
                        </a>
                      ) : (
                        <span className="experience-company">{item.company}</span>
                      )}
                    </h3>
                    <p>{item.summary}</p>
                    <div className="experience-tech">
                      {item.tech.map((tech) => (
                        <Pill key={tech}>{tech}</Pill>
                      ))}
                    </div>
                  </div>
                  <ul className="experience-bullets">
                    {item.contributions.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Motion.li>
              ))}
            </ol>
          </Motion.div>
        </section>

        <section id="projects" className="section">
          <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <SectionTitle
              kicker="Projects"
              title="Selected projects shipped with product-first execution"
              description="Crafting resilient Flutter products that align UX research, engineering quality, and measurable growth."
            />
            <div className="projects-grid">
              {projects.map((project) => (
                <Motion.article
                  key={project.name}
                  className="project-card"
                  variants={fadeUp}
                  whileHover={surfaceMotion.whileHover}
                  transition={surfaceMotion.transition}
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
              <div className="articles">
                <h3>Spotlight</h3>
                <ul>
                  {articles.map((item) => (
                    <li key={item.title}>
                      <span className="article-title">{item.title}</span>
                      <p>{item.detail}</p>
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
