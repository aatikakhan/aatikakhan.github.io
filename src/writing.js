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

export const writing = [
  {
    slug: 'from-a-grandparents-living-room',
    title: 'From a grandparent’s living room to a marketplace',
    dek: 'A chair from a grandparent’s house had nowhere real to go next. This is how Treasure Fox became the place it goes.',
    date: 'October 2026',
    kicker: 'Engineering',
    sections: [
      {
        paragraphs: [
          [
            'Treasure Fox was just an idea when I joined. There was no app and no checkout, and no way to take one mid-century sofa from your grandparents’ house to someone who would actually love it.',
          ],
          [
            'A lot of these pieces never started as inventory. Someone bought the chair new, or the table survived three houses, or nobody was allowed to move the lamp. Then the house got packed, and now you’re the one holding them. Maybe you want to go find the next one, or maybe you’re ready to let one go. Either way the handoff was a guess: a photo in a group chat, a price pulled out of the air, and a sofa nobody knew how to ship.',
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
        heading: 'What changed after the beta',
        paragraphs: [
          [
            'Last summer we shipped the beta: identify a piece, talk to other collectors, learn the stories. Buy, sell, and ship were still ahead of us. They are not anymore.',
          ],
          [
            'The second half of the build was the marketplace. ',
            fox,
            ' only takes MCM, roughly the 1940s through the 1970s, and it sells to both sides. A person buying one chair and a dealer bringing a whole room go through the same listing rules and the same checkout. If we take someone’s money for a credenza, we have to be willing to refuse pieces outside that range, and we have to get a heavy case across the country with a carrier, a quote, and a payout rule.',
          ],
        ],
      },
      {
        heading: 'One backend for the whole order',
        paragraphs: [
          [
            'The decision I’d make again is keeping the listing, scan, offer, order, shipment, and payout in one system. Flutter is the client, FastAPI is the product, and PostgreSQL holds the state. It runs on AWS (EC2, S3, RDS), and GitHub Actions deploys it. I’m also the one on call, so any shortcut in the client turns into my incident.',
          ],
          [
            'Saving a Draft takes almost nothing. Moving it to Selling is a separate step, and I kept them apart on purpose. To publish, the listing has to point at the seller’s own scan, and that scan has to have come back mid-century. It also needs real package dimensions and weight, a ship-from address, and a finished Stripe Connect account so we can pay the seller later. If any of that is missing, the API refuses the publish and the app tells the seller what to fix.',
          ],
        ],
      },
      {
        heading: 'Offers live in the conversation',
        paragraphs: [
          [
            'People haggle over this kind of furniture, so an offer is a record and also a message in the chat. The seller decides whether a listing takes offers and can set a floor. An offer under the floor is declined on the spot. We don’t create an offer row or a thread for it; the buyer just sees a rejected card with the minimum. Anything at or above the floor becomes a pending offer, attached to an encrypted message in the conversation the two people are already having.',
          ],
          [
            'A buyer gets three tries per listing, the opening offer plus two counters, and the seller accepts or declines each one. The card updates in place, so the thread doesn’t fill up with copies of the deal. Accepting doesn’t charge the card. Checkout from an accepted offer is limited to that buyer, at the agreed amount and a quantity of one, and shipping, the Fox Fee, tax, and escrow all still apply. After payment the offer is marked purchased.',
          ],
        ],
      },
    ],
  },
  {
    slug: 'the-money-has-to-wait',
    title: 'The money has to wait, and the sofa has to move',
    dek: 'When someone pays for a sideboard, the seller shouldn’t see that money yet.',
    date: 'October 2026',
    kicker: 'Payments & freight',
    sections: [
      {
        heading: 'Where the buyer’s money sits',
        paragraphs: [
          [
            'People who say “just add checkout” usually skip this part. Someone pays $1,400 for a sideboard on ',
            fox,
            ', and the seller shouldn’t see that money yet, because the piece is still in a house, the truck hasn’t come, and the buyer hasn’t had a chance to look it over.',
          ],
          [
            'The buyer’s payment lands on Treasure Fox’s Stripe balance. We pay the seller later with a Transfer, after delivery and an inspection window that defaults to three days. A sweep picks up orders whose release time has passed and that have no open dispute. If a Transfer fails, the seller can retry it.',
          ],
          [
            'I chose a platform hold over a destination charge, which splits the funds the moment the card is charged. Between payment and delivery the seller may still be packing, the buyer may still be inside the cancel window, a carrier can refuse the pickup, or a chargeback can arrive, and we can only handle those cases while we still hold the money. After our Transfer lands, Stripe pays out to the seller’s bank on its own bi-weekly schedule, on the 1st and the 15th. That date has nothing to do with when the card was charged, and the seller dashboard has to make that clear.',
          ],
          [
            'Subscriptions run through the same Stripe account on their own ledger: Fox Gold, scan packs, and assistant usage. A subscription renews a plan, and a sofa sale pays a seller. A small team that mixes the two ends up in refund arguments it can’t explain. I read all of it in the Stripe dashboards (payments, connected accounts, payouts, and subscriptions), and when the app disagrees with the dashboard, I trust the dashboard until the state is fixed.',
          ],
        ],
      },
      {
        heading: 'The Fox Fee is charged on the item',
        paragraphs: [
          [
            'The buyer’s Fox Fee and the seller’s Fox Fee are both calculated on the item subtotal, leaving out shipping, insurance, and tax. The seller’s payout is the item price minus the seller fee. Shipping stays with the platform, because the platform pays the carrier.',
          ],
          [
            'The rate steps down as the price goes up: a higher percentage under $1,000 and a lower one on the amount above it. The buyer pays their fee at checkout, and the seller’s fee comes out at Transfer.',
          ],
          [
            'Shipping a piece of furniture can cost as much as a small piece does, and a fee on the whole checkout would have taxed the white-glove quote. So I kept the fee on the thing people think they’re buying.',
          ],
        ],
      },
      {
        heading: 'When we buy the shipping label',
        paragraphs: [
          [
            'Payment marks the order paid and puts escrow on hold, but no label is bought yet. When the seller marks the order shipped, a parcel order buys a Shippo label from the platform balance, white-glove creates a Plycon bill of lading that we settle on account later, and LTL books with Old Dominion. Self-pickup has no carrier cost.',
          ],
          [
            'Until a parcel order is marked shipped, the buyer can cancel inside the post-payment window and get a full refund. If we bought labels at payment, every one of those cancels would turn into chasing the carrier, so we spend the money when the piece actually ships.',
          ],
          [
            'Each mode has its own cancel rule because each makes a different promise. Parcel can be cancelled inside the window until it’s marked shipped. Plycon can be cancelled by either side until pickup and is refused after that. Self-pickup follows the parcel rule until the handoff is done. One cancel button with one policy would have looked simpler in the app and been wrong in the ledger.',
          ],
        ],
      },
      {
        heading: 'Three ways a piece can travel',
        paragraphs: [
          [
            'Parcel goes through Shippo. The buyer sees live carrier rates, and we store the one they picked and buy that label when the seller ships.',
          ],
          [
            'LTL goes through Old Dominion, and sellers opt in per listing. Rates cover dock-to-dock and liftgate, since a house without a dock is a different shipment from a warehouse. Freight class comes from the package dimensions and weight. If the buyer wants extra cargo liability, it has to be on the bill of lading before the truck arrives.',
          ],
          [
            'White-glove is Plycon, who carry the piece in, unpack it, and place it. The checkout price is a rate-sheet quote based on the dimensions, and stairs and disassembly are part of the service the seller selected. Treasure Fox bills Plycon, and the buyer has already paid the quoted freight.',
          ],
          [
            'When a pickup goes wrong, because the driver was already on the way, the access was wrong, or the dimensions were generous, the extra fee comes out of the seller’s payout before Transfer, and the buyer never gets a second invoice. If delivery fails and the piece is coming back, the payout stays on hold. Once the seller confirms the item is back, the buyer is refunded what they paid minus the carrier’s initiated-shipping or cancellation fees, which come out of money we were already holding.',
          ],
        ],
      },
      {
        heading: 'Inspection and disputes',
        paragraphs: [
          [
            'Delivery starts the inspection clock. If the buyer reports a problem (not as described, damaged in transit, missing parts), the seller’s payout pauses and a review opens. Whether to refund is a separate decision. A chargeback pauses payout too, and if we lose the dispute, the order moves to refunded and the seller isn’t paid.',
          ],
          [
            'I wanted those states in the data, in words I can still read at midnight: held, then inspection, then released, refunded, or a failed payout the seller can retry. The app and the Transfer job both read them. Sales tax goes through Stripe Tax at checkout on its own path and never touches the seller’s item payout.',
          ],
        ],
      },
      {
        heading: 'Reviewing a seller',
        paragraphs: [
          [
            'A review belongs to a paid order, one per line item, and only the buyer can write it. It has overall stars and a written note, plus optional extras: whether they’d recommend the seller, tags for what they liked, separate scores for the piece, the shipping, and the service, and a few photos. Unreviewed purchases show up on the account as a count, so the prompt is a list of real orders the buyer can pick from.',
          ],
          [
            'The seller’s shop shows their average and review count, and the full list is on their reviews page. Sellers can reply publicly to a review, and the rating also shows next to them in a conversation about an order. A buyer who has never sold has no shop rating. I left reviews off drafts and unpaid checkouts on purpose, because a star should only come from a piece that actually changed hands.',
          ],
        ],
      },
    ],
  },
  {
    slug: 'the-model-is-not-allowed-to-invent-the-chair',
    title: 'The model has to earn the chair',
    dek: 'Identification can block a listing, the assistant only reads records we trust, and bulk upload stops at drafts.',
    date: 'October 2026',
    kicker: 'Models & catalog',
    sections: [
      {
        paragraphs: [
          [
            'Say you photograph a chair from a house you just cleared. The scan has to come back with a name, a decade, and a yes or no on whether the listing can go live, and nothing else. ',
            fox,
            ' runs two model paths on separate code, because a wrong listing is my incident. One identifies the object. The other is the in-app assistant, which can only read listings and records we already trust.',
          ],
        ],
      },
      {
        heading: 'How identification works',
        paragraphs: [
          [
            'A scan runs a vision pipeline across OpenAI and Gemini. It returns an identification plus a flag: MCM, not MCM, or undetermined. A scan outside MCM stops before we put a year or a price on it, and an undetermined scan counts as a no for publishing, though the seller can scan again. Each run is its own record with its own id, and we keep dimensions off the photos when the pipeline can see them.',
          ],
          [
            'A Selling listing has to point at the current user’s scan, and that scan has to be MCM. Drafts skip that check, so someone can stage photos and a story first. Scans from before the flag existed need a rescan. I’d rather ask for four new photos than treat an empty flag as a yes.',
          ],
        ],
      },
      {
        heading: 'Manual MCM verification',
        paragraphs: [
          [
            'If a scan comes back not mid-century or undetermined, the seller can ask for a manual MCM verification on a draft they’ve already saved. They send the item name, maker, period, material, a short account of what they know, and proof photos such as a label, a stamp, or the piece itself. Each listing can have one open request, which they can edit or cancel while it’s open. Editing after a review has started puts it back in the queue.',
          ],
          [
            'Accepting the request marks the listing MCM-verified, so it can go to Selling without a passing scan. A rejection comes back with a note, and the seller can file a new request. Cancelling leaves the flag alone. I added this route because a real piece with a bad photo shouldn’t be stuck, and a typed story with no photos shouldn’t skip the line either.',
          ],
        ],
      },
      {
        heading: 'Bulk upload',
        paragraphs: [
          [
            'The easy case to picture is one chair on a Sunday. The harder one is a dealer who inherited a room or cleared an estate and has forty photos. Bulk upload lets that person get onto ',
            fox,
            ' without typing forty drafts by hand.',
          ],
          [
            'They can stage the room in a folder and submit it, or send a sheet. Each row has the title, story, price, year, maker, category, condition, piece and package dimensions, shipping options, whether offers are allowed and the minimum, and photo URLs, with a cap on photos per listing. The job creates Drafts and runs the same MCM scan pipeline in the background, two at a time, within the seller’s scan quota. The seller gets a notice when each draft’s scan is ready to list and a summary when the whole job finishes. Every draft keeps its scan id and MCM flag, and the automation stops there.',
          ],
          [
            'A person still has to publish. A bulk draft goes live only when someone moves it to Selling with a passing scan or an accepted manual verification, plus dimensions, a ship-from address, and Stripe Connect. I made that call on purpose: a folder of photos becomes a storefront only after every listing in it passes the same checks as a single one. Otherwise I’m the one on call, debugging a catalog that published itself overnight.',
          ],
        ],
      },
      {
        heading: 'Reporting a listing',
        paragraphs: [
          [
            'A buyer who thinks a live piece isn’t mid-century can report it, as long as it isn’t their own listing. The listing stays up during review and the seller is notified. Keep leaves it live and closes the report with a note. Remove sends it back to a draft and tells the seller why, and undoing a removal restores it. This report is about what the object is. A problem with a paid order (not as described, damaged on the truck, missing parts) is a separate report on the order, and that’s the one that pauses the seller’s payout.',
          ],
        ],
      },
      {
        heading: 'The Mini-RAG reference corpus',
        paragraphs: [
          [
            'Mini-RAG is a table separate from the listings. Each record covers a designer, manufacturer, and model, along with years, country, materials, dimensions, construction, what to look for, stamps and signatures, known variations, common lookalikes, reference photos, and where each fact came from. The scan queries it with attributes from the photo (furniture type, material, construction, style region, finish, distinctive traits) and never queries the live shop.',
          ],
          [
            ali,
            ' built the Vision AI that recognizes the furniture, and I built the retrieval under it. The embedding is text-embedding-3-small over the fields the scan already returns: category, materials, construction, identifying features, aesthetic region, and finish. The typed name, years, and country are stored as columns and come back after a match, but they aren’t in the vector. A photo will never produce the word “Denmark,” so a country token in the embedding would never match a query, and it’s the wrong feature to let a near neighbor get promoted on. We match on the visual attributes and return the name.',
          ],
          [
            'New records, including every row from a bulk corpus import, start unverified. A person verifies them one at a time before a row can ground a scan, and the retriever only returns verified rows. A plain bulk import is a text insert of a couple of hundred rows with no model call. The smarter import reads the reference photos and drafts each record, so it’s capped much lower, since every row is a vision call. We query by vector distance, and if nothing is close enough, the scan continues on the vision result alone. A threshold decides when a hit counts as confident, and we log the top candidate next to the maker the pipeline resolved so the threshold gets tuned from real decisions. Sometimes the corpus disagrees with a confident caption, and sometimes it returns nothing.',
          ],
        ],
      },
      {
        heading: 'Search and saved searches',
        paragraphs: [
          [
            'Search for pieces is a third system. It runs over the catalog and only looks at listings that are Selling. Autocomplete suggests people, makers, titles, and categories as you type, and an empty box shows your recent and saved searches. A full search matches the title, maker, category, and description. A title prefix ranks above a maker prefix, which ranks above a category hit, and newer listings come after that. You can filter to people, listings, a maker, a product, or a category, and anyone you’ve blocked is left out.',
          ],
          [
            'A saved search is a query you pin. When a new listing becomes available and the saved term shows up in its title, maker, category, or description, you get one notification that reopens the search. Sellers are never notified about their own pieces. Recent searches are history and saved searches are a watch, and I store both as flags on the same query. A collector hunting a Noguchi doesn’t want to retype it every Sunday, but does want to know when one lands.',
          ],
        ],
      },
      {
        heading: 'What the assistant can read',
        paragraphs: [
          [
            'The in-app assistant handles style questions, “what else feels like this,” and help using Treasure Fox. It reads context we assembled, under a token budget.',
          ],
          [
            'On each turn the server builds a small read-only block: profile and city, plan, recent offers, likes, saves, and a short sample of orders. A listings retriever can attach real listings to the answer. The model is told the block is member context, and the raw context isn’t returned in the response. Free plans get a monthly token budget, and paid plans unlock the assistant through a setting separate from scan quota. Before each call we estimate whether the message fits the remaining budget, so a long history fails visibly.',
          ],
          [
            'I ruled out letting the model query Postgres. The questions worth answering are about public listings, plus a few facts the member already sees on their own dashboard. This retriever uses a different corpus from Mini-RAG; it looks up what’s for sale.',
          ],
        ],
      },
    ],
  },
]
