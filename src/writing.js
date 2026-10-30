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

const scanSlug = 'the-model-is-not-allowed-to-invent-the-chair'
const moneySlug = 'the-money-has-to-wait'
const note = (t, slug) => ({ t, href: `/blog/${slug}` })
const scanNote = note('scanning, listing, and search', scanSlug)
const moneyNote = note('the next note', moneySlug)
const tokenNote = note('tokens and Gold', moneySlug)
const deliveryNote = note('delivery and payouts', moneySlug)

export const writing = [
  {
    slug: 'from-a-grandparents-living-room',
    title: 'From a grandparent’s living room to a marketplace',
    dek: 'You inherited a chair and have no idea what it is or what it’s worth. How that problem became Treasure Fox, and what the app does today.',
    date: 'October 2026',
    kicker: 'The story',
    sections: [
      {
        paragraphs: [
          [
            fox,
            ' is a marketplace for mid-century modern furniture, MCM for short. Think 1940s to 1970s: Eames chairs, teak sideboards, that kind of thing.',
          ],
        ],
      },
      {
        heading: 'How we got the idea',
        paragraphs: [
          [
            'Most people don’t go looking for this furniture. They inherit it. Or they pick it up at an auction house, where someone may have written down what it is, or at a yard sale, where nobody has and you can’t tell if it’s MCM at all.',
          ],
          [
            'Then they try to sell it, and every listing site wants to know the same thing first: what is it? With an inherited chair you often have no idea. You don’t know what it’s worth either, or who the right buyer is.',
          ],
          [
            'So we started with the camera. You take a photo, and the app tells you what the piece is, roughly when it was made, and what it might sell for. Everything else in the app comes after that answer.',
          ],
        ],
      },
      {
        heading: 'The beta, and what came next',
        paragraphs: [
          [
            'Last summer we shipped the beta: identify a piece, talk to other collectors, learn the stories. Buy, sell, and ship were still ahead of us. They are not anymore.',
          ],
          [
            'The beta worked well for individuals. Then sellers with stores showed up, and they had forty photos, not one. So we built bulk upload for them.',
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
        heading: 'What it does now',
        paragraphs: [
          [
            'Someone buying one chair and a dealer listing a whole room use the same app. Here is the trip. The next two notes follow it step by step.',
          ],
        ],
        steps: [
          ['Take a photo and see what it is: ', note('identification and scan history', scanSlug), '.'],
          ['List one piece or a whole estate: ', note('listing and bulk upload', scanSlug), '.'],
          ['Find a piece and ask the assistant about it: ', note('search and the assistant', scanSlug), '.'],
          ['Make an offer and pay: ', note('offers and payments', moneySlug), '.'],
          ['Ship it, get paid, and review the seller: ', deliveryNote, '.'],
          ['Use tokens for scans and replies, or go Gold: ', tokenNote, '.'],
        ],
      },
      {
        heading: 'How it’s built',
        paragraphs: [
          [
            'One backend runs all of it, with more than 30 REST APIs. The Flutter app talks to a FastAPI service, PostgreSQL holds the data, Redis caches the busy pages, and everything runs on AWS. Listings, scans, offers, orders, shipments, and payouts live in the same system, so they can’t drift apart.',
          ],
          [
            'Code goes out through GitHub Actions to a staging server first and then to production. Gunicorn runs the app behind nginx, and systemd restarts it if it stops. A scan can run for minutes, so the app server and the proxy in front of it have to agree on how long to wait.',
          ],
        ],
      },
      {
        heading: 'How a request travels',
        paragraphs: [
          [
            'A call from the app reaches nginx, then Gunicorn, which runs several FastAPI workers. The worker reads the Bearer token and loads the user from PostgreSQL. An account that failed to log in too many times is refused for 30 minutes. Public pages treat a bad or expired token as a logged-out visitor instead of an error, so browsing never breaks.',
          ],
          [
            'Each request gets its own database session. Sessions come from more than one connection pool, taken in turn, because the database caps connections per role. A session commits when the request succeeds and rolls back when it fails. Connections are checked before use and recycled every five minutes, so a dropped connection doesn’t reach a user.',
          ],
          [
            'The expensive routes are rate limited. A photo scan, for example, is allowed five times a minute per IP address, because every scan costs real money in model calls.',
          ],
          [
            'I’m the engineering team, which makes me the one on call too. Identification, verification, bulk upload, delivery, and payments are harder than they look from the outside, and those are what the next two notes are about.',
          ],
        ],
      },
    ],
  },
  {
    slug: scanSlug,
    title: 'The model has to earn the chair',
    dek: 'From the first photo to a live listing, and how people find it: identification, history, bulk upload, search, and the assistant.',
    date: 'October 2026',
    kicker: 'Scan, list & search',
    sections: [
      {
        paragraphs: [
          [
            fox,
            ' has two AI features: scanning a photo, and an assistant you can chat with. Both run on tokens, which are covered in ',
            moneyNote,
            '. This note follows a piece from the first photo to a buyer finding it.',
          ],
        ],
      },
      {
        heading: 'What happens when you take a photo',
        paragraphs: [
          [
            'You take a few photos of a piece. They go to our vision pipeline, which uses OpenAI and Gemini models to read the object: what kind of furniture it is, what it’s made of, how it’s built, and any marks you can see.',
          ],
          [
            'You get back a title, a likely maker, a year, a category, a size when the photos show enough to measure, a price range, and a confidence score. You also get one flag: MCM, not MCM, or can’t tell.',
          ],
          [
            'That flag matters most. If the answer is not MCM, we stop there and don’t make up a year or a price. If it can’t tell, you scan again with better photos.',
          ],
        ],
      },
      {
        heading: 'How it checks itself',
        paragraphs: [
          [
            'A model on its own can sound sure and be wrong, so the scan also looks the piece up in a reference library of designers, makers, and models. ',
            ali,
            ' built the Vision AI, and I built the lookup that sits under it.',
          ],
          [
            'Each record in the library is described the way a photo would describe it: category, materials, construction, finish, and distinctive features. We turn that description into a vector and store it in PostgreSQL with pgvector. When you scan something, we do the same with your photo and ask for the closest records. Names, years, and countries are stored with each record but kept out of the vector, because a photo never says “Denmark.”',
          ],
          [
            'Only records a person has verified can be used, and new records start unverified. If nothing is close enough, the scan goes ahead on what the vision model saw.',
          ],
        ],
      },
      {
        heading: 'What we save',
        paragraphs: [
          [
            'Every successful scan goes into your scan history: your photos, the title, maker, year, category, price range, size, the MCM flag, and the confidence. You see them newest first, a page at a time, and you can open any one.',
          ],
          [
            'You can give a scan a thumbs up or down, and you can delete it. Only you can see your scans. When you list a piece later, the listing points back at one of them.',
          ],
        ],
      },
      {
        heading: 'When the scan says no',
        paragraphs: [
          [
            'A real piece can fail a scan because the photos were bad, or because nobody has recorded it yet. So a seller can ask for a manual MCM verification on any draft they’ve saved.',
          ],
          [
            'They send the name, maker, period, material, a short story, and proof photos like a label or a stamp. Each listing can have one open request, and they can edit or cancel it while it’s open. Editing after a review has started puts it back in the queue. If it’s accepted, the listing is verified. If it’s rejected, the seller gets a note and can send a new request.',
          ],
        ],
      },
      {
        heading: 'Draft first, then Selling',
        paragraphs: [
          [
            'Every listing starts as a draft. You can save one with almost nothing in it, like a few photos and a story, and come back later. On the same form you choose how the piece can ship and whether you take offers, which ',
            moneyNote,
            ' covers.',
          ],
          [
            'Moving a draft to Selling takes more. The listing has to point at your own scan, and that scan has to say MCM, or the listing needs an accepted manual verification. It needs real package size and weight, a ship-from address, and a connected Stripe account so we can pay you later. If something is missing, the app tells you what to fix. The server checks all of it too, so no screen can skip a step.',
          ],
        ],
      },
      {
        heading: 'When you have forty photos instead of one',
        paragraphs: [
          [
            'Sellers with stores don’t list one chair at a time. Bulk upload takes a folder of photos or a spreadsheet. Each row has the usual fields: title, story, price, year, maker, category, condition, sizes, shipping options, offer settings, and photo links.',
          ],
          [
            'A scan can take a minute or more, so a request can’t wait on forty of them. When you submit, we create one draft per row first. Then we hand the scans to a small worker pool that runs two at a time. Every draft keeps its own status in PostgreSQL, such as queued, scanning, failed, or cancelled, and keeps its scan and MCM flag. You get a notice when a draft is ready to list and a summary when the whole job is done.',
          ],
          [
            'Because the state lives in the database and not in memory, the app can show progress and a seller can cancel a job. Scans use the seller’s tokens. If tokens run out halfway, the rest of the drafts are skipped, and after the seller buys more, one call puts them back in line.',
          ],
          [
            'I haven’t put a message broker in yet. At this size, a worker pool and a status column are easier to run, and they are easy to swap for a real queue when the volume asks for one.',
          ],
          [
            'Then bulk upload stops. It makes drafts and nothing else. A person still sends each draft to Selling, and each one has to pass the same checks as a single listing. I built it that way so a folder of photos can’t turn into a live storefront on its own.',
          ],
        ],
      },
      {
        heading: 'After it’s live',
        paragraphs: [
          [
            'A buyer who thinks a live piece isn’t MCM can report it. You can’t report your own listing. The listing stays up while we review it, and the seller is told. We either keep it, with a note, or remove it, which sends it back to a draft along with the reason. A removal can be undone. A problem with a paid order, like damage or missing parts, is a separate report on the order.',
          ],
        ],
      },
      {
        heading: 'Finding a piece',
        paragraphs: [
          [
            'Search only looks at listings that are for sale. As you type, it suggests people, makers, titles, and categories. With an empty box it shows what you searched recently and what you saved. A full search matches the title, maker, category, and description. A match at the start of a title ranks above one at the start of a maker name, which ranks above a category match, and newer listings come after that. People you’ve blocked never show up.',
          ],
          [
            'Save a search and it becomes a watch. When a new listing matches your term, you get one notification, and tapping it reopens the search. A seller is never notified about their own pieces. Someone hunting a Noguchi doesn’t want to retype it every Sunday, and now they don’t have to.',
          ],
        ],
      },
      {
        heading: 'The assistant',
        paragraphs: [
          [
            'The assistant answers questions about style (“what else looks like this?”), about listings, and about using the app. It sticks to furniture, design, and the marketplace.',
          ],
          [
            'When you send a message, the server builds a small read-only summary about you: your profile and city, your plan, recent offers, likes, saves, and a sample of your orders. It also searches the live catalog for listings that match your question. Then it sends the summary, the matching listings, and the recent chat to Gemini and shows you the reply. The model never talks to the database directly.',
          ],
          [
            'Chats are saved as sessions in PostgreSQL, and the last 50 messages go along with each question so it remembers what you were talking about.',
          ],
        ],
      },
      {
        heading: 'Keeping the busy pages fast',
        paragraphs: [
          [
            'The homepage feed, your profile, and a seller’s page get read far more often than they change, so Redis sits in front of them. The feed is kept for 45 seconds, your profile for 2 minutes, and a seller page for 5 minutes.',
          ],
          [
            'The hard part is clearing a cache at the right moment. When a listing changes, we don’t hunt down every cached feed page. The feed keys carry a version number, and one counter bump makes all the old pages unreachable. They expire on their own. A profile or a seller page is different: we delete that one key when something about it changes. If Redis is down or not set up, the app logs it once and reads straight from PostgreSQL. Pages get slower, and nothing breaks. The thumbnail builder also uses a short-lived Redis key as a lock, so two requests don’t build the same image at once.',
          ],
        ],
      },
    ],
  },
  {
    slug: moneySlug,
    title: 'The money has to wait, and the sofa has to move',
    dek: 'Offers, where the money sits after you pay, the four ways a piece can travel, when the seller gets paid, and how tokens and Gold work.',
    date: 'October 2026',
    kicker: 'Offers, payments & plans',
    sections: [
      {
        heading: 'Making an offer',
        paragraphs: [
          [
            'A seller chooses whether a listing takes offers and can set a minimum. If you offer less than the minimum, it’s declined right away. You see a rejected card showing the minimum, and nothing else is created.',
          ],
          [
            'Otherwise the offer shows up as a card in your chat with the seller, sent as an encrypted message. You get three tries on a listing: your first offer and two counters. The seller accepts or declines, and the same card updates each time, so the chat doesn’t fill up with copies.',
          ],
          [
            'Accepting doesn’t charge anyone. You check out at the agreed price, for a quantity of one, and only you can use that offer. Shipping, fees, and tax are added at checkout, and after payment the offer is marked purchased.',
          ],
        ],
      },
      {
        heading: 'You pay',
        paragraphs: [
          [
            'Say a buyer pays $1,400 for a sideboard. The seller shouldn’t see that money yet, because the piece is still in a house and the buyer hasn’t seen it.',
          ],
          [
            'Payments run on Stripe. The money lands on Treasure Fox’s Stripe balance and stays there, and we pay the seller later with a Transfer to their connected Stripe account. We could have split the payment at checkout, but then a canceled order, a carrier problem, or a chargeback would mean taking money back from a seller. Holding it first is simpler.',
          ],
          [
            'A cart is one pending checkout per person. It lives in Redis and expires after seven days. Sales tax is calculated by Stripe Tax at checkout and stays out of the seller’s payout.',
          ],
          [
            'The buyer fee and the seller fee are both a percentage of the item price only. Shipping, insurance, and tax aren’t part of it, because shipping a sofa can cost nearly as much as a small piece. The percentage gets smaller as the price goes up. The buyer pays their fee at checkout, and the seller’s fee comes out when we pay them.',
          ],
        ],
      },
      {
        heading: 'One payment, start to finish',
        paragraphs: [
          [
            'This is the path of one order, as the system sees it. The order matters, because any step can fail halfway.',
          ],
        ],
        steps: [
          [
            'The buyer taps buy. The API checks the piece is still for sale (it answers 409 if another paid order exists), saves a pending order with the shipping choice, the quote, and the fee, and creates a Stripe Checkout Session.',
          ],
          [
            'The buyer pays on Stripe’s page, so card details never touch our servers.',
          ],
          [
            'Stripe calls our webhook. We log the event, mark the order paid with the money held, mark the piece sold, clear the cart, and tell the seller.',
          ],
          [
            'If two buyers paid for the same piece, the first paid order wins and the second is refunded in full, automatically.',
          ],
          [
            'If a buyer never finishes, the pending order is cancelled by a sweep after 24 hours, or right away when Stripe says the checkout expired.',
          ],
        ],
      },
      {
        paragraphs: [
          [
            'The webhook marks an order paid, not the buyer’s phone. The app can close or lose signal right after payment, and the order still has to end up in the right state. The pending order is the record we can always find again.',
          ],
        ],
      },
      {
        heading: 'Four ways a piece can travel',
        paragraphs: [
          [
            'The seller picks which options a listing allows, and the buyer sees them at checkout.',
          ],
          [
            'Parcel is for smaller pieces. Live carrier rates come from Shippo, and we save the rate the buyer picked. We buy the label when the seller marks the order shipped, not when the buyer pays, so a canceled order doesn’t leave us chasing a carrier.',
          ],
          [
            'LTL freight is for bigger pieces and runs through Old Dominion. Sellers turn it on per listing. The price depends on the package size and weight, and it covers dock-to-dock or liftgate delivery, since a house with no dock isn’t a warehouse.',
          ],
          [
            'White-glove is Plycon. They carry the piece in, unpack it, and place it. The price is a quote worked out from the dimensions.',
          ],
          [
            'Pickup means the buyer collects it themselves, so there’s no carrier cost.',
          ],
          [
            'Each option has its own cancel rule, because they make different promises. A parcel order can be canceled for a full refund until the seller marks it shipped. White-glove can be canceled by either side until pickup. Pickup follows the parcel rule until the handoff. If a pickup or delivery fails, the carrier’s extra fees come out of the money we’re already holding, so the buyer never gets a second invoice.',
          ],
        ],
      },
      {
        heading: 'After it arrives',
        paragraphs: [
          [
            'When the piece arrives, the buyer has a short window to look it over. The default is three days. If they report a problem (not as described, damaged, missing parts), the seller’s payout pauses while we review it. A chargeback pauses it too.',
          ],
          [
            'When the window ends with no open problem, the seller’s Transfer goes out. A sweep inside the API runs every 15 minutes and releases every order that is due. A Postgres advisory lock lets only one Gunicorn worker run it at a time, and a daily systemd timer is the backup. The seller can also retry the Transfer if it fails. After that, Stripe pays the money to their bank on its own schedule, on the 1st and the 15th. The day the seller sees money depends on that calendar, not on when the buyer paid, and the seller dashboard says so.',
          ],
          [
            'Every order has a plain status: held, inspection, released, refunded, or payout failed. The app and the payout job read the same one. To check money myself, I open the Stripe dashboards for payments, connected accounts, payouts, and subscriptions. If the app and Stripe disagree, I trust Stripe until the app is fixed.',
          ],
          [
            'Only the buyer of a paid order can then write a review, one per item. It has stars and a note, plus optional extras: whether they’d recommend the seller, tags, scores for the piece, the shipping, and the service, and photos. The seller’s shop shows the average and the count, and the seller can reply in public. No paid order means no review, so a star always means the piece changed hands.',
          ],
        ],
      },
      {
        heading: 'Webhooks that can arrive twice',
        paragraphs: [
          [
            'Stripe can send the same event more than once. So the first thing we do with an event is write its ID into a table. If the ID is already there, we skip it. If an earlier try failed, we let it run again. Rows are never deleted, which leaves a record of what happened. The webhook answers fast and does the follow-up work afterward.',
          ],
          [
            'Payouts follow the same rule. A transfer to a seller carries an idempotency key built from the order, so a retry can’t pay the same order twice.',
          ],
        ],
      },
      {
        heading: 'Tokens',
        paragraphs: [
          [
            'A token is one use of our AI. A scan costs one. An assistant reply costs one. They come out of the same pool, so you spend your tokens on whichever you like. Free accounts get a small allowance every month, and it resets at the start of the month.',
          ],
          [
            'Each use adds one to a usage row for that day. Before a scan or a reply, we add up the month: your allowance plus any packs you bought this month, minus what you’ve used. If there’s something left, the request goes through. If not, the app tells you to buy a pack or go Gold.',
          ],
          [
            'A pack is a one-time purchase of 50, 100, or 1,000 tokens, paid through Stripe Checkout. It adds to your pool for the month.',
          ],
        ],
      },
      {
        heading: 'Gold and subscriptions',
        paragraphs: [
          [
            'Gold is a Stripe subscription, monthly or yearly. It makes tokens unlimited and unlocks the seller tools, like the premium dashboard and sales tracking. Unlimited accounts skip the counting, so they never hit a limit.',
          ],
          [
            'Stripe bills you and renews you. Stripe also tells our backend about every change (a renewal, a cancellation, a plan change, a pause), and we keep a copy so the app always knows your plan. If you cancel, you keep Gold until the end of the period you paid for. To change your plan, update your card, or see invoices, the app opens Stripe’s customer portal, so card details stay with Stripe.',
          ],
          [
            'Subscriptions and marketplace sales sit in separate ledgers on the same Stripe account. A subscription renews a plan, and a sale pays a seller. Mixing the two leads to refund arguments you can’t explain.',
          ],
        ],
      },
    ],
  },
]
