export const links = {
  me: 'https://www.linkedin.com/in/aatikakhan/',
  fox: 'https://treasurefox.ai',
  resume:
    'https://docs.google.com/document/d/1bpBcVd-_sbq700t3dAhkYw1jkXmJXMuqYchZFTu2cdw/export?format=pdf',
}

const fox = { t: 'Treasure Fox', href: links.fox }

export const writing = [
  {
    slug: 'from-a-grandparents-living-room',
    title: 'From a grandparent’s living room to a marketplace',
    dek: 'A chair from a grandparent’s house, and nowhere real for it to go next. This is how that became a marketplace.',
    date: 'October 2026',
    kicker: 'Engineering',
    sections: [
      {
        paragraphs: [
          [
            'Treasure Fox was just an idea when I joined. No app. No checkout. No way to look at one mid-century sofa from your grandparents’ house and get it to someone who would actually love it.',
          ],
          [
            'A lot of these pieces never started as inventory. A chair bought new. A table that survived three houses. A lamp nobody was allowed to move. Then the house got packed, and now you are holding them. You might want to keep going and find the next one. You might be ready to let one go. Either way, the handoff was a guess. A photo in a group chat. A price pulled out of the air. A sofa nobody knew how to ship.',
          ],
          [
            'I had already built a marketplace, and I said yes as founding engineer. There is still no second engineer. The app, the APIs, the payments, the shipping, and the call when something in production looks wrong are the same desk. What follows is the part I wish someone had told me on week one.',
          ],
        ],
      },
      {
        heading: 'The beta was a different product',
        paragraphs: [
          [
            'Last summer we put a beta in people’s hands. You could photograph a piece, identify it, and talk to other collectors. Every serious conversation still ended on the same question: when can I buy it, and when does the seller get paid?',
          ],
          [
            'The second half of the build was a marketplace with a point of view. ',
            fox,
            ' is MCM-only, roughly the 1940s through the 1970s, and it is ecommerce for both sides. A person buys one chair. A dealer can bring a room. Same listing rules, same checkout. If we take someone’s money for a credenza, we have to be willing to refuse pieces that are outside that, and we have to move a heavy case across the country as furniture, with a carrier, a quote, and a payout rule.',
          ],
        ],
      },
      {
        heading: 'One backend owns the object',
        paragraphs: [
          [
            'The decision I would make again: the listing, the scan, the offer, the order, the shipment, and the payout are one system. Flutter is the client. FastAPI is the product. PostgreSQL holds the state. AWS (EC2, S3, RDS) is where it runs, and GitHub Actions carries it to production. A shortcut in the client becomes my incident, because I am also the person on call.',
          ],
          [
            'A seller can save a Draft with very little ceremony. Going Selling is a different act, and I kept that split on purpose. To publish, the listing has to point at that seller’s own scan, and the scan has to have come back as mid-century. It needs real package dimensions and weight. It needs a ship-from address. It needs Stripe Connect finished, so we can pay them later. Miss any one of those and the API refuses the publish. The app explains it. The server enforces it.',
          ],
        ],
      },
      {
        heading: 'Offers sit next to the listing',
        paragraphs: [
          [
            'This market negotiates, so an offer is a record and a message, not a side handshake. The seller decides whether a listing takes offers, and they can set a floor. Come in under that floor and the offer is declined on the spot. There is no offer row and no thread. The buyer sees a rejected card and the minimum. That is the automatic decline. Anything at or above the floor becomes a pending offer, attached to an encrypted message in the existing conversation, so the negotiation lives where the two people already are.',
          ],
          [
            'A buyer gets three tries on one listing: the opening offer and two counters. The seller accepts or declines. The same card updates in place, so the thread does not grow a second copy of the deal. Accepting does not charge the card. Checkout from that offer is only that buyer, at the agreed amount, quantity one. Shipping, the Fox Fee, tax, and escrow still run. After payment the offer is marked purchased.',
          ],
        ],
      },
    ],
  },
  {
    slug: 'the-money-has-to-wait',
    title: 'The money has to wait, and the sofa has to move',
    dek: 'Someone pays for a sideboard. The seller should not see that money yet.',
    date: 'October 2026',
    kicker: 'Payments & freight',
    sections: [
      {
        heading: 'Pay the platform first. Pay the seller later.',
        paragraphs: [
          [
            'Here is the part people skip when they say “just add checkout.” Someone pays for a $1,400 sideboard on ',
            fox,
            ', and the seller should not see that money yet. The piece is still in a house. The truck has not come. The buyer has not had a chance to walk around it.',
          ],
          [
            'Buyer payment lands on Treasure Fox’s Stripe balance. The seller is paid later, by a Transfer, after delivery and a short inspection window. The default window is three days. A sweep looks for orders whose release time has passed and whose dispute state is clear. If a Transfer fails, the seller can retry it.',
          ],
          [
            'I chose a platform hold over a destination charge that splits funds at the moment of payment. The seller may still be packing. The buyer may still be inside the cancel window. A carrier can refuse the pickup. A chargeback can arrive. Holding the funds is what makes those branches possible. After our Transfer lands, Stripe pays the connected bank account on its own schedule, bi-weekly, the 1st and the 15th. That clock is separate from the moment the card was charged, and the seller dashboard has to say so.',
          ],
          [
            'Subscriptions are a second business on the same Stripe account. Fox Gold, scan packs, and assistant usage are their own ledger. A subscription renews a plan. A sofa pays a seller. Mixing those two is how a small team creates a refund argument it cannot explain. The Stripe dashboards are where I read it: payments, connected accounts, payouts, and subscriptions. If the app and that dashboard disagree, I trust the dashboard until the state is fixed.',
          ],
        ],
      },
      {
        heading: 'The fee sits on the item',
        paragraphs: [
          [
            'Both the buyer Fox Fee and the seller Fox Fee are calculated on the item subtotal. Shipping, insurance, and tax stay outside that base. The seller’s payout is the item minus the seller fee. Shipping stays with the platform, because the platform pays the carrier.',
          ],
          [
            'The rate steps down as the item gets more expensive: a higher percent under $1,000, a lower percent on the amount above it. The buyer pays their fee in checkout. The seller’s fee appears at Transfer.',
          ],
          [
            'Furniture shipping can cost as much as a small piece. A fee on the whole checkout would have taxed the white-glove quote. I kept the fee on the object people think they are buying.',
          ],
        ],
      },
      {
        heading: 'Buy the label when it is actually leaving',
        paragraphs: [
          [
            'Payment marks the order paid and sets escrow to held. It leaves the label unbought. The seller marks the order shipped. Parcel then purchases a Shippo label from the platform balance. White-glove creates a Plycon bill of lading, and we settle Plycon on account later. LTL books with Old Dominion. Self-pickup has no carrier cost.',
          ],
          [
            'A parcel order can still be cancelled inside the post-payment window, before it is marked shipped, and the buyer gets a full refund. Buying the label at payment would have turned every one of those cancels into a chase with the carrier. The spend belongs next to the act of shipping.',
          ],
          [
            'Cancel rules follow the mode, because the promises differ. Parcel: inside the window, before it is marked shipped. Plycon: either side, until pickup. Once the freight is picked up, that cancel is refused. Self-pickup follows the parcel idea until the handoff is complete. One cancel button with one policy would have been a story we told the interface, and a lie in the ledger.',
          ],
        ],
      },
      {
        heading: 'Three ways a piece can travel',
        paragraphs: [
          [
            'Parcel goes through Shippo. The buyer sees live carrier rates. We store the rate they chose and buy that label when the seller ships.',
          ],
          [
            'LTL is Old Dominion, opt-in per listing. Rates include dock-to-dock and liftgate, because a house with no dock is a different shipment from a warehouse. Freight class comes from the package dimensions and weight. Additional cargo liability, if the buyer wants it, has to be on the bill of lading before the truck arrives.',
          ],
          [
            'White-glove is Plycon: carry in, unpack, place. The checkout number is a sheet quote from the dimensions. Stairs and disassembly are part of the service the seller selected. Treasure Fox bills Plycon. The buyer has already paid the quoted freight.',
          ],
          [
            'If pickup goes wrong — the driver is already on the way, the access is wrong, the dimensions were generous — the extra fee comes off the seller’s payout before Transfer. The buyer does not get a second invoice. If delivery fails and the piece is coming back, payout stays held. Once the seller confirms the item is back, the buyer is refunded for what they paid, minus the carrier’s initiated-shipping or cancellation fees. The fee comes out of money we were already holding.',
          ],
        ],
      },
      {
        heading: 'Inspection is a pause, and support can read it',
        paragraphs: [
          [
            'Delivery starts the inspection clock. The buyer can report a problem: not as described, damaged in transit, missing parts. That report pauses the seller payout and opens a review. A refund, if one happens, is a separate decision. Chargebacks pause payout too. If the dispute is lost, the order moves to refunded and the seller is not paid.',
          ],
          [
            'I wanted that in the data, in words a future version of me can read at midnight. Held, then inspection, then released, refunded, or a failed payout the seller can retry. The app reads those states. The Transfer job reads those states. Sales tax is Stripe Tax at checkout, on its own path, and it stays out of the seller’s item payout.',
          ],
        ],
      },
      {
        heading: 'After you have paid, you can review the seller',
        paragraphs: [
          [
            'A review is tied to a paid order, one per line, and only the buyer can write it. Overall stars, a written note, and if they want them: whether they would recommend the seller, tags for what they liked, separate scores for the piece, the shipping, and the service, and up to a few photos. Unreviewed purchases sit on the account as a count, so the prompt is a list of real orders, not a blank form.',
          ],
          [
            'The seller’s shop shows the average and the count. The full list is on their reviews. They can post a public reply on a review. The rating also shows next to them when you are in a conversation about an order. A buyer who has never sold has no shop rating. I kept reviews off drafts and off unpaid checkouts on purpose. A star should mean the piece actually changed hands.',
          ],
        ],
      },
    ],
  },
  {
    slug: 'the-model-is-not-allowed-to-invent-the-chair',
    title: 'The model has to earn the chair',
    dek: 'Two AI jobs, one engineering lead. Identification can block a sale. The assistant may only speak from records we already trust. Bulk upload stops at drafts.',
    date: 'October 2026',
    kicker: 'AI & catalog',
    sections: [
      {
        paragraphs: [
          [
            'Take a photo of a chair from the house you just cleared. You want a name, a decade, and an honest “we will list this here” or “we will not.” You do not want a paragraph the model felt like writing. That is the whole argument of this note. ',
            fox,
            ' has two AI jobs, and I kept them apart because I am the person who will answer for a wrong listing. One looks at the object. The other helps you shop, and it may only talk about listings and records we already trust.',
          ],
        ],
      },
      {
        heading: 'Identification is a pipeline with a gate',
        paragraphs: [
          [
            'A scan runs a vision pipeline across OpenAI and Gemini. It returns an identification, and it returns a hard flag: this scan is MCM, it is not, or we could not tell. Scans that are outside MCM stop before we invent a year and a price. An undetermined scan is treated as a no for publishing. The seller can scan again. Each run is its own record, with its own id, and we keep dimensions off the photos when the pipeline can see them.',
          ],
          [
            'A Selling listing has to point at the current user’s scan, and that scan has to be MCM. Drafts are free of that gate, so someone can stage photos and a story. Going live waits for a passing scan. Older scans from before this flag existed wait for a rescan. I would rather ask for four new photos than let an empty flag slip through as a yes.',
          ],
        ],
      },
      {
        heading: 'A person can still verify what the scan refused',
        paragraphs: [
          [
            'A scan is the fast path. It is not the only path. When it comes back as not mid-century, or it cannot tell, the seller can ask for a manual MCM verification on a draft they already saved. They send the item name, the maker, the period, the material, a short account of what they know, and proof photos — a label, a stamp, the piece itself. One open request per listing. They can edit it or cancel it while it is open. If they edit it after someone has started reviewing, it goes back to the queue.',
          ],
          [
            'Accept sets the listing as MCM-verified, and then it can go Selling without a passing scan. Reject comes back with a note, and the seller can file a new request. Cancel does not flip the flag. I wanted that second door because a real piece with a bad photo should not be stuck, and a typed story with no photos should not skip the line either.',
          ],
        ],
      },
      {
        heading: 'A dealer inherits a room, so bulk upload exists',
        paragraphs: [
          [
            'The romantic version of this product is one chair on a Sunday. The operational version is a dealer who inherited a room, or cleared an estate, and has forty photos. Bulk upload is how that person enters ',
            fox,
            ' without typing forty drafts by hand.',
          ],
          [
            'They can stage the room in a folder first, then submit, or send a sheet. A row carries the title, the story, the price, the year, the maker, the category, the condition, the piece dimensions and the package dimensions, which ways it can ship, whether offers are allowed and what the minimum is, and the photo URLs. Photos are capped per listing. The job creates Drafts and runs the same MCM scan pipeline in the background, two at a time, inside that seller’s scan quota. When a draft’s scan finishes they get a notice that it is ready to list. When the whole job finishes they get a summary. Each draft keeps its scan id and its MCM flag. That is the end of the automation.',
          ],
          [
            'Publishing stays a human act. A draft from a bulk job goes live only when someone sends it to Selling with a scan that passed, or with an accepted manual verification, plus dimensions, a ship-from address, and Stripe Connect. I headed that call deliberately. A folder of photos is a staging area. It becomes a storefront when the same gates as a single listing have passed. Otherwise the one-person on-call is debugging a catalog that published itself overnight.',
          ],
        ],
      },
      {
        heading: 'Anyone else can report the listing',
        paragraphs: [
          [
            'A buyer who thinks a live piece is not mid-century can report it. They cannot report their own. The listing stays up while it is reviewed. The seller is told. Keep leaves it live and closes the report with a note. Remove takes it back to a draft and tells the seller why. Undoing a removal puts it back. That report is about what the object is. A problem with a paid order — not as described, damaged on the truck, missing parts — is a different report, on the order, and it is the one that pauses the seller’s payout.',
          ],
        ],
      },
      {
        heading: 'The RAG corpus is a reference set, not the catalog',
        paragraphs: [
          [
            'Mini-RAG is a separate table from the listings. A record is a designer, a manufacturer, and a model, plus the years, the country, the materials, the dimensions, how it is built, what you look for, stamps and signatures, known variations, common lookalikes, reference photos, and where the fact came from. The scan asks this table a question built from the photo: furniture type, material, construction, region of the style, finish, distinctive traits. It does not ask the live shop.',
          ],
          [
            'The embedding is the part I was careful about. It is built from the visual vocabulary the scan already speaks: category, materials, construction, identifying features, aesthetic region, finish. The human-typed name, the years, and the country are stored, and they come back after a match. They stay out of the vector. A style label from a photo will never say “Denmark,” so a country word in the embedding would sit there unmatched, and it would also be the wrong thing to let a near-miss promote. Names are the answer. The photo language is the index.',
          ],
          [
            'A new record, and every row from a corpus bulk import, lands unverified. Verification is one record at a time, by a person, before that row can ground a scan. The retriever returns verified rows only. A plain bulk import is a text insert, a couple of hundred rows, with no model call. The smarter path reads the reference photos and drafts the record, and that path is capped much lower because each row is a vision call. We query by vector distance. If nothing is close enough, the scan continues on the vision result alone. A threshold decides when a hit is confident, and we log the top candidate next to whichever maker the pipeline resolved, so the threshold is tuned from real decisions. The corpus may disagree with a confident caption. It may also stay silent.',
          ],
        ],
      },
      {
        heading: 'Search, and the search you keep',
        paragraphs: [
          [
            'Finding a piece for sale is a third system. It is the catalog, and it only looks at listings that are actually Selling. As you type, autocomplete returns people, makers, titles, and categories. An empty box shows what you searched recently and what you chose to keep. A full search matches the title, the maker, the category, and the description. A prefix on the title ranks above a prefix on the maker, which ranks above a category hit, and then newer listings. You can narrow it to people, to listings, to a maker, to a product, or to a category. Someone you have blocked stays out of the results.',
          ],
          [
            'A saved search is a query you pin. When a new listing becomes available, if that saved term shows up in the title, the maker, the category, or the description, you get one notification, and it opens that search again. The seller is never notified about their own piece. Recent searches are a history. Saved searches are a watch. I kept them as two flags on the same query, because a collector hunting a Noguchi does not want to retype it every Sunday, and they do want to know when one lands.',
          ],
        ],
      },
      {
        heading: 'The assistant retrieves. It does not get the database.',
        paragraphs: [
          [
            'The in-app assistant is the other surface. It is for style, for “what else feels like this,” and for help using Treasure Fox. It is a curated reader, with a token budget, over context we assembled.',
          ],
          [
            'Each turn, the server builds a small read-only block: profile and city, which plan they are on, recent offers, likes, saves, and a short sample of orders. A listings retriever can attach real listings to the answer. The model is told that block is member context. The raw context stays off the response. Free plans get a monthly token budget. Paid plans unlock the assistant on a knob that is separate from scan quota. Before the call, we estimate whether the message fits the remaining budget, so a long history fails in the open.',
          ],
          [
            'I refused a design where the model queries Postgres. The questions worth answering are public listings, plus a few facts the member already sees on their own dashboard. The listings retriever on this surface is a different corpus from Mini-RAG: it looks up what is for sale.',
          ],
        ],
      },
    ],
  },
]
