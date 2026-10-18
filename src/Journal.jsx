import { useEffect } from 'react'
import { links, writing } from './writing'

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

const Byline = ({ essay }) => (
  <p className="journal-byline">
    <span className="journal-byline__date">{essay.date}</span>
  </p>
)

const JournalIndex = () => (
  <main className="journal-main">
    <p className="journal-kicker">Inside the build</p>
    <h1>Blog</h1>
    <p className="journal-lede">
      Notes from heading engineering at Treasure Fox. Seven years of crafting products, currently a
      one-person engineering team on a very specific marketplace.
    </p>
    <ul className="journal-list">
      {writing.map((essay) => (
        <li key={essay.slug}>
          <a href={`/blog/${essay.slug}`}>
            <span className="journal-kicker">{essay.kicker}</span>
            <h2>{essay.title}</h2>
            <p>{essay.dek}</p>
          </a>
          <Byline essay={essay} />
        </li>
      ))}
    </ul>
  </main>
)

const JournalArticle = ({ essay }) => {
  const index = writing.findIndex((item) => item.slug === essay.slug)
  const previous = index > 0 ? writing[index - 1] : null
  const next = index >= 0 && index < writing.length - 1 ? writing[index + 1] : null

  return (
    <main className="journal-main journal-article">
      <a className="journal-back" href="/blog">
        All notes
      </a>
      <p className="journal-kicker">{essay.kicker}</p>
      <h1>{essay.title}</h1>
      <p className="journal-published">Published {essay.date}</p>
      <p className="journal-lede">{essay.dek}</p>
      {essay.sections.map((section, sectionIndex) => (
        <section key={section.heading || sectionIndex}>
          {section.heading ? <h2>{section.heading}</h2> : null}
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>
              <Rich parts={paragraph} />
            </p>
          ))}
        </section>
      ))}
      <p className="journal-author">
        <span>Written by</span>
        <strong>Aatika Khan</strong>
        Founding engineer, head of engineering
        <a href={links.fox} target="_blank" rel="noreferrer">
          Treasure Fox
        </a>
      </p>
      <nav className="journal-switch" aria-label="More notes">
        {previous ? (
          <a href={`/blog/${previous.slug}`}>
            <span>Read previous</span>
            {previous.title}
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a href={`/blog/${next.slug}`}>
            <span>Read next</span>
            {next.title}
          </a>
        ) : null}
      </nav>
    </main>
  )
}

function Journal({ path }) {
  const slug = path.startsWith('/blog/') ? path.slice('/blog/'.length) : ''
  const essay = slug ? writing.find((item) => item.slug === slug) : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  return (
    <div className="section journal">
      {slug && !essay ? (
        <main className="journal-main">
          <h1>That note is gone.</h1>
          <a className="journal-back" href="/blog">
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
