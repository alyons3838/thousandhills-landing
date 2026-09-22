import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Dumbbell,
  ExternalLink,
  Filter,
  Heart,
  MapPin,
  Phone,
  Search,
  SlidersHorizontal,
  Sparkles,
  TentTree,
  Trees,
  Users,
  Waves,
} from "lucide-react";

const ASSETS = {
  thLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/th_logo_13ac096a.png",
  thvLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/thv_logo_6ee1fc47.png",
  thrhLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/thrh_logo_7f198c0e.webp",
  golfAerial: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/golf_aerial_36e92749.jpg",
  golfFairway: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/golf_fairway_3ee95d94.jpg",
  golfHole: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/golf_hole1_db32e4f8.jpg",
  hotelRoom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/hotel_room_2ece4dd1.jpg",
  condo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/vacations_condo_3a98b294.jpg",
  exterior: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/vacations_exterior_37a9d826.jpg",
};

type HeroAction = { label: string; href: string; kind?: "primary" | "outline" };

function Action({ action }: { action: HeroAction }) {
  return (
    <a className={`th-action ${action.kind === "outline" ? "th-action--outline" : ""}`} href={action.href}>
      {action.label} <ArrowRight size={15} strokeWidth={2} />
    </a>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="th-site-header">
        <a className="th-brand" href="/" aria-label="Thousand Hills home">
          <img src={ASSETS.thLogo} alt="" />
          <span>
            <strong>Thousand Hills</strong>
            <small>Branson, Missouri</small>
          </span>
        </a>
        <nav className="th-nav" aria-label="Primary navigation">
          <a href="/branson-lodging/">Lodging</a>
          <a href="/branson-lodging/branson-cabins/">Cabins</a>
          <a href="/branson-golf/">Golf</a>
          <a href="/branson-attractions/">Attractions</a>
          <a href="/contact-us/">Contact</a>
        </nav>
        <div className="th-header-actions">
          <a className="th-header-phone" href="tel:18772620430"><Phone size={14} /> 1-877-262-0430</a>
          <a className="th-header-book" href="/search-results/">Explore Stays</a>
        </div>
        <button className="th-menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">Menu</button>
      </header>
      {open && (
        <nav className="th-mobile-nav" aria-label="Mobile navigation">
          <a href="/branson-lodging/">Lodging</a><a href="/branson-lodging/branson-cabins/">Cabins</a><a href="/branson-golf/">Golf</a><a href="/branson-attractions/">Attractions</a><a href="/contact-us/">Contact</a><a href="/search-results/">Explore Stays</a>
        </nav>
      )}
    </>
  );
}

function ConceptBar({ label = "Visual development concept" }: { label?: string }) {
  return <div className="th-concept-bar"><Sparkles size={13} /> <span>{label}</span><i>Prepared for design and development handoff</i></div>;
}

