import { useEffect } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { links, writing } from './writing'
import { contact } from './content'

const Rich = ({ parts }) => {
  const list = Array.isArray(parts) ? parts : [parts]
  return list.map((part, index) => {
    if (typeof part === 'string') return <span key={index}>{part}</span>
    if (part.href) {
      return (
        <a key={index} href={part.href} target="_blank" rel="noreferrer">
          {part.t}
        </a>
      )
    }
    return <span key={index}>{part.t}</span>
  })
}

const JournalHeader = ({ theme, onToggleTheme }) => (
  <header className="journal-bar">
    <a className="journal-brand" href="#hero">
      Aatika Khan
    </a>
    <div className="journal-bar__tools">
      <nav className="journal-nav" aria-label="Journal">
        <a href="#blog">Blog</a>
        <a href="#experience">Experience</a>
        <a href={links.fox} target="_blank" rel="noreferrer">
          Treasure Fox
        </a>
        <a href={contact.resume} target="_blank" rel="noreferrer">
          Résumé
        </a>
      </nav>
      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
      </button>
    </div>
  </header>
)

const Byline = ({ essay }) => (
  <p className="journal-byline">
    <span>Founding engineer, head of engineering · </span>
    <a href={links.fox} target="_blank" rel="noreferrer">
      Treasure Fox
    </a>
    <span> · {essay.date}</span>
  </p>
)

const JournalIndex = () => {
  const [featured, ...rest] = writing
  return (
    <main className="journal-main">
      <p className="journal-kicker">Inside the build</p>
      <h1>Blog</h1>
      <p className="journal-lede">
        Notes from heading engineering at Treasure Fox. Seven years of crafting products, currently a
        one-person engineering team on a very specific marketplace.
      </p>
      <article className="journal-feature">
        <a href={`#blog/${featured.slug}`}>
          <span className="journal-kicker">{featured.kicker}</span>
          <h2>{featured.title}</h2>
          <p>{featured.dek}</p>
        </a>
        <Byline essay={featured} />
      </article>
      <ul className="journal-list">
        {rest.map((essay) => (
          <li key={essay.slug}>
            <a href={`#blog/${essay.slug}`}>
              <span className="journal-kicker">{essay.kicker}</span>
              <h2>{essay.title}</h2>
              <p>{essay.dek}</p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}

const JournalArticle = ({ essay }) => (
  <main className="journal-main journal-article">
    <a className="journal-back" href="#blog">
      All notes
    </a>
    <p className="journal-kicker">{essay.kicker}</p>
    <h1>{essay.title}</h1>
    <p className="journal-lede">{essay.dek}</p>
    <Byline essay={essay} />
    {essay.sections.map((section) => (
      <section key={section.heading || section.paragraphs[0][0].t}>
        {section.heading ? <h2>{section.heading}</h2> : null}
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>
            <Rich parts={paragraph} />
          </p>
        ))}
      </section>
    ))}
  </main>
)

function Journal({ hash, theme, onToggleTheme }) {
  const slug = hash.startsWith('#blog/') ? hash.slice('#blog/'.length) : ''
  const essay = slug ? writing.find((item) => item.slug === slug) : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [hash])

  return (
    <div className="journal">
      <JournalHeader theme={theme} onToggleTheme={onToggleTheme} />
      {slug && !essay ? (
        <main className="journal-main">
          <h1>That note is gone.</h1>
          <a className="journal-back" href="#blog">
            Back to the blog
          </a>
        </main>
      ) : essay ? (
        <JournalArticle essay={essay} />
      ) : (
        <JournalIndex />
      )}
    </div>
  )
}

export default Journal
