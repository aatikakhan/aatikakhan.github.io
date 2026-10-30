export const links = {
  me: 'https://www.linkedin.com/in/aatikakhan/',
  james: 'https://www.linkedin.com/in/jamesadame/',
  ryan: 'https://www.linkedin.com/in/ryanearlcopeland/',
  ali: 'https://www.linkedin.com/in/suleman-ali-saif/',
  fox: 'https://treasurefox.ai',
  resume:
    'https://docs.google.com/document/d/1bpBcVd-_sbq700t3dAhkYw1jkXmJXMuqYchZFTu2cdw/export?format=pdf',
}

const fox = { t: 'Treasure Fox', href: links.fox }
const james = { t: 'James', href: links.james }
const ryan = { t: 'Ryan Copeland', href: links.ryan }
const ali = { t: 'Ali', href: links.ali }

const overviewSlug = 'designing-a-marketplace-as-one-engineer'
const moneySlug = 'payments-escrow-and-delivery-design'
const scanSlug = 'scans-listings-and-search-design'
const note = (t, slug) => ({ t, href: `/blog/${slug}` })
const moneyNote = note('payments, offers, and delivery', moneySlug)
const scanNote = note('scans, listings, and search', scanSlug)

export const writing = [
  {
    slug: overviewSlug,
    title: 'Designing a marketplace as a one-person engineering team',
    dek: 'Treasure Fox sells mid-century furniture. This is the system underneath it: the architecture, the data, how a request moves, and the choices I made because I’m the only engineer.',
    date: 'October 2026',
    kicker: 'System design 1 of 3',
    sections: [
      {
        paragraphs: [
          [
            fox,
            ' is a marketplace for mid-century modern furniture, MCM for short. Think 1940s to 1970s: Eames chairs, teak sideboards, that kind of thing. These three notes are about how it’s built, and about what I did when something could go wrong.',
          ],
        ],
      },
      {
        heading: 'Why it exists',
        paragraphs: [
          [
            'Most people don’t go looking for this furniture. They inherit it, or they find it at an auction or a yard sale and can’t tell if it’s MCM at all. Every listing site then asks the same thing first: what is it? So we started with the camera. You take a photo, and the app tells you what the piece is, roughly when it was made, and what it might sell for.',
          ],
          [
            'Last summer we shipped the beta: identify a piece, talk to other collectors, learn the stories. Buy, sell, and ship were still ahead of us. They are not anymore. Then sellers with stores showed up with forty photos, not one, so we built bulk upload for them.',
          ],
          [
            james,
            ' set the vision as founder and creative director. ',
            ryan,
            ', our lead designer, turned that vision into a product people can move through. ',
            ali,
            ' built the Vision AI that recognizes the furniture. I built the systems underneath it.',
          ],
        ],
      },
      {
        heading: 'What the system has to do',
        paragraphs: [['These constraints shaped every choice that follows:']],
        bullets: [
          'One engineer builds, deploys, and is on call, so every part has to be easy to run and easy to debug.',
          'Money has to be right. A sale, a refund, and a payout must each happen once.',
          'Scans are slow and cost real money, because each one calls vision models.',
          'Furniture is big. Shipping runs through parcel, freight, and white-glove carriers that each behave differently.',
          'Every piece is one of a kind, so a listing can only sell once.',
          'Traffic is modest, so the design favors correctness over raw throughput.',
        ],
      },
      {
        heading: 'Architecture at a glance',
        diagram: true,
        paragraphs: [
          [
            'The backend is a modular monolith. One FastAPI application holds a router for each area: users, listings, orders, payments, shipping, messages, scans, and the assistant. Services under the routers hold the business rules, like escrow and subscriptions. PostgreSQL on RDS is the source of truth. The Flutter app is the main client.',
          ],
          [
            'I chose a monolith on purpose. One deploy and one database transaction cover an order, its listing, and its payment state together. Splitting those into services would add network failures to flows that need to succeed or fail as one piece.',
          ],
        ],
      },
      {
        heading: 'Data',
        paragraphs: [
          ['PostgreSQL holds everything we can’t afford to lose, split into schemas that follow the domains:'],
        ],
        bullets: [
          'aitreasurefox: users, sessions, addresses, notifications, reports, and verification requests.',
          'Listings_db: listings, offers, scan history, and bulk upload jobs.',
          'order_info: orders, line items, and reviews.',
          'stripe: the log of processed webhook events.',
          'Subscription: plans and token usage.',
          'messaging: encrypted messages.',
          'mini_rag: the reference library, with its vectors.',
          'app_config: settings I can change from the admin panel.',
        ],
        afterParagraphs: [
          [
            'Redis only holds things we can rebuild: cached pages, plan checks, and carts. S3 holds photos and message media. Listing photos sit in a private bucket and are served through signed links made at read time, so a leaked link stops working.',
          ],
          [
            'An order keeps two separate fields: its shipping progress, and its escrow status (held, inspection, released, disputed, or refunded). Keeping them apart means a shipping problem can’t quietly change where the money is.',
          ],
        ],
      },
      {
        heading: 'How a request is handled',
        steps: [
          ['The app calls the API. nginx forwards the request to Gunicorn.'],
          ['Gunicorn hands it to one of its Uvicorn workers (two by default). Each worker runs the whole FastAPI app.'],
          ['Rate limits apply on the expensive routes. A photo scan allows five calls a minute per IP address.'],
          ['The auth dependency reads the Bearer token, checks that it’s an access token, loads the user, and rejects deleted or locked accounts. Public routes treat a bad token as a logged-out visitor.'],
          ['The route takes a database session from one of several connection pools, taken in turn, because the database caps connections per role. The session commits when the route succeeds and rolls back on any error. Connections are checked before use and recycled every five minutes.'],
          ['Anything slow or optional, like a notification, runs after the response or in the background.'],
        ],
        afterParagraphs: [
          [
            'Passwords are hashed with bcrypt. Access and refresh tokens are signed JWTs with lifetimes set in config, and admin sessions use a separate token type.',
          ],
        ],
      },
      {
        heading: 'What runs where',
        paragraphs: [
          ['Work goes in the request only when the user is waiting for the answer. Everything else moves out.'],
        ],
        table: {
          head: ['Work', 'Where it runs', 'Why'],
          rows: [
            ['Reads, offers, creating a checkout', 'In the request', 'The user is waiting and the work is short.'],
            ['Photo scan', 'In the request, with a 300 second limit', 'The app needs the answer. Model calls and photo uploads run at the same time.'],
            ['Stripe webhook follow-up', 'After the response, as a FastAPI background task', 'Stripe wants a fast answer.'],
            ['Bulk upload scans', 'A worker pool of two, with state in PostgreSQL', 'Forty scans can’t hold one request open.'],
            ['Payout release and stale checkout cleanup', 'A sweep inside the API every 15 minutes, behind a Postgres advisory lock', 'Money shouldn’t wait for a person, and only one worker should run the sweep.'],
            ['The same sweep, as a backup', 'A systemd timer once a day', 'It covers a stretch where the in-process loop isn’t running.'],
            ['Push notifications', 'A short thread calling Firebase Cloud Messaging', 'A slow network call that can fail without hurting the order.'],
          ],
        },
      },
      {
        heading: 'Security',
        bullets: [
          'Passwords use bcrypt with 12 rounds. An account locks for 30 minutes after too many failed logins.',
          'Stripe webhooks are verified by signature, and calls to the freight partner are signed with HMAC.',
          'Card details never touch our servers. Payment happens on Stripe’s hosted Checkout, and plan changes happen in Stripe’s customer portal.',
          'Messages are encrypted at rest. Listing photos live in a private bucket behind signed links.',
          'Scan history can only be read by its owner. Blocked users are filtered out of search and the feed.',
          'API docs are switched off in production, and CORS is limited to the configured origins.',
        ],
      },
      {
        heading: 'Operations',
        bullets: [
          'Deploys run through GitHub Actions to staging first, then production. Gunicorn runs under systemd behind nginx, and the production script checks that the service is active and prints the logs when it isn’t.',
          'Schema changes are plain SQL migration files in the repo.',
          'Logs go to journald. Each checkout step writes one trace line tagged with the order ID, so one search follows a payment from start to end.',
          'For money, Stripe’s dashboards are the truth. If the app and Stripe disagree, I trust Stripe and fix the app.',
          'I don’t have a metrics dashboard or paging set up. I find problems through logs, Stripe, and user reports. That’s the weakest part of operations today.',
        ],
        afterParagraphs: [
          [
            'The next note follows the money: ',
            moneyNote,
            '. The one after follows the photo: ',
            scanNote,
            '.',
          ],
        ],
      },
    ],
  },
  {
    slug: moneySlug,
    title: 'Payments, escrow, and delivery',
    dek: 'How an offer becomes an order, where the money sits, how a seller gets paid exactly once, and how I handled the cases that go wrong.',
    date: 'October 2026',
    kicker: 'System design 2 of 3',
    sections: [
      {
        paragraphs: [
          [
            'This note follows an order, from the first offer to the seller’s payout. Every piece is one of a kind and ships as freight or parcel, so the hard part isn’t taking a payment. The hard part is every way the payment can go wrong. The architecture is in ',
            note('note 1', overviewSlug),
            '.',
          ],
        ],
      },
      {
        heading: 'Offers and messages',
        paragraphs: [
          [
            'A seller chooses whether a listing takes offers and can set a minimum. An offer below the minimum is declined at once. Otherwise it appears as a card in the buyer’s chat with the seller, and the same card updates as the seller accepts or declines. A buyer gets three tries per listing: the first offer and two counters.',
          ],
          [
            'Accepting doesn’t charge anyone. It turns into a one-time price for that buyer at quantity one, and the buyer pays at checkout with shipping, fees, and tax added. After payment the offer is marked purchased.',
          ],
          [
            'Messages travel over REST and WebSocket. A message is encrypted, written to PostgreSQL, and pushed to the receiver’s open socket if there is one. Offers and media ride the same path, with media in S3. Because the database write comes first, a missed live push loses nothing, and the next fetch returns the message.',
          ],
          [
            'There is a limit here. The map of open sockets lives in each worker’s memory, so live push only reaches sockets held by the same worker. The fix is to publish messages through Redis so every worker can reach every socket. I haven’t needed it yet, and it’s the first item on the list in ',
            note('note 3', scanSlug),
            '.',
          ],
        ],
      },
      {
        heading: 'One payment, start to finish',
        paragraphs: [
          ['This is the path of one order, as the system sees it. The order matters, because any step can fail halfway.'],
        ],
        steps: [
          ['The buyer taps buy. The API checks the piece is still for sale (it answers 409 if another paid order exists), saves a pending order with the shipping choice, the quote, and the fee, and creates a Stripe Checkout Session.'],
          ['The buyer pays on Stripe’s page, so card details never touch our servers.'],
          ['Stripe calls our webhook. We verify the signature, log the event, mark the order paid with the money held, mark the piece sold, clear the cart, and tell the seller.'],
        ],
        afterParagraphs: [
          [
            'The webhook marks an order paid, not the buyer’s phone. The app can close or lose signal right after payment, and the order still has to end up in the right state. The pending order is the record we can always find again.',
          ],
          [
            'The money lands on Treasure Fox’s Stripe balance and stays there. Sales tax comes from Stripe Tax at checkout and stays out of the seller’s payout. The buyer fee and the seller fee are both a percentage of the item price only, because shipping a sofa can cost nearly as much as a small piece. The percentage gets smaller as the price goes up.',
          ],
        ],
      },
      {
        heading: 'Four ways a piece can travel',
        paragraphs: [
          ['The seller picks which options a listing allows, and the buyer sees them at checkout.'],
          ['Parcel is for smaller pieces. Live carrier rates come from Shippo.'],
          ['LTL freight is for bigger pieces and runs through Old Dominion. Sellers turn it on per listing. The price depends on the package size and weight, and it covers dock-to-dock or liftgate delivery, since a house with no dock isn’t a warehouse.'],
          ['White-glove is Plycon. They carry the piece in, unpack it, and place it. The price is a quote worked out from the dimensions.'],
          ['Pickup means the buyer collects it themselves, so there’s no carrier cost.'],
        ],
      },
      {
        heading: 'The hard cases',
        paragraphs: [
          ['Each case has the problem, what I built, and the trade-off I accepted.'],
        ],
        cases: [
          {
            title: 'Two buyers pay for the same one-of-a-kind piece',
            problem: [
              'A listing can only sell once, but two people can open checkout at the same time and both pay.',
            ],
            did: [
              'The buy call checks for an existing paid order and answers 409. The webhook checks again when the payment lands, because both buyers can get that far. The first paid order wins. The second payment is refunded in full, automatically, and the buyer is told.',
            ],
            tradeoff: [
              'I don’t lock a listing while someone is in checkout, so a buyer can pay and then be refunded. A lock would stop that, but an abandoned checkout could then block a real sale. For a one-of-one item I picked no lock and a fast refund.',
            ],
          },
          {
            title: 'Stripe sends the same webhook twice, or my handler crashes halfway',
            problem: [
              'Stripe delivers events at least once, so duplicates are normal. A crash in the middle of handling would leave an order half updated.',
            ],
            did: [
              'The handler verifies Stripe’s signature, then claims the event ID with an insert that does nothing on conflict. The row moves through processing, succeeded, and failed. Only a failed row can run again. If handling throws, the row is marked failed and the webhook returns an error, so Stripe retries it. Rows are never deleted, so the table doubles as a record of what happened. A side effect that may fail, like marking a listing sold, runs in a savepoint, so a failure there can’t undo the payment record.',
            ],
            tradeoff: [
              'If the process dies after claiming an event but before finishing it, the row stays in processing and Stripe’s retry is skipped. That’s a known gap. The fix is to let a new delivery reclaim a processing row after a few minutes.',
            ],
          },
          {
            title: 'A seller has to be paid once, and only after the buyer had a look',
            problem: [
              'The money should move after delivery and inspection, never twice, and never to the wrong state.',
            ],
            did: [
              'After delivery the escrow status becomes inspection, and the buyer has three days by default to look the piece over. A sweep inside the API runs every 15 minutes and releases every order that is due, with a Postgres advisory lock so two workers never run it together. The transfer carries an idempotency key built from the order, so a retry can’t pay twice. If a transfer fails, the order shows payout failed and the seller can retry it. After that, Stripe pays the seller’s bank on its own schedule, on the 1st and the 15th.',
            ],
            tradeoff: [
              'Holding the money on our balance means we carry the refund and chargeback risk, and I reconcile against Stripe myself. I chose that over splitting the payment at checkout, because a cancel or a dispute would then mean taking money back from a seller.',
            ],
          },
          {
            title: 'A buyer starts checkout and walks away',
            problem: ['Abandoned checkouts shouldn’t pile up or block anything.'],
            did: [
              'Starting checkout saves a pending order in PostgreSQL and a cart in Redis that expires after seven days. The pending order is cancelled when Stripe says the session expired, or by the sweep after 24 hours. The listing is never held, so an abandoned order costs nothing.',
            ],
            tradeoff: [
              'Pending rows can sit around for up to a day. They’re harmless, and they keep the cleanup rule simple.',
            ],
          },
          {
            title: 'A card dispute or a damaged piece after payment',
            problem: [
              'The seller shouldn’t be paid while a problem is open, and the buyer needs a way to raise one.',
            ],
            did: [
              'During the inspection window a buyer can report not as described, damaged, or missing parts. That marks the order disputed and pauses the payout. A card dispute from Stripe does the same and notifies both sides. If we win the dispute, the order goes back to inspection. If we lose, it’s marked refunded.',
            ],
            tradeoff: [
              'In-app reports get a manual review. That wouldn’t scale to high volume, but it needs human judgment, and the volume is small today.',
            ],
          },
          {
            title: 'Shipping a sofa through carriers that behave differently',
            problem: [
              'Parcel, freight, and white-glove have different prices, cancel rules, and failure cases, and the price can’t change after the buyer pays.',
            ],
            did: [
              'The order stores the shipping mode and the quote the buyer saw at checkout. We buy a parcel label only when the seller marks the order shipped, so a cancel doesn’t leave a label to void, and the label purchase is safe to retry. A parcel order can be cancelled for a full refund until it ships. A white-glove order can be cancelled only before pickup, and the refund happens only if the partner’s cancel call succeeds. If a delivery fails and the piece comes back, the payment is held until the seller confirms receipt, then refunded minus the partner’s fee. Extra carrier fees come out of money we’re already holding, so the buyer never gets a second invoice. Calls to the freight partner are signed with HMAC.',
            ],
            tradeoff: [
              'Fetching an order refreshes the partner’s status, which ties that page’s speed to the partner. There is also an explicit refresh endpoint, and I accepted the coupling for fresher status.',
            ],
          },
          {
            title: 'A subscription has to match what Stripe says',
            problem: [
              'Stripe owns billing, but the app has to know your plan on every request without calling Stripe each time.',
            ],
            did: [
              'Gold is a Stripe subscription, monthly or yearly. Stripe bills and renews. Its webhooks for created, updated, deleted, paused, and resumed subscriptions update a local copy, and each event also clears the cached plan for that user. A cancel keeps Gold until the end of the paid period, and plan changes go through Stripe’s customer portal. Token packs are one-time Checkout purchases. Subscriptions and marketplace sales stay in separate ledgers on the same Stripe account, so a refund argument about one can’t touch the other.',
            ],
            tradeoff: [
              'The local copy can lag by however long a webhook takes to arrive. Clearing the cache on every event keeps that gap short.',
            ],
          },
        ],
      },
      {
        heading: 'Reviews',
        paragraphs: [
          [
            'Only the buyer of a paid order can write a review, one per item. It has stars and a note, plus optional extras such as tags, scores for the piece, the shipping, and the service, and photos. The seller can reply in public. No paid order means no review, so a star always means the piece changed hands.',
          ],
        ],
      },
    ],
  },
  {
    slug: scanSlug,
    title: 'Scans, listings, and search',
    dek: 'How a photo becomes a verified listing, how forty listings upload at once, how people find a piece, and where this system will break first.',
    date: 'October 2026',
    kicker: 'System design 3 of 3',
    sections: [
      {
        paragraphs: [
          [
            'This note follows the other side of the product: the photo, the listing, and the search. It also ends with the failure table and the limit list for the whole system. The money side is in ',
            moneyNote,
            '.',
          ],
        ],
      },
      {
        heading: 'The scan pipeline',
        paragraphs: [
          [
            'A scan is the most expensive request in the system, so it’s built to fail cheaply. You take a few photos, and they go through these steps:',
          ],
        ],
        steps: [
          ['Check the bytes are a real image, not just a file name that says so.'],
          ['Check the user has tokens left.'],
          ['Run the model pipeline and upload the photos to S3 at the same time, so the user doesn’t wait for both in a row.'],
          ['In the pipeline, read the object with OpenAI and Gemini vision models, look up verified records by vector similarity in PostgreSQL, and fall back to the model’s own reading if nothing is close.'],
          ['Optional extras, like a market lookup, have timeouts of a few seconds and are skipped when they’re slow. The model clients have their own connect and read timeouts too.'],
          ['Run a validator over the result before it’s returned.'],
          ['Save the scan to history and count one token. If any earlier step fails, the user isn’t charged.'],
        ],
        afterParagraphs: [
          [
            'The result is a title, a likely maker, a year, a category, a size when the photos show enough to measure, a price range, a confidence score, and one flag: MCM, not MCM, or can’t tell. If the answer is not MCM, we stop there and don’t make up a year or a price.',
          ],
          [
            'Which pipeline strategy runs is a setting in the database, read fresh on every call. I can switch it from the admin panel without a deploy, and switch it back just as fast.',
          ],
        ],
      },
      {
        heading: 'How the scan checks itself',
        paragraphs: [
          [
            'A model on its own can sound sure and be wrong, so the scan also looks the piece up in a reference library of designers, makers, and models. ',
            ali,
            ' built the Vision AI, and I built the lookup that sits under it.',
          ],
          [
            'Each record in the library is described the way a photo would describe it: category, materials, construction, finish, and distinctive features. We turn that description into a vector and store it in PostgreSQL with pgvector. When you scan something, we do the same with your photo and ask for the closest records. Names, years, and countries are stored with each record but kept out of the vector, because a photo never says “Denmark.” Only records a person has verified can be used, and new records start unverified.',
          ],
          [
            'Every successful scan goes into your scan history with its photos, result, and the confidence. You can give it a thumbs up or down, and you can delete it. Only you can read your scans.',
          ],
        ],
      },
      {
        heading: 'Listings, and when the scan says no',
        paragraphs: [
          [
            'Every listing starts as a draft, which you can save with almost nothing in it. Moving it to Selling takes more. The listing has to point at your own scan, and that scan has to say MCM, or the listing needs an accepted manual verification. It also needs real package size and weight, a ship-from address, and a connected Stripe account so we can pay you later. The app tells you what’s missing, and the server checks all of it too, so no screen can skip a step.',
          ],
          [
            'A real piece can fail a scan because the photos were bad, or because nobody has recorded it yet. So a seller can ask for a manual verification on any draft, with the maker, period, material, a short story, and proof photos like a label or a stamp. Each listing can have one open request. If it’s accepted, the listing is verified. If it’s rejected, the seller gets a note and can send a new one.',
          ],
          [
            'After a listing is live, a buyer can still report it as not MCM. The listing stays up while we review it, and we either keep it, with a note, or remove it, which sends it back to a draft with the reason. That report is separate from a problem report on a paid order.',
          ],
        ],
      },
      {
        heading: 'Finding a piece',
        paragraphs: [
          [
            'Search only looks at listings that are for sale. As you type, it suggests people, makers, titles, and categories. A full search matches the title, maker, category, and description. A match at the start of a title ranks above one at the start of a maker name, which ranks above a category match, and newer listings come after that. People you’ve blocked never show up.',
          ],
          [
            'A saved search becomes a watch. When a new listing matches your term, you get one notification, and tapping it reopens the search. A seller is never notified about their own pieces.',
          ],
        ],
      },
      {
        heading: 'The assistant',
        paragraphs: [
          [
            'The assistant answers questions about style, about listings, and about using the app, and it sticks to furniture, design, and the marketplace. When you send a message, the server builds a small read-only summary about you: your profile and city, your plan, recent offers, likes, saves, and a sample of your orders. It also searches the live catalog for listings that match your question. Then it sends the summary, the matching listings, and the recent chat to Gemini and shows you the reply. The model never talks to the database directly.',
          ],
          [
            'Chats are saved as sessions in PostgreSQL, and the last 50 messages go along with each question so it remembers what you were talking about.',
          ],
        ],
      },
      {
        heading: 'Tokens keep the AI bill in check',
        paragraphs: [
          [
            'A token is one use of our AI. A scan costs one and an assistant reply costs one, and both come out of the same pool. Free accounts get a small allowance each month, and it resets at the start of the month. Each use adds one to a usage row for that day. Before a scan or a reply, we add up the month: your allowance plus any packs you bought, minus what you’ve used. Gold accounts skip the counting and have no limit. The payment side of packs and Gold is in ',
            moneyNote,
            '.',
          ],
        ],
      },
      {
        heading: 'The hard cases',
        paragraphs: [
          ['Each case has the problem, what I built, and the trade-off I accepted.'],
        ],
        cases: [
          {
            title: 'AI scans are slow, cost money, and are sometimes wrong',
            problem: [
              'A scan can take a minute or more, every one costs model calls, and a confident wrong answer would put a fake listing in a marketplace that sells on trust.',
            ],
            did: [
              'The pipeline above checks the image, runs the models and the uploads in parallel, and checks the answer against a library of verified records. A piece that isn’t MCM stops there. Optional steps time out and are skipped, a validator checks the result, and a token is charged only after success. The scan route is rate limited, and I can change the strategy from the admin panel without a deploy.',
            ],
            tradeoff: [
              'The token check and the charge are separate steps, so several scans fired at once could pass the check together and overshoot the allowance a little. The rate limit bounds it. Reserving a token up front and refunding on failure would close it.',
            ],
          },
          {
            title: 'A seller uploads forty listings at once',
            problem: [
              'Forty scans can’t run inside one request, and running them all at once would hit model rate limits and starve everyone else.',
            ],
            did: [
              'Bulk upload takes a folder of photos or a spreadsheet and creates one draft per row. Then it hands the scans to a worker pool that runs two at a time. Each draft has its own status in PostgreSQL, such as queued, scanning, failed, or cancelled, so the app shows progress and the seller can cancel. Scans use the seller’s tokens. If tokens run out, the remaining drafts are skipped, and a single call re-queues them after the seller buys more. The job stops at drafts, and each draft still has to pass the normal checks to go live.',
            ],
            tradeoff: [
              'The pool runs inside the API process. If the API restarts mid-job, some drafts stay in queued or scanning and I recover them by hand. I haven’t added a message broker, because a worker pool and a status column are easier to run at this size. A real queue with retries would fix the restart gap.',
            ],
          },
          {
            title: 'Hot pages are read far more than they change',
            problem: [
              'The homepage feed, a profile, and a seller page are read constantly, and each one joins several tables.',
            ],
            did: [
              'Redis sits in front of them with short TTLs: 45 seconds for the feed, 2 minutes for a profile, and 5 minutes for a seller page or a plan. Feed keys carry a version number, so one counter bump makes every cached page unreachable. A profile or seller page is cleared by deleting its key when something about it changes. If Redis is down, the pages read from PostgreSQL. The thumbnail builder also uses a short-lived Redis key as a lock, so two requests don’t build the same image at once.',
            ],
            tradeoff: [
              'The clear calls are spread across many routes. If I forget one, a page stays stale until its TTL runs out. The TTL is what keeps that mistake small.',
            ],
          },
        ],
      },
      {
        heading: 'What fails, and what happens',
        paragraphs: [['This is the table I’d want in front of me at 2 a.m.']],
        table: {
          head: ['If this fails', 'The user sees', 'How it recovers'],
          rows: [
            ['Redis is down', 'Slightly slower pages. Carts can’t be read.', 'Cached pages read from PostgreSQL. The pending order is still in the database, so no money state is lost.'],
            ['PostgreSQL is unreachable', 'Most routes return errors.', 'Connections are checked before use. Stripe keeps retrying webhooks while we return errors, so a paid order catches up when the database is back.'],
            ['Stripe is slow or down', 'Checkout can’t start. Money already held stays held.', 'A pending order expires on its own. Payouts retry on the next sweep, 15 minutes later.'],
            ['Stripe sends an event twice', 'Nothing.', 'The event ID is already claimed, so the second delivery is ignored.'],
            ['The API dies while handling a webhook', 'Possibly an order stuck in pending.', 'Known gap. The event row stays in processing and the retry is skipped, so I fix it by hand. The planned fix is to reclaim old processing rows.'],
            ['A model provider is slow or down', 'The scan fails with an error and no token is used.', 'Optional steps time out and are skipped. The user scans again.'],
            ['A carrier call fails', 'Fewer shipping options, or a label error for the seller.', 'The seller can retry the label purchase, which is safe to repeat.'],
            ['Firebase push fails', 'A late notification.', 'The notification is already stored, so it shows up in the app on the next load.'],
            ['The API restarts during a bulk job', 'Some drafts stay in queued or scanning.', 'Known gap. The status column shows exactly which drafts didn’t finish, and recovery is manual for now.'],
            ['A bad deploy', 'Possibly nothing, if staging caught it.', 'Staging deploys first. The production script checks that the service is active and prints the logs when it isn’t.'],
          ],
        },
      },
      {
        heading: 'Limits and what I’d change first',
        paragraphs: [
          ['Each limit below is a trade I made on purpose, along with the trigger that would make me undo it.'],
        ],
        table: {
          head: ['Limit today', 'Why it’s fine for now', 'Trigger', 'The fix'],
          rows: [
            ['Webhook rows can stick in processing after a crash', 'Crashes mid-webhook are rare, and I can see them in the table.', 'The first stuck order', 'Reclaim a processing row after a few minutes.'],
            ['Live sockets held in worker memory', 'It’s the simplest way to do live messaging.', 'More workers or more than one host', 'Publish messages through Redis so every worker can reach every socket.'],
            ['Bulk scans and webhook follow-up run in the API process', 'No extra infrastructure to run.', 'Large sellers upload at once, or restarts interrupt jobs', 'A real queue with retries, such as SQS or Celery, and separate worker processes.'],
            ['Token check and charge are separate steps', 'The rate limit keeps overshoot small.', 'Abuse, or a higher cost per scan', 'Reserve a token before the scan and refund it on failure.'],
            ['One API host with two workers', 'Traffic is modest and one host is easy to run.', 'CPU or latency climbs under load', 'More workers first, then more hosts behind a load balancer. The app is stateless apart from the sockets.'],
            ['No containers or orchestrator', 'One host deploys in about a minute.', 'More hosts or more environments', 'Docker images, then ECS or Kubernetes.'],
            ['One PostgreSQL primary', 'Strong consistency, and the read load is small.', 'Read-heavy pages slow the primary down', 'A read replica for the feed and search.'],
            ['No metrics or alerting', 'Logs are enough at this size.', 'The first incident the logs can’t explain', 'Metrics and alerts on latency, errors, and payout failures.'],
          ],
        },
      },
    ],
  },
]