function PageHero({ eyebrow, title, copy, image, actions, compact = false }: { eyebrow: string; title: ReactNode; copy: string; image: string; actions: HeroAction[]; compact?: boolean }) {
  return (
    <section className={`th-page-hero ${compact ? "th-page-hero--compact" : ""}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(8,22,12,.87) 0%, rgba(8,22,12,.68) 48%, rgba(8,22,12,.23) 100%), url(${image})` }}>
      <div className="th-page-hero__texture" />
      <div className="th-container th-page-hero__inner">
        <div className="th-eyebrow th-eyebrow--light">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className="th-hero-actions">{actions.map((action) => <Action key={action.label} action={action} />)}</div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, copy, center = false }: { eyebrow: string; title: ReactNode; copy?: string; center?: boolean }) {
  return <div className={`th-section-heading ${center ? "th-section-heading--center" : ""}`}><div className="th-eyebrow">{eyebrow}</div><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function BookingStrip({ golf = false }: { golf?: boolean }) {
  const fields = golf ? ["Play date", "Players", "Tee preference"] : ["Arrival", "Nights", "Guests"];
  return (
    <section className="th-booking-wrap" aria-label="Visual-only booking interface">
      <div className="th-booking-strip th-container">
        <div className="th-booking-label"><small>{golf ? "Plan a round" : "Find your stay"}</small><strong>{golf ? "Tee time request" : "Availability search"}</strong></div>
        <div className="th-booking-fields">
          {fields.map((field, index) => <button key={field} className="th-input-mock" disabled><span>{field}</span><strong>{index === 0 ? "Select" : "Choose"}</strong><ChevronDown size={14} /></button>)}
        </div>
        <button className="th-search-mock" disabled><Search size={16} /> {golf ? "View Times" : "View Stays"}</button>
      </div>
      <div className="th-booking-note th-container">This booking interface is a visual concept. Connect the reservation system to enable live dates, availability, rates, and reservations.</div>
    </section>
  );
}

function EditorialSplit({ eyebrow, title, copy, image, imageAlt, children, reverse = false, dark = false }: { eyebrow: string; title: ReactNode; copy: string; image: string; imageAlt: string; children?: ReactNode; reverse?: boolean; dark?: boolean }) {
  return (
    <section className={`th-editorial ${dark ? "th-editorial--dark" : ""}`}>
      <div className={`th-container th-editorial__grid ${reverse ? "th-editorial__grid--reverse" : ""}`}>
        <div className="th-editorial__copy"><SectionHeading eyebrow={eyebrow} title={title} copy={copy} />{children}</div>
        <div className="th-editorial__image"><img src={image} alt={imageAlt} /><div className="th-image-frame" /></div>
      </div>
    </section>
  );
}

function IconTile({ icon, title, copy }: { icon: ReactNode; title: string; copy: string }) {
  return <article className="th-icon-tile"><div className="th-icon-tile__icon">{icon}</div><h3>{title}</h3><p>{copy}</p></article>;
}

function TextLink({ children, href = "#concept" }: { children: ReactNode; href?: string }) { return <a className="th-text-link" href={href}>{children}<ChevronRight size={15} /></a>; }

function PageFooter() {
  return <footer className="th-footer"><div className="th-container th-footer__grid"><div><a className="th-brand th-brand--footer" href="/"><img src={ASSETS.thLogo} alt=""/><span><strong>Thousand Hills</strong><small>Branson, Missouri</small></span></a><p>A premium resort, lodging, and golf destination in the Ozarks.</p></div><div><small>EXPLORE</small><a href="/branson-lodging/">Branson Lodging</a><a href="/branson-lodging/branson-cabins/">Cabins</a><a href="/branson-golf/">Golf Course</a></div><div><small>PLAN</small><a href="/branson-attractions/">Attractions</a><a href="/search-results/">Vacation Rentals</a><a href="/contact-us/">Contact Us</a></div><div><small>CALL US</small><a className="th-footer-phone" href="tel:18772620430">1-877-262-0430</a><p>245 S. Wildwood Dr.<br/>Branson, MO 65616</p></div></div><div className="th-footer__sub th-container">© Thousand Hills Resort · Concept page system</div></footer>;
}

const lodgingChoices = [
  { title: "Lodges", copy: "Spacious lodging options for a fuller Branson gathering.", image: ASSETS.exterior, href: "/branson-lodging/branson-cabins/", tag: "For the whole group" },
  { title: "Cabins", copy: "Wooded Ozarks settings with the comfort of a private retreat.", image: ASSETS.exterior, href: "/branson-lodging/branson-cabins/", tag: "A more secluded stay" },
  { title: "Condos", copy: "The space to settle in, with the resort within easy reach.", image: ASSETS.condo, href: "/search-results/", tag: "Stay with room to live" },
  { title: "Lake Condos", copy: "A relaxed lake-area escape designed around Branson days.", image: ASSETS.golfAerial, href: "/search-results/", tag: "Majestic View" },
];

function ChoiceCards({ cards = lodgingChoices }: { cards?: typeof lodgingChoices }) {
  return <div className="th-choice-grid">{cards.map((card) => <article className="th-choice-card" key={card.title}><div className="th-choice-card__image"><img src={card.image} alt=""/><span>{card.tag}</span></div><div className="th-choice-card__body"><h3>{card.title}</h3><p>{card.copy}</p><TextLink href={card.href}>Explore {card.title}</TextLink></div></article>)}</div>;
}

export function LodgingPage() {
  return <main className="th-concept-shell"><SiteHeader/><ConceptBar label="Branson lodging page concept"/><PageHero eyebrow="Thousand Hills Resort" title={<>Stay close to the <em>Branson moments</em> that matter.</>} copy="A distinctive collection of condos, cabins, lodges, and lake-area stays—brought together by a resort experience in the heart of the Ozarks." image={ASSETS.exterior} actions={[{ label: "Explore stays", href: "#stay-options" }, { label: "Call reservations", href: "tel:18772620430", kind: "outline" }]}/><BookingStrip/>
    <section id="stay-options" className="th-cream-section"><div className="th-container"><SectionHeading center eyebrow="Choose your place" title={<>Four ways to make <em>Branson yours.</em></>} copy="A clearer first decision for visitors: choose the stay that fits how they travel, then move toward the right inventory experience."/><ChoiceCards/></div></section>
    <EditorialSplit eyebrow="More room to arrive" title={<>Resort convenience.<br/><em>More space to stay.</em></>} copy="Move beyond a standard room into settings built for unhurried mornings, shared meals, and the kind of trips that need a little more breathing room." image={ASSETS.condo} imageAlt="Thousand Hills vacation rental interior"><div className="th-check-list"><span>Full kitchens and living spaces</span><span>Indoor and outdoor swimming pools</span><span>Free in-room Wi-Fi and resort amenities</span><span>Central Branson setting</span></div><a className="th-action th-action--dark" href="/search-results/">View rental concept <ArrowRight size={15}/></a></EditorialSplit>
    <section className="th-green-band"><div className="th-container"><div className="th-green-band__top"><SectionHeading eyebrow="Beyond your stay" title={<>The resort at your <em>doorstep.</em></>} copy="A stay at Thousand Hills is the starting point for a golf day, time by the pool, local attractions, and a Branson itinerary built around your group."/><a className="th-action th-action--gold" href="/branson-golf/">Explore the golf course <ArrowRight size={15}/></a></div><div className="th-icon-grid th-icon-grid--light"><IconTile icon={<Waves/>} title="Swim & unwind" copy="Indoor and outdoor pools provide a resort reset between Branson plans."/><IconTile icon={<TentTree/>} title="More ways to stay" copy="Cabins, condos, and lodge accommodations support a range of trips."/><IconTile icon={<Dumbbell/>} title="Stay in motion" copy="Exercise facility and on-resort activities add flexibility to your stay."/><IconTile icon={<MapPin/>} title="Centrally connected" copy="Keep Branson entertainment, dining, and golf within the rhythm of your trip."/></div></div></section>
    <section className="th-utility-section"><div className="th-container th-utility-grid"><div><div className="th-eyebrow">Plan with confidence</div><h2>Everything starts with the right stay.</h2><p>Use the new lodging structure to move guests naturally from discovery into the reservation experience—or directly to a knowledgeable resort associate.</p></div><div className="th-utility-actions"><a className="th-action" href="/search-results/">Explore stays <ArrowRight size={15}/></a><a className="th-action th-action--dark" href="tel:18772620430"><Phone size={15}/> 1-877-262-0430</a></div></div></section><PageFooter/></main>;
}

const cabinChoices = [
  { title: "One-bedroom cabins", copy: "An intimate wooded escape for two.", image: ASSETS.exterior, href: "/search-results/", tag: "Sleeps 2" },
  { title: "Two-bedroom cabins", copy: "A comfortable cabin setting for small families and friends.", image: ASSETS.condo, href: "/search-results/", tag: "Multiple layouts" },
  { title: "Loft cabins", copy: "Expanded sleeping space with a distinctly Ozarks feel.", image: ASSETS.exterior, href: "/search-results/", tag: "Extra flexibility" },
  { title: "Four-bedroom cabins", copy: "An inviting base for a larger Branson group stay.", image: ASSETS.golfFairway, href: "/search-results/", tag: "For the group" },
];

export function CabinsPage() {
  return <main className="th-concept-shell"><SiteHeader/><ConceptBar label="Branson cabins page concept"/><PageHero eyebrow="Cabins at Grand Mountain" title={<>A private cabin.<br/><em>A Branson story.</em></>} copy="Wooded surroundings, thoughtful comforts, and a relaxed place to return after a full day in the Ozarks." image={ASSETS.exterior} actions={[{label:"Explore cabin stays", href:"#cabin-types"},{label:"Call reservations", href:"tel:18772620430",kind:"outline"}]}/><BookingStrip/>
    <section id="cabin-types" className="th-cream-section"><div className="th-container"><SectionHeading center eyebrow="Find your cabin" title={<>Made for two, a few, or <em>the whole crew.</em></>} copy="A clearer comparison path replaces a long list of unit types, giving visitors an easy way to recognize the right cabin experience."/><ChoiceCards cards={cabinChoices}/></div></section>
    <EditorialSplit reverse eyebrow="The cabin experience" title={<>The warmth of a cabin.<br/><em>The ease of a resort.</em></>} copy="Cabins bring together a secluded Ozarks setting with the in-stay comforts travelers seek when they want more than a quick overnight." image={ASSETS.condo} imageAlt="Vacation rental interior"><div className="th-check-list"><span>Fully equipped kitchens</span><span>Fireplaces and jetted tubs in select cabins</span><span>Screened or open back porches</span><span>Wi-Fi, living rooms, and flexible sleeping space</span></div></EditorialSplit>
    <section className="th-photo-feature" style={{backgroundImage:`linear-gradient(90deg, rgba(24,9,11,.94), rgba(24,9,11,.42)), url(${ASSETS.exterior})`}}><div className="th-container"><div className="th-photo-feature__copy"><div className="th-eyebrow th-eyebrow--light">Stay close. Feel away.</div><h2>Bring Branson close—<br/><em>without giving up quiet.</em></h2><p>Cabins at Grand Mountain keep guests near the energy of the destination while creating a calmer place to land at the end of the day.</p><a className="th-action" href="/branson-attractions/">Explore Branson attractions <ArrowRight size={15}/></a></div></div></section>
    <section className="th-utility-section"><div className="th-container th-utility-grid"><div><div className="th-eyebrow">A more personal trip</div><h2>Need help finding the right cabin?</h2><p>Pair the comparison experience with an easy reservations call path, so groups with specific needs do not have to navigate the decision alone.</p></div><div className="th-utility-actions"><a className="th-action" href="/search-results/">View cabin results concept <ArrowRight size={15}/></a><a className="th-action th-action--dark" href="tel:18772620430"><Phone size={15}/> Call reservations</a></div></div></section><PageFooter/></main>;
}

type MockProperty = { label: string; title: string; tags: string[]; image: string; detail: string };
const mockProperties: MockProperty[] = [
  { label:"Sample rental card", title:"One-bedroom cabin", tags:["Fireplace", "Screened porch", "Sleeps 2"], image:ASSETS.exterior, detail:"Property details, imagery, and booking data populate from the reservation system." },
  { label:"Sample rental card", title:"Two-bedroom condo", tags:["Full kitchen", "Living area", "Sleeps 6"], image:ASSETS.condo, detail:"Property details, imagery, and booking data populate from the reservation system." },
  { label:"Sample rental card", title:"Four-bedroom lodge", tags:["Large family", "Multiple bedrooms", "Group stay"], image:ASSETS.golfAerial, detail:"Property details, imagery, and booking data populate from the reservation system." },
];

function FilterGroup({ title, options }: { title: string; options: string[] }) { return <div className="th-filter-group"><button><strong>{title}</strong><ChevronDown size={15}/></button><div>{options.map(option => <label key={option}><input type="checkbox" disabled/> {option}</label>)}</div></div>; }

export function SearchResultsPage() {
  const [mapOpen, setMapOpen] = useState(true);
  return <main className="th-concept-shell th-search-page"><SiteHeader/><ConceptBar label="Vacation rental search results concept — non-live interface"/>
    <section className="th-search-hero"><div className="th-container"><div className="th-search-hero__top"><span className="th-rentals-wordmark"><strong>Thousand Hills</strong><small>Vacations</small></span><span>Branson vacation rentals</span></div><h1>Find your <em>Branson stay.</em></h1><p>A calmer, premium discovery experience designed to guide guests from trip intent to the right vacation rental.</p></div></section>
    <section className="th-search-controls"><div className="th-container th-search-controls__row"><button className="th-date-control" disabled><CalendarDays size={18}/><span><small>Arrival</small><strong>Select dates</strong></span></button><button className="th-date-control" disabled><CalendarDays size={18}/><span><small>Nights</small><strong>Choose stay</strong></span></button><button className="th-date-control" disabled><Users size={18}/><span><small>Guests</small><strong>Add guests</strong></span></button><button className="th-update-button" disabled>Update results <ArrowRight size={15}/></button></div><div className="th-container th-prototype-line"><Sparkles size={13}/> Demo interface only — dates, filters, map, pricing, availability, favorites, inquiries, and reservations require the booking platform connection.</div></section>
    <section className="th-results-shell"><aside className="th-filter-panel"><div className="th-filter-panel__title"><div><small>Refine your stay</small><strong>Filters</strong></div><SlidersHorizontal size={18}/></div><FilterGroup title="Home type" options={["Cabin rentals", "Condo rentals", "Lodge rentals", "Lake condo rentals"]}/><FilterGroup title="Bedrooms" options={["1 bedroom", "2 bedrooms", "3+ bedrooms"]}/><FilterGroup title="Location" options={["Near Branson", "Lake area", "Resort area"]}/><FilterGroup title="Amenities" options={["Pool or spa", "Pet friendly", "Accessibility", "Outdoor amenities"]}/><button className="th-clear-filters" disabled>Clear all filters</button></aside>
      <div className="th-results-main"><div className="th-results-toolbar"><div><span className="th-demo-pill">Visual concept</span><h2>Choose a stay that fits the trip.</h2><p>Property information and result count appear after the live inventory connection is added.</p></div><div className="th-toolbar-actions"><button disabled><Filter size={15}/> Filters</button><button disabled>Sort by <ChevronDown size={14}/></button><button onClick={() => setMapOpen(!mapOpen)}>{mapOpen ? "Hide map" : "Show map"}</button></div></div><div className={`th-results-layout ${mapOpen ? "th-results-layout--map" : ""}`}><div className="th-property-grid">{mockProperties.map(property => <article className="th-property-card" key={property.title}><div className="th-property-card__image"><img src={property.image} alt=""/><span>{property.label}</span><button disabled aria-label="Save sample property"><Heart size={17}/></button></div><div className="th-property-card__body"><small>{property.label}</small><h3>{property.title}</h3><div className="th-tag-row">{property.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p>{property.detail}</p><div className="th-property-card__footer"><span>Rates show after dates are connected</span><button disabled>View stay <ArrowRight size={14}/></button></div></div></article>)}</div>{mapOpen && <div className="th-map-concept"><div className="th-map-concept__wash"/><span className="th-map-pin th-map-pin--one">1</span><span className="th-map-pin th-map-pin--two">2</span><span className="th-map-pin th-map-pin--three">3</span><div><MapPin size={20}/><strong>Interactive map concept</strong><small>Map bounds and property pins connect to the live booking feed.</small></div></div>}</div><div className="th-empty-state"><CircleHelp size={19}/><div><strong>Looking for a specific stay?</strong><p>Once connected, this area can guide guests to alternate dates, a property inquiry, or the reservations team.</p></div><a href="tel:18772620430">Call 1-877-262-0430</a></div></div></section><PageFooter/></main>;
}

export function GolfPage() {
  return <main className="th-concept-shell"><SiteHeader/><ConceptBar label="Branson golf page concept"/><PageHero eyebrow="Thousand Hills Golf Resort" title={<>Golf with an <em>Ozarks point of view.</em></>} copy="A scenic, public 18-hole course where the setting, the challenge, and the Branson day come together." image={ASSETS.golfFairway} actions={[{label:"Explore course details",href:"#course-details"},{label:"Call the pro shop",href:"tel:4173344553",kind:"outline"}]}/><BookingStrip golf/>
    <section id="course-details" className="th-cream-section th-cream-section--golf"><div className="th-container"><SectionHeading center eyebrow="A course made to return to" title={<>The round begins with the <em>setting.</em></>} copy="Keep the golf story as a central SEO and conversion asset: the course is public, scenic, and designed to meet players at their level."/><div className="th-golf-proof"><div><strong>18</strong><span>championship holes</span></div><div><strong>Par 66</strong><span>public course layout</span></div><div><strong>4 sets</strong><span>of tees for every level</span></div><div><strong>4-Star</strong><span>Golf Digest rating</span></div></div></div></section>
    <EditorialSplit dark eyebrow="The Thousand Hills round" title={<>A course that feels<br/><em>far from ordinary.</em></>} copy="Play through hardwood forests, distinctive rock formations, and Ozark streams—then return to a Branson day that is still full of possibility." image={ASSETS.golfHole} imageAlt="Thousand Hills golf course"><div className="th-check-list th-check-list--light"><span>Zoysia fairways and Bentgrass greens</span><span>GPS-equipped Yamaha carts</span><span>Pro shop, rentals, and golf professional</span><span>Mulligan's Snack Bar & Grill, seasonally</span></div><a className="th-action th-action--gold" href="#tee-times">Plan your round <ArrowRight size={15}/></a></EditorialSplit>
    <section className="th-golf-paths"><div className="th-container"><SectionHeading center eyebrow="Plan your day" title={<>Everything needed for a <em>better round.</em></>} /><div className="th-path-grid"><article><span>01</span><h3>Course information</h3><p>Course layout, hole descriptions, and a clearer introduction to the playing experience.</p><TextLink>View course details</TextLink></article><article><span>02</span><h3>Rates & special paths</h3><p>Daily rates, senior options, stay-and-play, and specials become clean, distinct next steps.</p><TextLink>See planning options</TextLink></article><article><span>03</span><h3>Group outings</h3><p>Provide a focused entry for groups planning an outing around the course.</p><TextLink>Explore group golf</TextLink></article></div></div></section>
    <section id="tee-times" className="th-tee-panel"><div className="th-container th-tee-panel__inner"><div><div className="th-eyebrow th-eyebrow--light">Ready when you are</div><h2>Make the next Branson round count.</h2><p>Designed as a clear conversion close, with online tee-time connectivity added during implementation.</p></div><div className="th-tee-panel__actions"><a className="th-action" href="tel:4173344553"><Phone size={15}/> Call 417-334-4553</a><button disabled>Online tee times connect here <ExternalLink size={15}/></button></div></div></section><PageFooter/></main>;
}

export function ContactPage() {
  return <main className="th-concept-shell"><SiteHeader/><ConceptBar label="Contact page concept"/><PageHero compact eyebrow="We are here to help" title={<>Let’s make the <em>details easier.</em></>} copy="Ask a question, talk through a stay, or let a Thousand Hills Associate point you in the right direction." image={ASSETS.hotelRoom} actions={[{label:"Call 1-877-262-0430",href:"tel:18772620430"},{label:"See the resort",href:"/branson-lodging/",kind:"outline"}]}/>
    <section className="th-contact-section"><div className="th-container th-contact-grid"><div className="th-contact-intro"><SectionHeading eyebrow="Reach the resort" title={<>A more personal way<br/>to <em>plan Branson.</em></>} copy="The redesigned contact experience puts the form, the team, and the next best route in one calm, high-trust space."/><div className="th-contact-method"><Phone size={20}/><div><small>Toll-free reservations</small><a href="tel:18772620430">1-877-262-0430</a></div></div><div className="th-contact-method"><MapPin size={20}/><div><small>Resort address</small><p>245 S. Wildwood Dr.<br/>Branson, MO 65616</p></div></div><div className="th-contact-method"><Sparkles size={20}/><div><small>Response expectation</small><p>A Thousand Hills Associate responds by email in less than 24 hours.</p></div></div></div>
        <form className="th-contact-form" onSubmit={(event) => event.preventDefault()}><div className="th-contact-form__top"><div><div className="th-eyebrow">Send a question</div><h2>Tell us what you are planning.</h2></div><span className="th-demo-pill">Form concept</span></div><div className="th-form-grid"><label>Name<input placeholder="Your name" disabled/></label><label>Email<input placeholder="Email address" disabled/></label><label>Phone<input placeholder="Phone number" disabled/></label><label>Stay interest<select disabled defaultValue=""><option value="">Choose an option</option><option>Vacation rental</option><option>Cabin stay</option><option>Golf</option></select></label><label>Arrival<input placeholder="Select date" disabled/></label><label>Guests<input placeholder="Number of guests" disabled/></label></div><label>Questions or comments<textarea placeholder="How can the team help?" disabled/></label><button disabled className="th-contact-submit">Send inquiry <ArrowRight size={15}/></button><p className="th-form-note">Prototype form only. Connect form delivery and confirmation behavior during implementation.</p></form></div></section>
    <section className="th-service-routes"><div className="th-container"><SectionHeading center eyebrow="Direct paths when you need them" title={<>Choose the <em>fastest next step.</em></>} /><div className="th-service-route-grid"><a href="/branson-golf/"><span>Golf</span><strong>Plan a Branson round</strong><ChevronRight size={18}/></a><a href="/search-results/"><span>Vacations</span><strong>Explore a rental stay</strong><ChevronRight size={18}/></a><a href="/branson-attractions/"><span>Attractions</span><strong>Build your Branson day</strong><ChevronRight size={18}/></a></div></div></section><PageFooter/></main>;
}

const attractions = [
  { title:"Shows & schedules", copy:"Explore Branson live entertainment across morning, afternoon, and evening.", icon:<Sparkles/>, href:"#entertainment" },
  { title:"Area attractions", copy:"Plan big-energy days around Branson activities and family favorites.", icon:<TentTree/>, href:"#outdoors" },
  { title:"Shopping", copy:"Outlet, specialty, craft, and Branson Landing discoveries in one clear path.", icon:<Heart/>, href:"#shopping" },
  { title:"Restaurants", copy:"Build in the places that make a Branson day taste even better.", icon:<Users/>, href:"#dining" },
  { title:"Lakes & outdoors", copy:"Add fishing, boating, water, and Ozarks scenery to the itinerary.", icon:<Waves/>, href:"#outdoors" },
  { title:"Golf", copy:"Keep a premium Branson golf day within the larger destination story.", icon:<Trees/>, href:"/branson-golf/" },
];

export function AttractionsPage() {
  return <main className="th-concept-shell"><SiteHeader/><ConceptBar label="Branson attractions page concept"/><PageHero eyebrow="Your Branson itinerary" title={<>More to do. <em>More to remember.</em></>} copy="Shows, attractions, lakes, dining, shopping, and the kind of Ozarks days that make a stay feel like a real escape." image={ASSETS.golfAerial} actions={[{label:"Plan your stay",href:"/search-results/"},{label:"Call the concierge",href:"tel:18772620430",kind:"outline"}]}/><BookingStrip/>
    <section className="th-cream-section"><div className="th-container"><SectionHeading center eyebrow="Start with your kind of day" title={<>Build a Branson trip with <em>room for discovery.</em></>} copy="Move beyond a long list of links and turn destination content into an elegant, high-intent planning experience."/><div className="th-attractions-grid">{attractions.map(item => <a key={item.title} href={item.href} className="th-attraction-card"><div>{item.icon}</div><h3>{item.title}</h3><p>{item.copy}</p><span>Explore <ArrowRight size={14}/></span></a>)}</div></div></section>
    <EditorialSplit eyebrow="Branson entertainment" title={<>A show-stopping<br/><em>way to spend the day.</em></>} copy="Make live entertainment a hero within the planning journey—so guests can move easily from inspiration to schedules, tickets, and a stay that fits the show." image={ASSETS.hotelRoom} imageAlt="Branson resort stay"><a className="th-action th-action--dark" href="#entertainment">Explore shows & schedules <ArrowRight size={15}/></a></EditorialSplit>
    <section id="outdoors" className="th-destination-band"><div className="th-container th-destination-band__inner"><div><div className="th-eyebrow th-eyebrow--light">The Branson rhythm</div><h2>Plan a day around<br/><em>more than one moment.</em></h2></div><div className="th-destination-list"><span><Waves/> Lakes, fishing & boating</span><span><Sparkles/> Shows & attractions</span><span><Heart/> Shopping & dining</span><span><Trees/> Ozarks golf & scenery</span></div></div></section>
    <section className="th-concierge-panel"><div className="th-container th-concierge-panel__inner"><div><div className="th-eyebrow">A personal planning touch</div><h2>Need a local perspective?</h2><p>Give concierge support a clear role in the journey—for questions, show and amusement-ticket assistance, and help shaping an itinerary.</p></div><div><a className="th-action" href="tel:18772620430"><Phone size={15}/> Call the concierge</a><a className="th-text-link" href="/contact-us/">Send a question <ChevronRight size={15}/></a></div></div></section><PageFooter/></main>;
}

export default LodgingPage;
