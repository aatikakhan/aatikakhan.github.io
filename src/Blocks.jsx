export const Rich = ({ parts }) => {
  const list = Array.isArray(parts) ? parts : [parts]
  return list.map((part, index) => {
    if (typeof part === 'string') return <span key={index}>{part}</span>
    if (part.href) {
      const internal = part.href.startsWith('/')
      return (
        <a
          key={index}
          href={part.href}
          {...(internal ? {} : { target: '_blank', rel: 'noreferrer' })}
        >
          {part.t}
        </a>
      )
    }
    return <span key={index}>{part.t}</span>
  })
}

export const Paragraphs = ({ items }) =>
  items
    ? items.map((paragraph, index) => (
        <p key={index}>
          <Rich parts={paragraph} />
        </p>
      ))
    : null

const layers = [
  {
    label: 'Clients',
    boxes: [
      { name: 'Flutter app', note: 'iOS and Android' },
      { name: 'Admin panel', note: 'settings and reviews' },
    ],
  },
  {
    label: 'Edge',
    boxes: [{ name: 'nginx', note: 'reverse proxy for HTTP and WebSocket' }],
  },
  {
    label: 'API',
    boxes: [
      { name: 'Gunicorn + Uvicorn workers', note: 'two by default' },
      { name: 'FastAPI monolith', note: 'routers and services' },
      { name: 'In-process jobs', note: 'bulk scan pool, 15 minute sweep' },
    ],
  },
  {
    label: 'Data',
    boxes: [
      { name: 'PostgreSQL (RDS)', note: 'source of truth, pgvector' },
      { name: 'Redis', note: 'caches and carts' },
      { name: 'S3', note: 'photos and message media' },
    ],
  },
  {
    label: 'External',
    boxes: [
      { name: 'Stripe', note: 'payments, Connect, subscriptions' },
      { name: 'Shippo, Old Dominion, Plycon', note: 'parcel, freight, white-glove' },
      { name: 'OpenAI, Gemini', note: 'vision and assistant' },
      { name: 'Firebase, SMTP', note: 'push and email' },
    ],
  },
]

export const Diagram = () => (
  <figure className="sd-diagram" aria-label="Treasure Fox architecture">
    {layers.map((layer, index) => (
      <div key={layer.label}>
        {index > 0 ? (
          <div className="sd-arrow" aria-hidden="true">
            &darr;
          </div>
        ) : null}
        <div className="sd-layer">
          <span className="sd-layer__label">{layer.label}</span>
          <div className="sd-layer__boxes">
            {layer.boxes.map((box) => (
              <div key={box.name} className="sd-box">
                <strong>{box.name}</strong>
                <span>{box.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </figure>
)

export const Table = ({ table }) => (
  <div className="sd-table-wrap">
    <table className="sd-table">
      <thead>
        <tr>
          {table.head.map((cell) => (
            <th key={cell}>{cell}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row) => (
          <tr key={row[0]}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} data-label={table.head[cellIndex]}>
                <Rich parts={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export const Case = ({ item }) => (
  <article className="sd-case">
    <h3>{item.title}</h3>
    <span className="sd-case__label">The problem</span>
    <Paragraphs items={item.problem} />
    <span className="sd-case__label">What I did</span>
    <Paragraphs items={item.did} />
    <span className="sd-case__label">The trade-off</span>
    <Paragraphs items={item.tradeoff} />
  </article>
)
